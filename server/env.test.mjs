import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectEnv } from "./env.mjs";

test("loadProjectEnv reads the project .env file from the app directory", () => {
  const original = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;

  try {
    loadProjectEnv();
    assert.ok(process.env.DATABASE_URL, "DATABASE_URL should be loaded from the app .env file");
  } finally {
    if (original === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = original;
  }
});
