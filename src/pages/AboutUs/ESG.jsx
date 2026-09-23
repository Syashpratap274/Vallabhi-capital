import React, { useEffect, useState } from "react";
import { useCms } from "../../cms";
import "./ESG.css";

/* =========================================================
   EVENT IMAGE SLIDER
========================================================= */

function ESGEventSlider({ photos = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);

    if (photos.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((previous) => {
        return (previous + 1) % photos.length;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [photos]);

  if (!photos.length) {
    return (
      <div className="esg-event-image esg-no-image">
        <span>No image available</span>
      </div>
    );
  }

  return (
    <div className="esg-event-image">
      {photos.map((photo, index) => (
        <img
          key={`${photo}-${index}`}
          src={photo}
          alt={title || "ESG initiative"}
          className={`esg-slide-image ${
            index === currentIndex ? "active" : ""
          }`}
        />
      ))}

      {photos.length > 1 && (
        <div className="esg-slider-dots">
          {photos.map((_, index) => (
            <span
              key={index}
              className={`esg-slider-dot ${
                index === currentIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}


/* =========================================================
   ESG PAGE
========================================================= */

export default function ESG() {
  const cms = useCms();

  const esg = cms?.esg || {};

  const banner = esg.banner || {};
  const principles = Array.isArray(esg.principles) ? esg.principles : [];

  const initiatives = Array.isArray(esg.initiatives)
    ? esg.initiatives
    : [];

  return (
    <main className="esg-page">

      {/* =====================================================
          BANNER - FROM ADMIN
      ===================================================== */}

      <section className="esg-banner">

        {banner.image && (
          <img
            src={banner.image}
            alt="ESG"
            className="esg-banner-image"
          />
        )}

        <div className="esg-banner-overlay" />

      </section>


      {/* =====================================================
          FIXED H1
      ===================================================== */}

      <section className="esg-intro section-container">

        <h1 className="esg-main-heading">
          <span>{banner.title || "Building a Sustainable Future"}</span>{" "}
          {banner.subtitle || "Through Responsible Finance"}
        </h1>

      </section>


      {/* =====================================================
          FIXED ESG THREE COLUMN BLOCK
      ===================================================== */}

      <section className="esg-principles section-container">

        <div className="esg-principles-box">

          {principles.map((principle, index) => (
            <div className="esg-principle" key={principle.id || index}>
              <div className="esg-principle-icon">{principle.icon}</div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          FIXED H2
      ===================================================== */}

      <section className="esg-initiatives section-container">

        <h2 className="esg-section-heading">
          Our <span>ESG Initiatives</span>
        </h2>


        {/* ===================================================
            ADMIN EVENTS
        =================================================== */}

        <div className="esg-events">

          {initiatives.map((event, index) => {

            const photos = Array.isArray(event.photos)
              ? event.photos
              : event.image
                ? [event.image]
                : [];

            /*
              EVEN INDEX:
              0 = images left / content right
              2 = images left / content right

              ODD INDEX:
              1 = content left / images right
              3 = content left / images right
            */

            const reverse = index % 2 === 1;

            return (
              <article
                className={`esg-event ${
                  reverse ? "esg-event-reverse" : ""
                }`}
                key={event.id || index}
              >

                {/* IMAGE */}

                <div className="esg-event-left">

                  <ESGEventSlider
                    photos={photos}
                    title={event.title}
                  />

                </div>


                {/* CONTENT */}

                <div className="esg-event-content">

                  {event.title && (
                    <h3>
                      {event.title}
                    </h3>
                  )}

                  {event.description && (
                    <div
                      className="esg-event-description"
                      dangerouslySetInnerHTML={{
                        __html: event.description,
                      }}
                    />
                  )}

                </div>

              </article>
            );
          })}

        </div>


        {/* EMPTY STATE */}

        {initiatives.length === 0 && (
          <div className="esg-empty">
            No ESG initiatives have been added yet.
          </div>
        )}

      </section>

    </main>
  );
}