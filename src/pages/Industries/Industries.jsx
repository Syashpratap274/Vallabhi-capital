import React from "react";
import { Link } from "react-router-dom";
import { useCms, sortItems } from "../../cms";
import "./Industries.css";

const sectionTwoImage =
  "/images/Industries/section 2 industry.png";

const fallbackSlug = (name) =>
  String(name || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeIndustryName = (name) =>
  String(name || "")
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "")
    .toLowerCase();

const resolveIndustryImage = (name, cardImages) => {
  const direct = cardImages?.[name];

  if (direct) {
    return direct;
  }

  const normalized = normalizeIndustryName(name);

  const match = Object.entries(cardImages || {}).find(
    ([key]) => normalizeIndustryName(key) === normalized
  );

  if (match) {
    return match[1];
  }

  return "/images/Industries/industry banner.png";
};

export default function Industries() {
  const cms = useCms();

  const banner =
    cms?.industries?.banner ||
    "/images/Industries/industry banner.png";

  const cardImages =
    cms?.industries?.cardImages || {};

  /*
   * INDUSTRIES NOW COME FROM CMS / NEON ONLY.
   *
   * There is no hardcoded list here.
   * If an industry is unpublished in Admin,
   * it will not appear on the website.
   */
  const industries = sortItems(
    cms?.industries?.items || []
  )
    .filter((item) => item?.published !== false)
    .map((item) => ({
      name: item?.name || "Industry",
      image:
        item?.homepageImage ||
        item?.secondImage ||
        resolveIndustryImage(item?.name, cardImages),
      link: `/industries/${
        item?.slug || fallbackSlug(item?.name)
      }`,
    }));

  return (
    <main className="industries-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="industries-hero">

        <img
          src={banner}
          alt="Industries served by Vallabhi Capital"
          className="industries-hero-image"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "/images/Industries/industry banner.png";
          }}
        />

        <div className="industries-hero-overlay" />

        <div className="industries-hero-content">

          <h1>
            Financing Built
            <br />
            Around Your Industry
          </h1>

          <p>
            Every industry has different business needs,
            cash-flow cycles, and growth plans. Vallabhi Capital
            provides tailored financing solutions to help
            businesses manage working capital, invest in assets,
            and move forward with confidence.
          </p>

          <Link
            to="/products"
            className="hero-explore-btn"
          >
            Explore Products
          </Link>

        </div>
      </section>

      {/* =====================================================
          INDUSTRIES WE SERVED
      ===================================================== */}

      <section className="industries-served-section">

        <div className="industries-container">

          <h2 className="industries-section-title">
            Industries We Served
          </h2>

          <div className="industries-grid">

            {industries.map((industry) => (

              <article
                className="industry-card"
                key={`${industry.name}-${industry.link}`}
              >

                <div className="industry-image-wrapper">

                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="industry-image"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "/images/Industries/industry banner.png";
                    }}
                  />

                </div>

                <div className="industry-card-content">

                  <h3>
                    {industry.name}
                  </h3>

                  <Link
                    to={industry.link}
                    className="industry-know-more"
                  >
                    Know More
                    <span>↗</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}