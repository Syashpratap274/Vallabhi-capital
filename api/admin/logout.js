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
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const token = getCookieValue(
      req.headers.cookie,
      "vc_admin_session"
    );

    if (token) {
      const tokenHash = hashToken(token);
      const sql = getSql();

      await sql`
        DELETE FROM admin_sessions
        WHERE token_hash = ${tokenHash}
      `;
    }

    res.setHeader(
      "Set-Cookie",
      [
        "vc_admin_session=",
        "HttpOnly",
        "Path=/",
        "SameSite=Lax",
        "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "Secure",
      ].join("; ")
    );

    return res.status(200).json({
      ok: true,
      authenticated: false,
    });
  } catch (error) {
    console.error("Admin logout error:", error);

    return res.status(500).json({
      error: "Unable to logout from the admin server.",
    });
  }
}