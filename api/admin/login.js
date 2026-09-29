import {
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";

import { getSql } from "../../server/db.mjs";

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function hashToken(token) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

function getCookieHeader(token, expiresAt) {
  return [
    `vc_admin_session=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Expires=${expiresAt.toUTCString()}`,
    "Secure",
  ].join("; ");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const { email, password } = req.body || {};

    const expectedEmail = String(process.env.ADMIN_EMAIL || "").trim();
    const expectedPassword = String(process.env.ADMIN_PASSWORD || "");

    if (
      !expectedEmail ||
      !expectedPassword ||
      email !== expectedEmail ||
      password !== expectedPassword
    ) {
      return res.status(401).json({
        error: "Invalid admin email or password.",
      });
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    const sql = getSql();

    await sql`
      INSERT INTO admin_sessions (
        id,
        token_hash,
        expires_at
      )
      VALUES (
        ${randomUUID()},
        ${tokenHash},
        ${expiresAt}
      )
    `;

    res.setHeader(
      "Set-Cookie",
      getCookieHeader(token, expiresAt)
    );

    return res.status(200).json({
      ok: true,
      authenticated: true,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      error: "Unable to connect to the admin server.",
    });
  }
}