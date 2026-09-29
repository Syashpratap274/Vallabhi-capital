import {
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";

import { getSql } from "./db.mjs";

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

function hashToken(token) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

function getCookieValue(cookieHeader, name) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}

export function getAdminSessionToken(req) {
  return getCookieValue(
    req.headers.cookie,
    "vc_admin_session"
  );
}

export async function createAdminSession() {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_MS
  );

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

  return {
    token,
    expiresAt,
  };
}

export async function getAdminSession(req) {
  const token = getAdminSessionToken(req);

  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);

  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      expires_at
    FROM admin_sessions
    WHERE token_hash = ${tokenHash}
      AND expires_at > NOW()
    LIMIT 1
  `;

  return rows[0] || null;
}

export async function destroyAdminSession(req) {
  const token = getAdminSessionToken(req);

  if (!token) {
    return;
  }

  const tokenHash = hashToken(token);

  const sql = getSql();

  await sql`
    DELETE FROM admin_sessions
    WHERE token_hash = ${tokenHash}
  `;
}

export function isValidAdminCredentials(
  email,
  password
) {
  const expectedEmail = String(
    process.env.ADMIN_EMAIL || ""
  ).trim();

  const expectedPassword = String(
    process.env.ADMIN_PASSWORD || ""
  );

  return (
    expectedEmail !== "" &&
    expectedPassword !== "" &&
    email === expectedEmail &&
    password === expectedPassword
  );
}

export function getAdminCookieHeader(
  token,
  expiresAt
) {
  const parts = [
    `vc_admin_session=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Expires=${expiresAt.toUTCString()}`,
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function getExpiredAdminCookieHeader() {
  const parts = [
    "vc_admin_session=",
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}