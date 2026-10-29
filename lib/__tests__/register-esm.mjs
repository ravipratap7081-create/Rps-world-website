// Test-only entry: registers the ESM resolve hook, then the test file
// runs. Run: node --import ./lib/__tests__/register-esm.mjs lib/__tests__/instamojo.test.mjs
import { register } from "node:module";

register("./esm-resolve-loader.mjs", import.meta.url);
