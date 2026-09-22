import React, { useState } from "react";
import { useCms } from "../../cms";
import "./About.css";

const About = () => {
  const cms = useCms();
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const company = cms?.company || {};

  const intro = company.aboutIntro || {
    paragraphs: [],
  };

  const vision = company.vision || {
    title: "Our Vision",
    logo: "",
    content: [],
  };

  const mission = company.mission || {
    title: "Our Mission",
    logo: "",
    content: [],
  };

  const values = Array.isArray(company.values)
    ? company.values.filter((item) => item?.published !== false)
    : [];

  const founders = Array.isArray(company.founders)
    ? company.founders.filter((item) => item?.published !== false)
    : [];

  const team = Array.isArray(company.team)
    ? company.team.filter((item) => item?.published !== false)
    : [];

  return (
    <main className="about-page">

      {/* =====================================================
          ABOUT VALLABHI CAPITAL
      ===================================================== */}
      <section className="about-intro-section">
        <div className="about-container">

          {/* H1 IS HARDCODED AS REQUESTED */}
          <h1 className="about-main-title">
            About Vallabhi Capital
          </h1>

          <div className="about-intro-content">
            {intro.paragraphs?.map((paragraph, index) => (
              <p key={paragraph.id || index}>
                {paragraph.text}
              </p>
            ))}
          </div>

        </div>
      </section>


      {/* =====================================================
          VISION + MISSION
      ===================================================== */}
      <section className="vision-mission-section" id="vision-mission">
        <div className="about-container">

          <div className="vision-mission-card">

            {/* VISION */}
            <div className="vision-mission-column">

              <div className="vision-mission-heading">
                {vision.logo && (
                  <div className="vision-mission-icon">
                    <img
                      src={vision.logo}
                      alt={vision.title || "Our Vision"}
                    />
                  </div>
                )}

                <h2>{vision.title || "Our Vision"}</h2>
              </div>

              <div className="vision-mission-content">
                {vision.description && <p>{vision.description}</p>}
              </div>

            </div>

            <div className="vision-mission-divider" aria-hidden="true"></div>

            {/* MISSION */}
            <div className="vision-mission-column">

              <div className="vision-mission-heading">
                {mission.logo && (
                  <div className="vision-mission-icon">
                    <img
                      src={mission.logo}
                      alt={mission.title || "Our Mission"}
                    />
                  </div>
                )}

                <h2>{mission.title || "Our Mission"}</h2>
              </div>

              <div className="vision-mission-content">
                {mission.description && <p>{mission.description}</p>}
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          OUR VALUES
      ===================================================== */}
      <section className="about-values-section">
        <div className="about-container">

          <h2 className="about-section-title">
            Our Values
          </h2>

          <div className="values-grid">

            {values.slice(0, 4).map((value, index) => (
              <div
                className="value-card"
                key={value.id || index}
              >

                <div className="value-card-content">
                  {(value.logo || value.image || value.icon || company.valuesImage) && (
                    <div className="value-logo">
                      <img
                        src={value.logo || value.image || value.icon || company.valuesImage}
                        alt={value.title || "Value"}
                      />
                    </div>
                  )}

                  <div className="value-card-copy">
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          OUR FOUNDERS
      ===================================================== */}
      <section className="founders-section">
        <div className="about-container">

          <h2 className="about-section-title founders-title">
            Meet Our Board of Directors
          </h2>

          <div className="founders-grid">

            {founders.map((founder, index) => (
              <article
                className="founder-card"
                key={founder.id || index}
                tabIndex="0"
              >
                <div className="founder-flip">
                  <div className="founder-face founder-front">
                    <div className="founder-image-wrap">
                      {founder.image ? (
                        <img
                          src={founder.image}
                          alt={founder.name || "Founder"}
                          className="founder-image"
                        />
                      ) : (
                        <div className="founder-image-placeholder"></div>
                      )}
                    </div>
                  </div>

                  <div className="founder-face founder-back">
                    <div className="founder-content">
                      <h3>{founder.name}</h3>

                      <span className="founder-designation">
                        {founder.designation}
                      </span>

                      <p className="founder-description-preview">
                        {founder.description || "Learn more about this founder."}
                      </p>

                      <div className="founder-actions">
                        <a
                          className={`founder-action founder-linkedin${founder.linkedin ? "" : " founder-action-disabled"}`}
                          href={founder.linkedin || undefined}
                          target={founder.linkedin ? "_blank" : undefined}
                          rel={founder.linkedin ? "noreferrer" : undefined}
                          aria-disabled={!founder.linkedin}
                          onClick={(event) => {
                            if (!founder.linkedin) event.preventDefault();
                          }}
                        >
                          LinkedIn
                        </a>
                        <button
                          type="button"
                          className="founder-action founder-read-more"
                          onClick={() => setSelectedFounder(founder)}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {selectedFounder && (
        <div className="founder-modal-backdrop" role="presentation" onClick={() => setSelectedFounder(null)}>
          <div
            className="founder-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="founder-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="founder-modal-close"
              aria-label="Close founder details"
              onClick={() => setSelectedFounder(null)}
            >
              ×
            </button>
            {selectedFounder.image && (
              <img
                className="founder-modal-image"
                src={selectedFounder.image}
                alt={selectedFounder.name || "Founder"}
              />
            )}
            <div className="founder-modal-content">
              <h2 id="founder-modal-title">{selectedFounder.name}</h2>
              <span className="founder-designation">{selectedFounder.designation}</span>
              <p>{selectedFounder.description || "No additional information available."}</p>
              {selectedFounder.linkedin && (
                <a
                  className="founder-action founder-linkedin"
                  href={selectedFounder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}


      {/* =====================================================
          MEET OUR TEAM
      ===================================================== */}
      <section className="team-section" id="board-team">
        <div className="about-container">

          <div className="team-heading">
            <h2>
              {company.teamHeading || "MEET OUR "}
              <span>
                {company.teamHeadingHighlight || "GREAT TEAM"}
              </span>
            </h2>

            {company.teamSubtitle && (
              <p>{company.teamSubtitle}</p>
            )}
          </div>


          <div className="team-grid">

            {team.map((member, index) => (
              <article
                className="team-member"
                key={member.id || index}
              >

                <div
                  className="team-image-wrap"
                  role="button"
                  tabIndex="0"
                  aria-label={`View details for ${member.name || "team member"}`}
                  onClick={() => setSelectedTeamMember(member)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedTeamMember(member);
                    }
                  }}
                >

                  {member.image || member.photo ? (
                    <img
                      src={member.image || member.photo}
                      alt={member.name || "Team member"}
                    />
                  ) : (
                    <div className="team-image-placeholder"></div>
                  )}

                </div>

                <h3>{member.name}</h3>

                <p>{member.designation}</p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {selectedTeamMember && (
        <div className="team-modal-backdrop" role="presentation" onClick={() => setSelectedTeamMember(null)}>
          <div
            className="team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="team-modal-close"
              aria-label="Close team member details"
              onClick={() => setSelectedTeamMember(null)}
            >
              ×
            </button>
            {(selectedTeamMember.image || selectedTeamMember.photo) && (
              <img
                className="team-modal-image"
                src={selectedTeamMember.image || selectedTeamMember.photo}
                alt={selectedTeamMember.name || "Team member"}
              />
            )}
            <div className="team-modal-content">
              <h2 id="team-modal-title">{selectedTeamMember.name}</h2>
              <span>{selectedTeamMember.designation}</span>
              <p>{selectedTeamMember.description || selectedTeamMember.text || "No additional information available."}</p>
              {selectedTeamMember.linkedin && (
                <a href={selectedTeamMember.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default About;