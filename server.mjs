import http from "node:http";
import { URL } from "node:url";
import { randomUUID } from "node:crypto";

import { loadProjectEnv } from "./server/env.mjs";

import {
  ensureTables,
  getCmsState,
  saveCmsState,
  getMedia,
  saveMedia,
  findLeadByPhone,
  createLead,
  updateLead,
  getAllLeads,
} from "./server/db.mjs";

import {
  createAdminSession,
  getAdminSession,
  destroyAdminSession,
  isValidAdminCredentials,
  getAdminCookieHeader,
  getExpiredAdminCookieHeader,
} from "./server/auth.mjs";

loadProjectEnv();

const PORT = Number(process.env.CMS_API_PORT || 8787);

const MAX_BODY = 60 * 1024 * 1024;

const DATABASE_OPERATION_TIMEOUT = 15000;

function withTimeout(operation, message) {
  return Promise.race([
    operation,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(message)),
        DATABASE_OPERATION_TIMEOUT
      )
    ),
  ]);
}

function send(res, status, body, headers = {}) {
  const payload = Buffer.isBuffer(body)
    ? body
    : Buffer.from(
        typeof body === "string"
          ? body
          : JSON.stringify(body)
      );

  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",

    // Local development CORS
    "Access-Control-Allow-Origin":
      "http://localhost:5173",

    "Access-Control-Allow-Headers":
      "Content-Type",

    "Access-Control-Allow-Methods":
      "GET,PUT,POST,OPTIONS",

    "Access-Control-Allow-Credentials":
      "true",

    ...headers,
  });

  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;

      if (size > MAX_BODY) {
        reject(
          new Error("Request body is too large.")
        );

        req.destroy();
        return;
      }

      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        resolve(
          Buffer.concat(chunks).toString("utf8")
        );
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

async function requireAdmin(req, res) {
  const session = await getAdminSession(req);

  if (!session) {
    send(res, 401, {
      error: "Authentication required.",
    });

    return false;
  }

  return true;
}

const server = http.createServer(
  async (req, res) => {
    try {
      const url = new URL(
        req.url,
        `http://${req.headers.host || "localhost"}`
      );

      /*
       * CORS PREFLIGHT
       */
      if (req.method === "OPTIONS") {
        res.writeHead(204, {
          "Access-Control-Allow-Origin":
            "http://localhost:5173",

          "Access-Control-Allow-Headers":
            "Content-Type",

          "Access-Control-Allow-Methods":
            "GET,PUT,POST,OPTIONS",

          "Access-Control-Allow-Credentials":
            "true",
        });

        return res.end();
      }

      /*
       * HEALTH CHECK
       */
      if (
        url.pathname === "/api/health" &&
        req.method === "GET"
      ) {
        await withTimeout(
          ensureTables(),
          "Database connection timed out."
        );

        return send(res, 200, {
          ok: true,
          database: "connected",
        });
      }

      /*
       * ADMIN LOGIN
       */
      if (
        url.pathname === "/api/admin/login" &&
        req.method === "POST"
      ) {
        const body = JSON.parse(
          await readBody(req)
        );

        const email = String(
          body.email || ""
        ).trim();

        const password = String(
          body.password || ""
        );

        if (
          !isValidAdminCredentials(
            email,
            password
          )
        ) {
          return send(res, 401, {
            error:
              "Invalid admin email or password.",
          });
        }

        const session =
          await createAdminSession();

        return send(
          res,
          200,
          {
            ok: true,
            authenticated: true,
          },
          {
            "Set-Cookie":
              getAdminCookieHeader(
                session.token,
                session.expiresAt
              ),
          }
        );
      }

      /*
       * ADMIN SESSION CHECK
       */
      if (
        url.pathname ===
          "/api/admin/session" &&
        req.method === "GET"
      ) {
        const session =
          await getAdminSession(req);

        return send(res, 200, {
          authenticated:
            Boolean(session),
        });
      }

      /*
       * ADMIN LOGOUT
       */
      if (
        url.pathname ===
          "/api/admin/logout" &&
        req.method === "POST"
      ) {
        await destroyAdminSession(req);

        return send(
          res,
          200,
          {
            ok: true,
            authenticated: false,
          },
          {
            "Set-Cookie":
              getExpiredAdminCookieHeader(),
          }
        );
      }

      /*
       * CUSTOMER LEADS
       *
       * Customer application/contact data is stored
       * in the separate Neon `leads` table.
       *
       * This endpoint is intentionally public because
       * website visitors need to submit forms.
       */
      if (
        url.pathname === "/api/leads" &&
        req.method === "POST"
      ) {
        const body = JSON.parse(
          await readBody(req)
        );

        const phone = String(
          body.phone || ""
        ).replace(/\D/g, "");

        const source = String(
          body.source || ""
        ).trim();

        if (!/^\d{10}$/.test(phone)) {
          return send(res, 400, {
            error: "Invalid mobile number.",
          });
        }

        /*
         * CONTACT FORM
         */
        if (source === "Contact Form") {
          const name = String(
            body.name || ""
          ).trim();

          const email = String(
            body.email || ""
          ).trim();

          const subject = String(
            body.subject || ""
          ).trim();

          const message = String(
            body.message || ""
          ).trim();

          if (!name) {
            return send(res, 400, {
              error: "Name is required.",
            });
          }

          if (
            !email ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              email
            )
          ) {
            return send(res, 400, {
              error:
                "Valid email is required.",
            });
          }

          if (!subject) {
            return send(res, 400, {
              error: "Subject is required.",
            });
          }

          if (!message) {
            return send(res, 400, {
              error: "Message is required.",
            });
          }

          await createLead({
            id: randomUUID(),
            name,
            email,
            phone,
            subject,
            message,
            source: "Contact Form",
            status: "New",
          });

          return send(res, 201, {
            ok: true,
          });
        }

        /*
         * APPLY NOW
         */
        if (source !== "Apply Now") {
          return send(res, 400, {
            error: "Invalid lead source.",
          });
        }

        /*
         * Find an existing Apply Now lead first.
         *
         * This prevents creating multiple rows for
         * the same phone number during the flow.
         */
        let lead =
          await findLeadByPhone(phone);

        if (!lead) {
          lead = await createLead({
            id: randomUUID(),
            phone,
            source: "Apply Now",
            status: "New",
            consented: false,
            consentedAt: null,
          });
        }

        /*
         * CONSENT
         */
        if (body.action === "consent") {
          lead = await updateLead(
            lead.id,
            {
              consented: true,
              consentedAt:
                body.consentedAt ||
                new Date().toISOString(),
            }
          );
        }

        /*
         * APPLICATION
         */
        if (body.action === "application") {
          const name = String(
            body.name || ""
          ).trim();

          const aadhaar = String(
            body.aadhaar || ""
          ).replace(/\D/g, "");

          const pan = String(
            body.pan || ""
          )
            .trim()
            .toUpperCase();

          const purpose = String(
            body.purpose || ""
          ).trim();

          const loanAmount = Number(
            body.loanAmount
          );

          if (!name) {
            return send(res, 400, {
              error: "Name is required.",
            });
          }

          if (!/^\d{12}$/.test(aadhaar)) {
            return send(res, 400, {
              error:
                "Invalid Aadhaar number.",
            });
          }

          if (
            !/^[A-Z]{5}\d{4}[A-Z]$/.test(
              pan
            )
          ) {
            return send(res, 400, {
              error: "Invalid PAN number.",
            });
          }

          if (
            !Number.isFinite(loanAmount) ||
            loanAmount <= 0
          ) {
            return send(res, 400, {
              error:
                "Invalid loan amount.",
            });
          }

          if (!purpose) {
            return send(res, 400, {
              error:
                "Purpose is required.",
            });
          }

          lead = await updateLead(
            lead.id,
            {
              name,
              phone,
              aadhaar,
              pan,
              loanAmount,
              purpose,
              status: "New",
            }
          );
        } else if (
          body.action !== "consent"
        ) {
          return send(res, 400, {
            error:
              "Invalid lead action.",
          });
        }

        return send(res, 200, {
          ok: true,
        });
      }

      /*
       * ADMIN LEADS
       *
       * Customer leads contain PII and can only
       * be accessed by an authenticated admin.
       */
      if (
        url.pathname ===
          "/api/admin/leads" &&
        req.method === "GET"
      ) {
        if (
          !(await requireAdmin(req, res))
        ) {
          return;
        }

        const leads =
          await getAllLeads();

        return send(res, 200, {
          leads,
        });
      }

      /*
       * CMS
       */
      if (url.pathname === "/api/cms") {

        /*
         * PUBLIC CMS READ
         *
         * The public website can receive CMS content,
         * but customer leads must NEVER be included.
         */
        if (req.method === "GET") {
          const cmsData =
            await getCmsState();

          const publicCmsData =
            cmsData &&
            typeof cmsData === "object"
              ? { ...cmsData }
              : cmsData;

          /*
           * CRITICAL PII PROTECTION
           */
          if (
            publicCmsData &&
            typeof publicCmsData === "object"
          ) {
            delete publicCmsData.leads;
          }

          return send(
            res,
            200,
            {
              data: publicCmsData,
            },
            {
              "Cache-Control":
                "public, max-age=0, s-maxage=10, stale-while-revalidate=30, stale-if-error=3600",
            }
          );
        }

        /*
         * CMS WRITE
         *
         * Only authenticated admins can modify
         * CMS content.
         */
        if (req.method === "PUT") {

          if (
            !(await requireAdmin(
              req,
              res
            ))
          ) {
            return;
          }

          const incoming =
            JSON.parse(
              await readBody(req)
            );

          if (
            !incoming ||
            typeof incoming !==
              "object" ||
            Array.isArray(incoming)
          ) {
            return send(res, 400, {
              error:
                "CMS payload must be a JSON object.",
            });
          }

          /*
           * Preserve legacy cms_state.leads.
           *
           * The public GET endpoint removes `leads`,
           * therefore the admin frontend may not send
           * this property back.
           *
           * We keep the existing legacy value so a CMS
           * save cannot accidentally delete old data.
           */
          const existing =
            await getCmsState();

          const data = {
            ...incoming,
          };

          if (
            existing &&
            typeof existing ===
              "object" &&
            Object.prototype.hasOwnProperty.call(
              existing,
              "leads"
            ) &&
            !Object.prototype.hasOwnProperty.call(
              data,
              "leads"
            )
          ) {
            data.leads =
              existing.leads;
          }

          await saveCmsState(data);

          return send(res, 200, {
            ok: true,
          });
        }
      }

      /*
       * MEDIA UPLOAD
       *
       * Only authenticated admins can upload
       * media into the CMS.
       */
      if (
        url.pathname === "/api/media" &&
        req.method === "POST"
      ) {
        if (
          !(await requireAdmin(
            req,
            res
          ))
        ) {
          return;
        }

        const {
          dataUrl,
          name,
          type,
          pageKey,
          fieldPath,
          entityId,
        } = JSON.parse(
          await readBody(req)
        );

        const match = String(
          dataUrl || ""
        ).match(
          /^data:([^;]+);base64,(.+)$/s
        );

        if (!match) {
          return send(res, 400, {
            error:
              "Invalid data URL.",
          });
        }

        const id = randomUUID();

        await withTimeout(
          saveMedia({
            id,
            name,
            mimeType:
              type || match[1],
            buffer: Buffer.from(
              match[2],
              "base64"
            ),
            pageKey,
            fieldPath,
            entityId,
          }),
          "Media database operation timed out."
        );

        return send(res, 201, {
          id,
          url: `/api/media?id=${encodeURIComponent(
            id
          )}`,
        });
      }

      /*
       * MEDIA FETCH
       *
       * Public because website pages need to
       * display CMS images.
       */
      if (
        url.pathname === "/api/media" &&
        req.method === "GET"
      ) {
        const id =
          url.searchParams.get("id");

        const media = id
          ? await getMedia(id)
          : null;

        if (!media) {
          return send(res, 404, {
            error: "Not found",
          });
        }

        const buffer =
          Buffer.isBuffer(media.data)
            ? media.data
            : Buffer.from(media.data);

        res.writeHead(200, {
          "Content-Type":
            media.mime_type,

          "Cache-Control":
            "public, max-age=31536000, immutable",

          "Access-Control-Allow-Origin":
            "http://localhost:5173",

          "Access-Control-Allow-Credentials":
            "true",
        });

        return res.end(buffer);
      }

      /*
       * NOT FOUND
       */
      return send(res, 404, {
        error: "Not found",
      });

    } catch (error) {
      console.error(error);

      return send(res, 500, {
        error:
          error.message ||
          "Server error",
      });
    }
  }
);

server.listen(PORT, () => {
  console.log(
    `Vallabhi CMS API running on http://localhost:${PORT}`
  );
});