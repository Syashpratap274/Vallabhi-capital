import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCms, sortItems } from "../../cms";
import "./IndustryDetail.css";

/* =========================================================
   IMAGE FALLBACK MAP ONLY
   ---------------------------------------------------------
   This is used only when an Admin image field is empty.
   It does NOT contain industry content.
========================================================= */

const IMAGE_MAP = {
  "Auto & Auto Ancillaries":
    "/images/Industries/auto.png",

  Hospitality:
    "/images/Industries/Hospitality.png",

  Constructions:
    "/images/Industries/Construction.png",

  Logistics:
    "/images/Industries/Logistic.png",

  "Capital Goods":
    "/images/Industries/Capital Goods.png",

  Pharmaceuticals:
    "/images/Industries/Pharmaceuticals.png",

  "Micro Enterprises":
    "/images/Industries/Micro Enterprises.png",

  Agro:
    "/images/Industries/Agro.png",

  Chemical:
    "/images/Industries/Chemical.png",

  "E - Mobility & Green":
    "/images/Industries/E - Mobility & Green.png",
};


/* =========================================================
   INDUSTRY LOOKUP NORMALIZATION
========================================================= */

const normalizeIndustryLookup = (value) => {

  const raw = String(value ?? "")
    .trim()
    .toLowerCase();

  if (!raw) {
    return "";
  }

  const normalized = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const canonical = {

    "auto-and-auto-ancillaries":
      "auto-auto-ancillary",

    "auto-and-auto-ancillary":
      "auto-auto-ancillary",

    "auto-auto-ancillaries":
      "auto-auto-ancillary",

    "e-mobility-and-green":
      "e-mobility-green",

    "e-mobility-green":
      "e-mobility-green",

    "e-mobility-and-green-energy":
      "e-mobility-green",

  };

  return canonical[normalized] || normalized;
};


/* =========================================================
   INDUSTRY DETAIL
========================================================= */

export default function IndustryDetail() {

  const { slug } = useParams();

  const cms = useCms();

  const routeKey =
    normalizeIndustryLookup(slug);


  /* =======================================================
     FIND INDUSTRY FROM NEON / CMS
  ======================================================= */

  const cmsItem =
    sortItems(
      cms?.industries?.items || []
    ).find((item) => {

      const itemKeys = [
        item?.slug,
        item?.name,
      ].map(normalizeIndustryLookup);

      return (
        itemKeys.includes(routeKey) ||
        itemKeys.includes(
          normalizeIndustryLookup(slug)
        )
      );

    });


  /* =======================================================
     INDUSTRY NOT FOUND
  ======================================================= */

  if (!cmsItem) {

    return (
      <main className="industry-detail-page">

        <div className="industry-detail-missing">

          <h1>
            Industry Not Found
          </h1>

          <Link to="/industries">
            Back to Industries
          </Link>

        </div>

      </main>
    );

  }


  /* =======================================================
     ALL CONTENT BELOW COMES FROM CMS / NEON
  ======================================================= */

  const name =
    cmsItem?.name || "Industry";


  /*
   * Hero title.
   *
   * If you later add a heroTitle field to the Admin,
   * it will automatically be used.
   *
   * Until then, this is generated only from the
   * Admin industry name.
   */

  const heroTitle =
    cmsItem?.heroTitle ||
    `${name} Business`;


  /*
   * Heading
   *
   * No old hardcoded industry heading is used.
   */

  const heading =
    cmsItem?.heading ||
    `Financial Solutions for ${name}`;


  /*
   * Subtitle
   *
   * No old hardcoded industry subtitle is used.
   */

  const subtitle =
    cmsItem?.subtitle ||
    "Tailored financing solutions designed around your industry.";


  /* =======================================================
     CONTENT
  ======================================================= */

  const rawContent =
    cmsItem?.content || "";


  const hasHtmlContent =
    /<[^>]+>/i.test(
      String(rawContent)
    );


  const paragraphs =
    hasHtmlContent
      ? []
      : rawContent
        ? String(rawContent)
            .split(/\n{2,}/)
            .map((x) => x.trim())
            .filter(Boolean)
        : [];


  /* =======================================================
     BANNER IMAGE
  ======================================================= */

  const banner =
    cmsItem?.bannerImage ||
    cms?.industries?.banner ||
    "/images/Industries/industry banner.png";


  /* =======================================================
     INDUSTRY IMAGE
  ======================================================= */

  const industryImage =
    cmsItem?.secondImage ||
    cmsItem?.homepageImage ||
    cms?.industries?.cardImages?.[name] ||
    IMAGE_MAP[name] ||
    "/images/Industries/industry banner.png";


  /* =======================================================
     STATS
     ONLY USE VALUES FROM CMS
  ======================================================= */

  const statFields = [

    [
      "Market Size",
      cmsItem?.marketSize,
    ],

    [
      "Core Focus",
      cmsItem?.coreFocus,
    ],

    [
      "Loan Amount",
      cmsItem?.loanAmount,
    ],

    [
      "Approval Timeline",
      cmsItem?.approvalTimeline,
    ],

  ];


  const stats =
    statFields
      .filter(
        ([, item]) =>
          item?.value
      )
      .map(
        ([label, item]) => [
          label,
          item.value,
        ]
      );


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <main className="industry-detail-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="industry-detail-hero">

        <img
          className="industry-detail-hero-image"
          src={banner}
          alt={`${name} industry`}
          onError={(event) => {

            event.currentTarget.onerror = null;

            event.currentTarget.src =
              "/images/Industries/industry banner.png";

          }}
        />

        <div className="industry-detail-hero-overlay" />

        <div className="industry-detail-hero-content">

          <h1>
            Finance for Your
            <br />
            {heroTitle}
          </h1>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="industry-detail-content">


        {/* ===================================================
            HEADING
        =================================================== */}

        <div className="industry-detail-heading">

          <h2>
            {heading}
          </h2>

          <p>
            {subtitle}
          </p>

        </div>


        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        {hasHtmlContent ? (

          <div
            className="industry-detail-copy"
            dangerouslySetInnerHTML={{
              __html: rawContent,
            }}
          />

        ) : (

          <div className="industry-detail-copy">

            {paragraphs.map(
              (paragraph, index) => (

                <p key={index}>
                  {paragraph}
                </p>

              )
            )}

          </div>

        )}


        {/* ===================================================
            IMAGE + STATS
        =================================================== */}

        <div className="industry-detail-stats-wrap">


          <div className="industry-detail-image-card">

            <img
              src={industryImage}
              alt={`${name} business`}
              onError={(event) => {

                event.currentTarget.onerror = null;

                event.currentTarget.src =
                  IMAGE_MAP[name] ||
                  "/images/Industries/industry banner.png";

              }}
            />

          </div>


          <div className="industry-detail-stats-panel">

            {stats.map(
              ([label, value]) => (

                <div
                  className="industry-detail-stat"
                  key={label}
                >

                  <span>
                    {label}:
                  </span>

                  <strong>
                    {value}
                  </strong>

                </div>

              )
            )}

          </div>


        </div>

      </section>

    </main>

  );

}