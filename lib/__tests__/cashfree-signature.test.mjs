/**
 * Unit tests for lib/delivery.js crypto helpers.
 * Run: node lib/__tests__/cashfree-signature.test.mjs
 * Exit code 0 = all pass.
 */
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {
  verifyCashfreeSignature,
  isTimestampFresh,
  generateToken,
  hashToken,
  isValidTokenFormat,
} from "../delivery.js";

const SECRET = "test_secret_key_abc123";
const BODY = JSON.stringify({
  data: {
    order: { order_id: "CFPay_test_001", order_amount: 149.0, order_currency: "INR" },
    payment: { payment_status: "SUCCESS", cf_payment_id: "123456" },
  },
  type: "PAYMENT_SUCCESS_WEBHOOK",
});

function sign(body, timestamp, secret) {
  return crypto.createHmac("sha256", secret).update(timestamp + body).digest("base64");
}

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log("  PASS", name);
  } catch (e) {
    console.error("  FAIL", name, "-", e.message);
    process.exitCode = 1;
  }
}

console.log("Cashfree signature verification:");
{
  const ts = String(Math.floor(Date.now() / 1000));
  const sig = sign(BODY, ts, SECRET);

  test("valid signature verifies", () => {
    assert.equal(verifyCashfreeSignature(BODY, ts, sig, SECRET), true);
  });
  test("tampered body rejected", () => {
    assert.equal(verifyCashfreeSignature(BODY + "x", ts, sig, SECRET), false);
  });
  test("tampered timestamp rejected", () => {
    assert.equal(verifyCashfreeSignature(BODY, String(Number(ts) + 1), sig, SECRET), false);
  });
  test("wrong secret rejected", () => {
    assert.equal(verifyCashfreeSignature(BODY, ts, sig, "wrong"), false);
  });
  test("garbage signature rejected", () => {
    assert.equal(verifyCashfreeSignature(BODY, ts, "not-base64!!!", SECRET), false);
  });
  test("missing fields rejected", () => {
    assert.equal(verifyCashfreeSignature(BODY, ts, sig, ""), false);
    assert.equal(verifyCashfreeSignature("", ts, sig, SECRET), false);
    assert.equal(verifyCashfreeSignature(BODY, "", sig, SECRET), false);
    assert.equal(verifyCashfreeSignature(BODY, ts, "", SECRET), false);
  });
  test("raw body required: re-serialized JSON with different spacing fails", () => {
    const reserialized = JSON.stringify(JSON.parse(BODY)); // same content, maybe same spacing
    // Craft a body that parses to the same object but differs byte-wise:
    const spaced = BODY.replace(/":/g, '": ');
    assert.notEqual(spaced, BODY);
    assert.equal(verifyCashfreeSignature(spaced, ts, sig, SECRET), false);
  });
}

console.log("Timestamp freshness:");
{
  test("current timestamp is fresh", () => {
    assert.equal(isTimestampFresh(String(Math.floor(Date.now() / 1000))), true);
  });
  test("10-minute-old timestamp is stale", () => {
    assert.equal(isTimestampFresh(String(Math.floor(Date.now() / 1000) - 600)), false);
  });
  test("millis timestamp accepted", () => {
    assert.equal(isTimestampFresh(String(Date.now())), true);
  });
  test("garbage timestamp rejected", () => {
    assert.equal(isTimestampFresh("abc"), false);
  });
}

console.log("Token generation:");
{
  test("token is 64 hex chars", () => {
    const { token } = generateToken();
    assert.match(token, /^[0-9a-f]{64}$/);
  });
  test("tokens are unique", () => {
    const a = generateToken().token;
    const b = generateToken().token;
    assert.notEqual(a, b);
  });
  test("hash is deterministic and 64 hex chars", () => {
    const { token, tokenHash } = generateToken();
    assert.equal(hashToken(token), tokenHash);
    assert.match(tokenHash, /^[0-9a-f]{64}$/);
  });
  test("hash is one-way (no reversal)", () => {
    const { token, tokenHash } = generateToken();
    assert.notEqual(tokenHash, token);
    assert.ok(!tokenHash.includes(token.slice(0, 8)));
  });
  test("format validator accepts good / rejects bad", () => {
    assert.equal(isValidTokenFormat(generateToken().token), true);
    assert.equal(isValidTokenFormat("short"), false);
    assert.equal(isValidTokenFormat("Z".repeat(64)), false);
    assert.equal(isValidTokenFormat(null), false);
  });
}

console.log(`\n${passed} tests passed${process.exitCode ? " (WITH FAILURES)" : ""}.`);
