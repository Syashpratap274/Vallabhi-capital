import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

export function loadProjectEnv() {
  const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const envPath = path.join(appDir, ".env");

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false });
  }

  return process.env;
}
