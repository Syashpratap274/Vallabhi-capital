import React, { useEffect, useState } from "react";
import { useCms, sortItems } from "../../cms";
import "./Career.css";

export default function Career() {
  const cms = useCms();
  const career = cms.career || {};

  /* =========================================================
     ADMIN DATA
  ========================================================= */

  const testimonials = sortItems(career.employeeTestimonials || []).filter(
    (item) => item.published !== false
  );

  const jobs = sortItems(career.jobs || []).filter(
    (item) => item.published !== false
  );

  /* =========================================================
     TESTIMONIAL SLIDER
  ========================================================= */

  const [active, setActive] = useState(0);

  const move = (direction) => {
    if (!testimonials.length) return;

    setActive(
      (prev) => (prev + direction + testimonials.length) % testimonials.length
    );
  };

  const item = testimonials[active];

  /* =========================================================
     JOB DEPARTMENTS
     Automatically generated from ADMIN JOBS
  ========================================================= */

  const departments = [
    "All",
    ...Array.from(
      new Set(
        jobs
          .map((job) => job.department)
          .filter(Boolean)
      )
    ),
  ];

  const [activeDepartment, setActiveDepartment] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationJob, setApplicationJob] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedJob(null);
        setApplicationJob(null);
        setApplicationSubmitted(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const filteredJobs =
    activeDepartment === "All"
      ? jobs
      : jobs.filter(
          (job) => job.department === activeDepartment
        );

  /* =========================================================
     HERO CONTENT
     Uses CMS values if available.
     Otherwise falls back to the reference text.
  ========================================================= */

  const heroBanner = career.banner || "/images/aboutus/85700.jpg.jpeg";

  return (
    <main className="career-page">

      {/* =====================================================
    HERO
===================================================== */}

<section
  className="career-hero"
  style={{
    backgroundImage: `url(${heroBanner})`,
  }}
>

  <div className="career-hero-glow career-hero-glow-one" />
  <div className="career-hero-glow career-hero-glow-two" />

  <div className="career-hero-content" />

</section>

      {/* =====================================================
          CURRENT OPENINGS
      ===================================================== */}

      <section className="career-openings-section">

        <div className="career-openings-container">

          <div className="career-opening-filters">

            {departments.map((department) => (
              <button
                key={department}
                type="button"
                className={
                  activeDepartment === department
                    ? "career-filter active"
                    : "career-filter"
                }
                onClick={() => setActiveDepartment(department)}
              >
                {department}
              </button>
            ))}

          </div>


          <div className="career-jobs-list">

            {filteredJobs.length > 0 ? (

              filteredJobs.map((job) => (

                <article
                  className="career-job-row"
                  key={job.id}
                >

                  <div className="career-job-information">

                    <h2>{job.title}</h2>

                    <div className="career-job-meta">

                      {job.location && (
                        <span>
                          <span className="career-meta-icon">
                            ◉
                          </span>
                          {job.location}
                        </span>
                      )}

                      {job.type && (
                        <span>
                          <span className="career-meta-icon">
                            ◷
                          </span>
                          {job.type}
                        </span>
                      )}

                      {job.experience && (
                        <span>
                          <span className="career-meta-icon">
                            ◎
                          </span>
                          {job.experience}
                        </span>
                      )}

                    </div>

                  </div>


                  <div className="career-job-actions">
                    <button
                      type="button"
                      className="career-job-view-apply"
                      onClick={() => setSelectedJob(job)}
                    >
                      View &amp; Apply
                    </button>

                  </div>

                </article>

              ))

            ) : (

              <div className="career-no-openings">

                <h3>
                  No Current Openings
                </h3>

                <p>
                  There are no job opportunities available
                  at the moment. Please check back soon for
                  new openings.
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

      {selectedJob && (
        <div
          className="career-job-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="career-job-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-job-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="career-job-modal-close"
              onClick={() => setSelectedJob(null)}
              aria-label="Close job details"
            >
              ×
            </button>

            <h2 id="career-job-modal-title">{selectedJob.title}</h2>

            <div className="career-job-modal-meta">
              {selectedJob.department && <span><strong>Department</strong>{selectedJob.department}</span>}
              {selectedJob.location && <span><strong>Location</strong>{selectedJob.location}</span>}
              {selectedJob.type && <span><strong>Type</strong>{selectedJob.type}</span>}
              {selectedJob.experience && <span><strong>Experience</strong>{selectedJob.experience}</span>}
            </div>

            {selectedJob.description && (
              <div className="career-job-modal-section">
                <h3>Description</h3>
                <p>{selectedJob.description}</p>
              </div>
            )}

            {selectedJob.responsibilities && (
              <div className="career-job-modal-section">
                <h3>Responsibilities</h3>
                <p>{selectedJob.responsibilities}</p>
              </div>
            )}

            {selectedJob.requirements && (
              <div className="career-job-modal-section">
                <h3>Requirements</h3>
                <p>{selectedJob.requirements}</p>
              </div>
            )}

            {selectedJob.applicationEmail && (
              <p className="career-job-modal-email">
                Application email: {selectedJob.applicationEmail}
              </p>
            )}

            <div className="career-job-modal-action">
              <button
                type="button"
                onClick={() => {
                  setSelectedJob(null);
                  setApplicationSubmitted(false);
                  setApplicationJob(selectedJob);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {applicationJob && (
        <div
          className="career-job-modal-backdrop"
          role="presentation"
          onClick={() => setApplicationJob(null)}
        >
          <div
            className="career-job-modal career-application-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-application-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="career-job-modal-close"
              onClick={() => setApplicationJob(null)}
              aria-label="Close application form"
            >
              ×
            </button>

            {applicationSubmitted ? (
              <div className="career-application-success">
                <h2>Application received</h2>
                <p>Thank you for applying for {applicationJob.title}.</p>
                <button type="button" onClick={() => setApplicationJob(null)}>
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setApplicationSubmitted(true);
                }}
              >
                <h2 id="career-application-title">Apply for {applicationJob.title}</h2>

                <label className="career-application-field">
                  Name
                  <input type="text" name="name" required />
                </label>

                <label className="career-application-field">
                  Phone number
                  <input type="tel" name="phone" required />
                </label>

                <label className="career-application-field">
                  Resume
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
                </label>

                <button type="submit" className="career-application-submit">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}


      {/* =====================================================
          EMPLOYEE TESTIMONIALS
      ===================================================== */}

      <section className="career-testimonial-section">

        <div className="career-testimonial-container">

          <h2>
            Hear From Our{" "}
            <span>Trusted Employees</span>
          </h2>


          {item ? (

            <div className="testimonial-slider">

              {/* LEFT */}
              {testimonials.length > 1 && (
                <button
                  type="button"
                  className="testimonial-side-card testimonial-side-left"
                  onClick={() => move(-1)}
                  aria-label="Previous testimonial"
                >

                  <img
                    src={
                      testimonials[
                        (active - 1 + testimonials.length) %
                          testimonials.length
                      ].image
                    }
                    alt=""
                  />

                  <span className="testimonial-arrow">
                    ←
                  </span>

                </button>
              )}


              {/* MAIN */}
              <div
                className={
                  testimonials.length > 1
                    ? "testimonial-main-card"
                    : "testimonial-main-card testimonial-main-card-single"
                }
              >

                <div className="testimonial-person-image">

                  <img
                    src={item.image}
                    alt={item.name || "Employee"}
                  />

                </div>


                <div className="testimonial-content">

                  <div className="testimonial-header">

                    <div className="testimonial-quote">
                      “
                    </div>

                    <div className="testimonial-person-details">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.designation}
                      </p>

                    </div>

                  </div>

                  <p className="testimonial-text">
                    {item.text}
                  </p>

                </div>

              </div>


              {/* RIGHT */}
              {testimonials.length > 1 && (
                <button
                  type="button"
                  className="testimonial-side-card testimonial-side-right"
                  onClick={() => move(1)}
                  aria-label="Next testimonial"
                >

                  <img
                    src={
                      testimonials[
                        (active + 1) %
                          testimonials.length
                      ].image
                    }
                    alt=""
                  />

                  <span className="testimonial-arrow">
                    →
                  </span>

                </button>
              )}

            </div>

          ) : (

            <div className="career-empty-state">

              <h3>
                No Employee Testimonials Yet
              </h3>

              <p>
                Employee testimonials will appear here
                when added from the Admin Panel.
              </p>

            </div>

          )}


          {testimonials.length > 1 && (

            <div className="testimonial-dots">

              {testimonials.map(
                (testimonial, index) => (

                  <button
                    key={testimonial.id}
                    type="button"
                    className={
                      index === active
                        ? "testimonial-dot active"
                        : "testimonial-dot"
                    }
                    onClick={() =>
                      setActive(index)
                    }
                    aria-label={`Testimonial ${
                      index + 1
                    }`}
                  />

                )
              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}