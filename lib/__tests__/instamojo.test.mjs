/**
 * Unit tests for lib/instamojo.js + the pro-server order-key extension.
 * Run: node --import ./lib/__tests__/register-esm.mjs lib/__tests__/instamojo.test.mjs
 * Exit code 0 = all pass.
 *
 * HONEST LIMIT: the MAC tests compute the expected MAC with node:crypto
 * using the documented algorithm (sort keys by lower-cased key, join
 * values with "|", HMAC-SHA1, hex). That proves this implementation
 * follows the algorithm and rejects tampering — it does NOT prove
 * interop with Instamojo's live signer. The first live test must
 * confirm a real Instamojo webhook MAC verifies (see design doc).
 * No test here touches the network, Supabase, or real credentials.
 */
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {
  parseInstamojoWebhookBody,
  verifyInstamojoMac,
  instamojoOrderKey,
  isInstamojoOrderKey,
  getInstamojoProPurpose,
  getInstamojoPaymentStatus,
  createInstamojoProPaymentRequest,
  upsertProFromInstamojo,
} from "../instamojo.js";
import { computeProUntil, isProOrderId, isProOrderKey } from "../pro-server.js";

const SALT = "test_private_salt_xyz";
const FIELDS = {
  amount: "149.00",
  buyer: "test@example.com",
  buyer_name: "Test User",
  buyer_phone: "9999999999",
  currency: "INR",
  payment_id: "MOJOtest123",
  payment_request_id: "req_test_456",
  purpose: "ProTools Pro — Monthly",
  status: "Credit",
};

function sign(fields, salt) {
  const entries = Object.entries(fields).filter(([k]) => k !== "mac");
  entries.sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()));
  return crypto
    .createHmac("sha1", salt)
    .update(entries.map(([, v]) => String(v)).join("|"), "utf8")
    .digest("hex");
}

let passed = 0;
function test(name, fn) {
  try {
    const out = fn();
    if (out && typeof out.then === "function") {
      return out
        .then(() => {
          passed += 1;
          console.log("  PASS", name);
        })
        .catch((e) => {
          console.error("  FAIL", name, "-", e.message);
          process.exitCode = 1;
        });
    }
    passed += 1;
    console.log("  PASS", name);
  } catch (e) {
    console.error("  FAIL", name, "-", e.message);
    process.exitCode = 1;
  }
}

console.log("instamojo rail tests:");
const tests = [
  test("MAC verifies for a correctly signed payload", () => {
    const signed = { ...FIELDS, mac: sign(FIELDS, SALT) };
    assert.equal(verifyInstamojoMac(signed, SALT), true);
  }),
  test("MAC verifies regardless of field order", () => {
    const shuffled = {};
    for (const k of Object.keys(FIELDS).reverse()) shuffled[k] = FIELDS[k];
    shuffled.mac = sign(FIELDS, SALT);
    assert.equal(verifyInstamojoMac(shuffled, SALT), true);
  }),
  test("MAC rejects a tampered amount", () => {
    const signed = { ...FIELDS, mac: sign(FIELDS, SALT), amount: "1.00" };
    assert.equal(verifyInstamojoMac(signed, SALT), false);
  }),
  test("MAC rejects a removed field", () => {
    const { buyer_phone, ...rest } = FIELDS;
    const signed = { ...rest, mac: sign(FIELDS, SALT) };
    assert.equal(verifyInstamojoMac(signed, SALT), false);
  }),
  test("MAC rejects wrong salt, missing mac, missing salt", () => {
    const signed = { ...FIELDS, mac: sign(FIELDS, SALT) };
    assert.equal(verifyInstamojoMac(signed, "other_salt"), false);
    assert.equal(verifyInstamojoMac(FIELDS, SALT), false);
    assert.equal(verifyInstamojoMac(signed, ""), false);
  }),
  test("form-urlencoded webhook body parses (incl. encoded purpose)", () => {
    const raw =
      "amount=149.00&buyer=test%40example.com&payment_id=MOJOtest123" +
      "&purpose=ProTools+Pro+%E2%80%94+Monthly&status=Credit";
    const parsed = parseInstamojoWebhookBody(raw);
    assert.equal(parsed.buyer, "test@example.com");
    assert.equal(parsed.purpose, "ProTools Pro — Monthly");
    assert.equal(parsed.status, "Credit");
  }),
  test("order key format + pro-server key acceptance", () => {
    assert.equal(instamojoOrderKey("MOJOtest123"), "IMJO:MOJOtest123");
    assert.equal(isInstamojoOrderKey("IMJO:MOJOtest123"), true);
    assert.equal(isInstamojoOrderKey("PRO149_x"), false);
    assert.equal(isProOrderKey("PRO149_x"), true);
    assert.equal(isProOrderKey("LINK:PROLINK_x"), true);
    assert.equal(isProOrderKey("IMJO:MOJOtest123"), true);
    assert.equal(isProOrderKey("CFPay_x"), false);
    assert.equal(isProOrderId("PRO149_x"), true);
    assert.equal(isProOrderId("IMJO:x"), false);
  }),
  test("default Pro purpose matches the webhook gate", () => {
    assert.equal(getInstamojoProPurpose(), "ProTools Pro — Monthly");
  }),
  test("pro_until is exactly paid_at + 30 days", () => {
    const paidAt = new Date("2026-10-29T10:00:00.000Z");
    assert.equal(computeProUntil(paidAt).toISOString(), "2026-11-28T10:00:00.000Z");
  }),
  test("upsert gate rejects non-Credit without touching the DB", async () => {
    const res = await upsertProFromInstamojo({
      paymentId: "MOJOtest123",
      status: "Failed",
      amount: 149,
      buyerEmail: "test@example.com",
      buyerPhone: "9999999999",
      purpose: "ProTools Pro — Monthly",
    });
    assert.equal(res.ok, true);
    assert.equal(res.activated, false);
  }),
  test("upsert gate rejects wrong purpose without touching the DB", async () => {
    const res = await upsertProFromInstamojo({
      paymentId: "MOJOtest123",
      status: "Credit",
      amount: 149,
      buyerEmail: "test@example.com",
      buyerPhone: "9999999999",
      purpose: "Diwali Business Promo Pack",
    });
    assert.equal(res.ok, true);
    assert.equal(res.activated, false);
  }),
  test("upsert gate rejects amount below ₹149 without touching the DB", async () => {
    const res = await upsertProFromInstamojo({
      paymentId: "MOJOtest123",
      status: "Credit",
      amount: 100,
      buyerEmail: "test@example.com",
      buyerPhone: "9999999999",
      purpose: "ProTools Pro — Monthly",
    });
    assert.equal(res.ok, true);
    assert.equal(res.activated, false);
  }),
  test("upsert fails closed on missing gateway email (no DB write)", async () => {
    const res = await upsertProFromInstamojo({
      paymentId: "MOJOtest123",
      status: "Credit",
      amount: 149,
      buyerEmail: null,
      buyerPhone: "9999999999",
      purpose: "ProTools Pro — Monthly",
    });
    assert.equal(res.ok, false);
  }),
  test("status check fails closed without credentials (no network)", async () => {
    delete process.env.INSTAMOJO_API_KEY;
    delete process.env.INSTAMOJO_AUTH_TOKEN;
    const res = await getInstamojoPaymentStatus("req_x", "MOJO_x");
    assert.equal(res.ok, false);
  }),
  test("payment-request creation fails closed without credentials (no network)", async () => {
    const res = await createInstamojoProPaymentRequest({
      email: "test@example.com",
      phone: "9999999999",
    });
    assert.equal(res.ok, false);
  }),
];

await Promise.all(tests);
console.log(`done: ${passed} passed`);
