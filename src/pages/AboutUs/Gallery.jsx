import React, { useState } from "react";
import { useCms } from "../../cms";
import "./Gallery.css";
function GalleryLegacy() {
  const { gallery } = useCms();
  const folders = Array.isArray(gallery?.folders)
    ? gallery.folders.map((item) => ({
        ...item,
        photos: Array.isArray(item.photos) ? item.photos : [],
      }))
    : [];
  const [folder, setFolder] = useState(null);
  const selected = folders.find((x) => x.id === folder);
  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero-overlay">
          <h1>Gallery</h1>
        </div>
      </section>
      {selected ? (
        <section className="gallery-folder-page">
          <div className="gallery-folder-header">
            <button
              type="button"
              className="gallery-back-button"
              onClick={() => setFolder(null)}
            >
              <span>←</span>All Folders
            </button>
            <div className="gallery-folder-title">
              <h2>{selected.title}</h2>
              <p>
                {selected.photos.length}{" "}
                {selected.photos.length === 1 ? "Photo" : "Photos"}
              </p>
            </div>
          </div>
          {selected.photos.length ? (
            <div className="gallery-photo-grid">
              {selected.photos.map((photo, i) => (
                <div className="gallery-photo-card" key={photo.id}>
                  <img src={photo.image} alt={`${selected.title} ${i + 1}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <div className="gallery-empty-icon">+</div>
              <h3>No Photos Yet</h3>
              <p>Photos for this folder will be added from the Admin Panel.</p>
            </div>
          )}
        </section>
      ) : (
        <section className="gallery-section">
          <div className="gallery-folder-grid">
            {folders.map((f) => {
              const coverPhoto = f.photos?.[0]?.image;

              return (
                <article
                  className="gallery-folder-card"
                  key={f.id}
                  onClick={() => setFolder(f.id)}
                >
                  <div className="gallery-folder-image">
                    {coverPhoto ? (
                      <img
                        src={coverPhoto}
                        alt={f.title}
                        className="gallery-folder-cover-image"
                      />
                    ) : (
                      <div className="gallery-folder-placeholder">
                        <span>
                          {f.photos.length ? "Open folder" : "Photos will be added"}
                        </span>
                      </div>
                    )}
                    <div className="gallery-photo-count">
                      {f.photos.length}{" "}
                      {f.photos.length === 1 ? "Photo" : "Photos"}
                    </div>
                  </div>
                  <div className="gallery-folder-content">
                    <div>
                      <h3>{f.title}</h3>
                      <p>
                        {f.photos.length}{" "}
                        {f.photos.length === 1 ? "Photo" : "Photos"}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="gallery-folder-arrow"
                      aria-label={`Open ${f.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFolder(f.id);
                      }}
                    >
                      →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          {!folders.length && (
            <div className="gallery-empty">
              <h3>No Gallery Folders Yet</h3>
              <p>
                Folders and images will appear here once they are added from the
                Admin Panel.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
export default function Gallery() {
  const { gallery } = useCms();
  const folders = Array.isArray(gallery?.folders)
    ? gallery.folders.map((item) => ({
        ...item,
        photos: Array.isArray(item.photos) ? item.photos : [],
      }))
    : [];
  const [folder, setFolder] = useState(null);
  const selected = folders.find((x) => x.id === folder);
  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero-overlay">
          <h1>Life @ Vallabhi Capital</h1>
        </div>
      </section>
      {selected ? (
        <section className="gallery-folder-page">
          <div className="gallery-folder-header">
            <button
              type="button"
              className="gallery-back-button"
              onClick={() => setFolder(null)}
            >
              <span>←</span>All Folders
            </button>
            <div className="gallery-folder-title">
              <h2>{selected.title}</h2>
              <p>
                {selected.photos.length}{" "}
                {selected.photos.length === 1 ? "Photo" : "Photos"}
              </p>
            </div>
          </div>
          {selected.photos.length ? (
            <div className="gallery-photo-grid">
              {selected.photos.map((photo, i) => (
                <div className="gallery-photo-card" key={photo.id}>
                  <img src={photo.image} alt={`${selected.title} ${i + 1}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <div className="gallery-empty-icon">+</div>
              <h3>No Photos Yet</h3>
              <p>Photos for this folder will be added from the Admin Panel.</p>
            </div>
          )}
        </section>
      ) : (
        <section className="gallery-section">
          <div className="gallery-folder-grid">
            {folders.map((f) => {
              const coverPhoto = f.photos?.[0]?.image;

              return (
                <article
                  className="gallery-folder-card"
                  key={f.id}
                  onClick={() => setFolder(f.id)}
                >
                  <div className="gallery-folder-image">
                    {coverPhoto ? (
                      <img
                        src={coverPhoto}
                        alt={f.title}
                        className="gallery-folder-cover-image"
                      />
                    ) : (
                      <div className="gallery-folder-placeholder">
                        <span>
                          {f.photos.length ? "Open folder" : "Photos will be added"}
                        </span>
                      </div>
                    )}
                    <div className="gallery-photo-count">
                      {f.photos.length}{" "}
                      {f.photos.length === 1 ? "Photo" : "Photos"}
                    </div>
                  </div>
                  <div className="gallery-folder-content">
                    <div>
                      <h3>{f.title}</h3>
                      <p>
                        {f.photos.length}{" "}
                        {f.photos.length === 1 ? "Photo" : "Photos"}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="gallery-folder-arrow"
                      aria-label={`Open ${f.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFolder(f.id);
                      }}
                    >
                      →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          {!folders.length && (
            <div className="gallery-empty">
              <h3>No Gallery Folders Yet</h3>
              <p>
                Folders and images will appear here once they are added from the
                Admin Panel.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
