// Test-only ESM resolve hook: the repo's lib files import each other
// extensionless ("./delivery"), which Next.js/webpack resolves but plain
// node ESM does not. This hook retries a failed relative resolution
// with ".js" appended. Used ONLY by node test runs, never by the app.
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (e) {
    if (specifier.startsWith("./") || specifier.startsWith("../")) {
      const candidate = fileURLToPath(new URL(specifier, context.parentURL)) + ".js";
      if (existsSync(candidate)) {
        return { url: new URL(specifier + ".js", context.parentURL).href, shortCircuit: true };
      }
    }
    throw e;
  }
}
