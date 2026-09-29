import { createHash } from "node:crypto";

import { getSql } from "../../server/db.mjs";

function getCookieValue(cookieHeader, name) {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}

function hashToken(token) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const token = getCookieValue(
      req.headers.cookie,
      "vc_admin_session"
    );

    if (!token) {
      return res.status(200).json({
        authenticated: false,
      });
    }

    const tokenHash = hashToken(token);

    const sql = getSql();

    const rows = await sql`
      SELECT id, expires_at
      FROM admin_sessions
      WHERE token_hash = ${tokenHash}
        AND expires_at > NOW()
      LIMIT 1
    `;

    return res.status(200).json({
      authenticated: rows.length > 0,
    });
  } catch (error) {
    console.error("Admin session error:", error);

    return res.status(500).json({
      error: "Unable to check admin session.",
    });
  }
}