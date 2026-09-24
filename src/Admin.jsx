import React, { useMemo, useState } from "react";
import { createId, readFileAsDataUrl, saveCms, sortItems, upsertGalleryFolder, useCms } from "./cms";
import LeadsAdmin from "./LeadsAdmin";
import "./Admin.css";

const nav = ["Dashboard", "Homepage", "Products", "Industries", "Blogs", "Company", "Partners", "Career", "ESG", "Gallery", "Contact Us", "Leads", "Media Library"];
const slugify = (s) => String(s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const normalizeIndustrySlug = (value, fallback = "") => {
  const raw = String(value ?? "").trim();
  const base = raw ? slugify(raw) : slugify(fallback);
  const canonical = {
    "auto-and-auto-ancillaries": "auto-auto-ancillary",
    "auto-and-auto-ancillary": "auto-auto-ancillary",
    "auto-auto-ancillaries": "auto-auto-ancillary",
    "e-mobility-and-green": "e-mobility-green",
    "e-mobility-green": "e-mobility-green",
    "e-mobility-and-green-energy": "e-mobility-green",
  };
  return canonical[base] || base;
};
const normalizeRouteSlug = (value, fallback = "") => {
  const raw = String(value ?? "").trim();
  if (!raw) return normalizeIndustrySlug(fallback, fallback);
  return raw
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map((part) => normalizeIndustrySlug(part))
    .filter(Boolean)
    .join("/");
};

const emptyProduct = () => ({
  id: createId("product"), name: "", category: "loan", slug: "", shortDescription: "", productLogo: "", heroSubtitle: "", heroParagraph: "", cardImage: "", heroImage: "", description: "",
  published: true, homepageVisible: false, order: 999, eligibility: [], documents: [], terms: [],
  benefits: [1, 2, 3].map((i) => ({ id: createId(`benefit-${i}`), title: "", description: "", image: "" })),
  whyPoints: [], faqs: []
});
const emptyIndustry = () => ({ id: createId("industry"), name: "", slug: "", bannerImage: "", heading: "", subtitle: "", content: "", secondImage: "", homepageImage: "", published: true, order: 999, marketSize: { icon: "", value: "" }, coreFocus: { icon: "", value: "" }, loanAmount: { icon: "", value: "" }, approvalTimeline: { icon: "", value: "" } });
const emptyBlog = () => ({ id: createId("blog"), title: "", slug: "", author: "", category: "", image: "", content: "<p></p>", published: false, order: 999, publishedAt: "" });

function Upload({ label, help, value, onChange, ownership, onUploadingChange }) {
  return <div className="adm-upload">
    <div className="adm-field-heading"><label>{label}</label>{help && <small>{help}</small>}</div>
    {value && <img src={value} className="adm-preview" alt="Preview" />}
    <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; onUploadingChange?.(true); try { onChange(await readFileAsDataUrl(file, ownership)); } finally { onUploadingChange?.(false); } }} />
    {value && <button type="button" className="adm-secondary" onClick={() => onChange("")}>Remove image</button>}
  </div>;
}
function Toggle({ value, onChange }) { return <button type="button" className={`adm-toggle ${value ? "on" : ""}`} onClick={() => onChange(!value)}><span />{value ? "Published" : "Draft"}</button>; }
function Field({ label, value, onChange, textarea = false, help }) { return <label className="adm-field"><span>{label}</span>{help && <small>{help}</small>}{textarea ? <textarea rows="5" value={value || ""} onChange={(e) => onChange(e.target.value)} /> : <input value={value || ""} onChange={(e) => onChange(e.target.value)} />}</label>; }
function Modal({ title, subtitle, children, onClose, onSave, saveDisabled = false }) { return <div className="adm-modal-backdrop"><div className="adm-modal"><div className="adm-modal-head"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div><button type="button" onClick={onClose}>×</button></div>{children}<div className="adm-modal-actions"><button type="button" className="adm-secondary" onClick={onClose}>Cancel</button><button type="button" className="adm-primary" disabled={saveDisabled} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onSave(); }}>{saveDisabled ? "Uploading..." : "Save changes"}</button></div></div></div>; }
function List({ title, description, items = [], onAdd, onEdit, onDelete }) { return <section className="adm-panel"><div className="adm-panel-title"><div><h2>{title}</h2>{description && <p className="adm-note">{description}</p>}</div>{onAdd && <button className="adm-primary" onClick={onAdd}>+ Add</button>}</div>{items.length ? <div className="adm-list">{items.map((x) => <div className="adm-item-row" key={x.id}><div>{x.image && <img src={x.image} alt="" />}<div><strong>{x.title || x.name || x.question || "Untitled"}</strong><small>{x.published === false ? "Draft" : "Published"}</small></div></div><div className="adm-actions"><button onClick={() => onEdit(x)}>Edit</button><button className="adm-danger" onClick={() => onDelete(x)}>Delete</button></div></div>)}</div> : <div className="adm-empty">No items added yet.</div>}</section>; }

export default function Admin() {
  const [logged, setLogged] = useState(() => sessionStorage.getItem("vc_admin_auth") === "1");
  const [section, setSection] = useState("Dashboard");
  const data = useCms();
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const update = async (fn, message = "Changes saved") => {
    const next = structuredClone(data);
    fn(next);
    setSaving(true);
    try {
      await saveCms(next);
      setToast(message);
    } catch (error) {
      console.error("Admin CMS save failed:", error);
      setToast("Save failed — check CMS server / Neon connection");
    } finally {
      setSaving(false);
      setTimeout(() => setToast(""), 2600);
    }
  };
  const stats = useMemo(() => ({ products: data.products.items?.length || 0, industries: data.industries.items?.length || 0, blogs: data.blogs?.length || 0, leads: data.leads?.length || 0, testimonials: data.homepage.clientTestimonials?.length || 0 }), [data]);
  if (!logged) return <AdminLogin onLogin={() => { sessionStorage.setItem("vc_admin_auth", "1"); setLogged(true); }} />;
  return <div className="admin-shell">
    <aside className="admin-sidebar"><div className="admin-brand"><strong>VALLABHI</strong><span>CAPITAL ADMIN</span></div><div className="admin-nav-label">CONTENT</div>{nav.map((x) => <button key={x} className={section === x ? "active" : ""} onClick={() => setSection(x)}>{x}</button>)}</aside>
    <main className="admin-main"><header className="admin-top"><div><span>Website Content Management</span><h1>{section}</h1></div><div className="admin-top-actions"><span className="adm-save-status">{saving ? "Saving to Neon…" : "Neon CMS"}</span><a href="/" className="view-site">View Website ↗</a><button className="adm-secondary" onClick={() => { sessionStorage.removeItem("vc_admin_auth"); setLogged(false); }}>Logout</button></div></header>{toast && <div className="adm-toast">✓ {toast}</div>}
      {section === "Dashboard" && <Dashboard stats={stats} go={setSection} />}
      {section === "Homepage" && <Homepage data={data} update={update} setModal={setModal} />}
      {section === "Products" && <Products data={data} update={update} setModal={setModal} />}
      {section === "Industries" && <Industries data={data} update={update} setModal={setModal} />}
      {section === "Blogs" && <Blogs data={data} update={update} setModal={setModal} />}
      {section === "Company" && <Company data={data} update={update} setModal={setModal} />}
      {section === "Partners" && <Partners data={data} update={update} />}
      {section === "Career" && <CareerAdmin data={data} update={update} setModal={setModal} />}
      {section === "ESG" && <ESGAdmin data={data} update={update} />}
      {section === "Gallery" && <GalleryAdmin data={data} update={update} setModal={setModal} />}
      {section === "Contact Us" && <Contact data={data} update={update} />}
      {section === "Leads" && <LeadsAdmin data={data} update={update} />}
      {section === "Media Library" && <MediaLibrary />}
      {modal && <EditorModal modal={modal} setModal={setModal} update={update} />}
    </main>
  </div>;
}

function AdminLogin({ onLogin }) { const [e, setE] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(""); return <div className="admin-login"><form onSubmit={(x) => { x.preventDefault(); if (e === "admin@vallabhicapital.com" && p === "Admin@123") onLogin(); else setErr("Invalid admin email or password"); }}><div className="admin-brand-login"><strong>VALLABHI</strong><span>CAPITAL ADMIN</span></div><h1>Admin Login</h1><p>Manage website content without changing the frontend design.</p><label>Email<input type="email" value={e} onChange={(x) => setE(x.target.value)} required /></label><label>Password<input type="password" value={p} onChange={(x) => setP(x.target.value)} required /></label>{err && <div className="admin-login-error">{err}</div>}<button className="adm-primary">Sign In</button></form></div>; }
function Dashboard({ stats, go }) { return <><div className="adm-welcome"><h2>Website overview</h2><p>Use the sections on the left to manage content. The website layout stays unchanged; these controls only change CMS content.</p></div><div className="adm-cards">{[["Products", stats.products], ["Industries", stats.industries], ["Blogs", stats.blogs], ["Testimonials", stats.testimonials], ["Leads", stats.leads]].map(([a, b]) => <button className="adm-stat" key={a} onClick={() => go(a)}><span>{a}</span><strong>{b}</strong><small>Manage {a.toLowerCase()}</small></button>)}</div></>; }

function Homepage({ data, update, setModal }) {
  const h = data.homepage || {}; const items = sortItems(data.products?.items || []); const inds = sortItems(data.industries?.items || []); const selected = items.filter((p) => p.homepageVisible !== false);
  const toggleHomeProduct = (id, checked) => update((d) => { const arr = d.products.items || []; const count = arr.filter((p) => p.homepageVisible !== false && p.id !== id).length; if (checked && count >= 6) return; const p = arr.find((x) => x.id === id); if (p) p.homepageVisible = checked; }, checked ? "Homepage product selected" : "Homepage product removed");
  const moveProduct = (id, direction) => update((d) => { const arr = sortItems(d.products.items || []); const selectedIds = arr.filter((p) => p.homepageVisible !== false).map((p) => p.id); const i = selectedIds.indexOf(id); const j = direction === "up" ? i - 1 : i + 1; if (i < 0 || j < 0 || j >= selectedIds.length) return; [selectedIds[i], selectedIds[j]] = [selectedIds[j], selectedIds[i]]; selectedIds.forEach((pid, n) => { const p = d.products.items.find((x) => x.id === pid); if (p) p.order = n + 1; }); }, "Homepage product order updated");
  return <>
    <section className="adm-panel"><div className="adm-panel-title"><div><h2>Homepage Banner</h2><p className="adm-note">Displayed as the main homepage hero banner.</p></div></div><Upload label="Banner image" value={h.bannerImage} onChange={(v) => update((d) => d.homepage.bannerImage = v)} /></section>
    <section className="adm-panel"><div className="adm-panel-title"><div><h2>Homepage Product Selection</h2><p className="adm-note">The homepage has space for exactly 6 products. Select which 6 of your products should appear.</p></div><span className={`adm-count ${selected.length === 6 ? "complete" : ""}`}>{selected.length} / 6 selected</span></div>{items.map((p) => <div className="adm-item-row" key={p.id}><div>{(p.productLogo || p.cardImage) && <img src={p.productLogo || p.cardImage} alt="" />}<div><strong>{p.name || "Unnamed product"}</strong><small>{p.shortDescription || "No short description"}</small></div></div><div className="adm-actions"><button className={`adm-check ${p.homepageVisible !== false ? "checked" : ""}`} onClick={() => toggleHomeProduct(p.id, p.homepageVisible === false)}> {p.homepageVisible !== false ? "✓ Showing" : "Show on homepage"}</button>{p.homepageVisible !== false && <><button onClick={() => moveProduct(p.id, "up")}>↑</button><button onClick={() => moveProduct(p.id, "down")}>↓</button></>}</div></div>)}</section>
    <section className="adm-panel"><div className="adm-panel-title"><div><h2>Homepage Industry Images</h2><p className="adm-note">These images are used only for the industry cards on the homepage.</p></div></div>{inds.map((x, i) => <div className="adm-media-row" key={x.id}><div><strong>{x.name || "Unnamed industry"}</strong><small>Homepage industry card image</small></div><Upload label="Card image" value={x.homepageImage || x.secondImage || ""} onChange={(v) => update((d) => d.industries.items[i].homepageImage = v)} /></div>)}</section>
    <List title="Client Testimonials" description="This is the existing testimonial system. These testimonials continue to come from Admin and are shown on the homepage." items={h.clientTestimonials || []} onAdd={() => setModal({ type: "testimonial", title: "Add Client Testimonial", item: { id: createId("testimonial"), name: "", role: "", text: "", image: "", published: true } })} onEdit={(x) => setModal({ type: "testimonial", title: "Edit Client Testimonial", item: structuredClone(x) })} onDelete={(x) => update((d) => d.homepage.clientTestimonials = d.homepage.clientTestimonials.filter((y) => y.id !== x.id))} />
    <List title="Homepage FAQs" description="These FAQs are displayed in the homepage FAQ section." items={h.faqs || []} onAdd={() => setModal({ type: "faq", target: "home", title: "Add Homepage FAQ", item: { id: createId("faq"), question: "", answer: "", published: true } })} onEdit={(x) => setModal({ type: "faq", target: "home", title: "Edit Homepage FAQ", item: structuredClone(x) })} onDelete={(x) => update((d) => d.homepage.faqs = d.homepage.faqs.filter((y) => y.id !== x.id))} />
  </>;
}

function Products({ data, update, setModal }) { const items = sortItems(data.products?.items || []); return <>
  <section className="adm-panel"><div className="adm-panel-title"><div><h2>Products</h2><p className="adm-note">Add, edit or delete products. Every product uses the same frontend page template.</p></div><button className="adm-primary" onClick={() => setModal({ type: "product", title: "Add Product", item: emptyProduct() })}>+ Add Product</button></div>
    {items.map((x) => <div className="adm-item-row" key={x.id}><div>{x.cardImage && <img src={x.cardImage} alt="" />}<div><strong>{x.name || "Unnamed product"}</strong><small>{x.shortDescription || "No short description"} · {x.published === false ? "Draft" : "Published"}</small></div></div><div className="adm-actions"><button onClick={() => setModal({ type: "product", title: "Edit Product", item: structuredClone(x) })}>Edit</button><button className="adm-danger" onClick={() => { if (window.confirm(`Delete ${x.name || "this product"}?`)) update((d) => d.products.items = d.products.items.filter((y) => y.id !== x.id)); }}>Delete</button></div></div>)}
  </section>
  <section className="adm-panel"><h2>Main Product Page — Why Vallabhi Capital</h2><p className="adm-note">These points are shown in the Why Vallabhi Capital section on the main Products page. Add as many as you need.</p><Repeater items={data.products.whyPoints || []} setItems={(v) => update(d => d.products.whyPoints = v)} sectionLabel="Why Vallabhi point" withImage /></section>
  <section className="adm-panel"><h2>Main Product Page FAQs</h2><p className="adm-note">These FAQs are for the main Products page, not individual products.</p><FaqInline items={data.products.faqs || []} update={update} target="products" setModal={setModal} /></section>
</>; }

function Industries({ data, update, setModal }) { const items = sortItems(data.industries?.items || []); return <>
  <section className="adm-panel"><div className="adm-panel-title"><div><h2>Main Industry Page</h2><p className="adm-note">This banner appears at the top of the main Industries page.</p></div></div><Upload label="Industry page banner" value={data.industries?.banner || ""} onChange={(v) => update((d) => d.industries.banner = v)} /></section>
  <section className="adm-panel"><div className="adm-panel-title"><div><h2>Industries</h2><p className="adm-note">Add, edit or delete industries. New industries automatically use the same detail-page template.</p></div><button className="adm-primary" onClick={() => setModal({ type: "industry", title: "Add Industry", item: emptyIndustry() })}>+ Add Industry</button></div>{items.map((x) => <div className="adm-item-row" key={x.id}><div>{x.bannerImage && <img src={x.bannerImage} alt="" />}<div><strong>{x.name || "Unnamed industry"}</strong><small>/{x.slug || "new-industry"} · {x.published === false ? "Draft" : "Published"}</small></div></div><div className="adm-actions"><button onClick={() => setModal({ type: "industry", title: "Edit Industry", item: structuredClone(x) })}>Edit</button><button className="adm-danger" onClick={() => { if (window.confirm(`Delete ${x.name || "this industry"}?`)) update((d) => d.industries.items = d.industries.items.filter((y) => y.id !== x.id)); }}>Delete</button></div></div>)}</section>
</>; }

function Blogs({ data, update, setModal }) { const items = sortItems(data.blogs || []); return <section className="adm-panel"><div className="adm-panel-title"><div><h2>Blog Management</h2><p className="adm-note">Create and edit blogs here. Every published blog gets its own /blogs/:slug page.</p></div><button className="adm-primary" onClick={() => setModal({ type: "blog", title: "Create Blog", item: emptyBlog() })}>+ Create Blog</button></div>{items.length ? items.map((x) => <div className="adm-item-row" key={x.id}><div>{x.image && <img src={x.image} alt="" />}<div><strong>{x.title || "Untitled Blog"}</strong><small>{x.category || "No category"} · /blogs/{x.slug || slugify(x.title)} · {x.published ? "Published" : "Draft"}</small></div></div><div className="adm-actions"><button onClick={() => setModal({ type: "blog", title: "Edit Blog", item: structuredClone(x) })}>Edit content</button><button className="adm-danger" onClick={() => { if (window.confirm("Delete this blog?")) update((d) => { d.blogs = (d.blogs || []).filter((y) => y.id !== x.id); d.homepage.blogs = d.blogs; }); }}>Delete</button></div></div>) : <div className="adm-empty">No blogs created yet.</div>}</section>; }

function EditorModal({ modal, setModal, update }) {
  const item = modal.item; const [uploading, setUploading] = useState(false); const set = (k, v) => setModal({ ...modal, item: { ...modal.item, [k]: v } });
  const save = () => {
    if (modal.type === "product") update((d) => { item.slug = normalizeRouteSlug(item.slug, item.name); item.order = item.order || d.products.items.length + 1; const i = d.products.items.findIndex((x) => x.id === item.id); if (i >= 0) d.products.items[i] = item; else d.products.items.push(item); });
    else if (modal.type === "industry") update((d) => { item.slug = normalizeRouteSlug(item.slug, item.name); item.order = item.order || d.industries.items.length + 1; const i = d.industries.items.findIndex((x) => x.id === item.id); if (i >= 0) d.industries.items[i] = item; else d.industries.items.push(item); });
    else if (modal.type === "blog") update((d) => { item.slug = normalizeRouteSlug(item.slug, item.title); const arr = d.blogs || []; const i = arr.findIndex((x) => x.id === item.id); if (i >= 0) arr[i] = item; else arr.push(item); d.blogs = arr; d.homepage.blogs = arr; });
    else if (modal.type === "faq") update((d) => { const arr = modal.target === "home" ? d.homepage.faqs : d.products.faqs; const i = arr.findIndex((x) => x.id === item.id); if (i >= 0) arr[i] = item; else arr.push(item); });
    else if (modal.type === "testimonial") update((d) => { const arr = d.homepage.clientTestimonials; const i = arr.findIndex((x) => x.id === item.id); if (i >= 0) arr[i] = item; else arr.push(item); });
    else if (modal.type === "team") update((d) => { const arr = d.company.team || (d.company.team = []); const i = arr.findIndex(x => x.id === item.id); if (i >= 0) arr[i] = item; else arr.push({...item,id:createId("team")}); });
    else if (modal.type === "founder") update((d) => { const arr = d.company.founders || (d.company.founders = []); const i = arr.findIndex(x => x.id === item.id); if (i >= 0) arr[i] = item; else arr.push({...item,id:createId("founder")}); });
    else if (modal.type === "employee") update((d) => { const arr = d.career.employeeTestimonials || (d.career.employeeTestimonials = []); const i = arr.findIndex(x => x.id === item.id); if (i >= 0) arr[i] = item; else arr.push({...item,id:createId("employee")}); });
    else if (modal.type === "job") update((d) => { const arr = d.career.jobs || (d.career.jobs = []); const i = arr.findIndex(x => x.id === item.id); if (i >= 0) arr[i] = item; else arr.push({...item,id:createId("job")}); });
    else if (modal.type === "folder") update((d) => {
      const current = d.gallery || (d.gallery = {});
      const folderData = {
        ...item,
        id: item.id || createId("folder"),
        title: String(item.title || "").trim() || "Untitled folder",
        photos: Array.isArray(item.photos) ? item.photos : [],
      };
      const next = upsertGalleryFolder(d, folderData);
      d.gallery = next.gallery;
    });
    setModal(null);
  };
  let body = null;
  if (modal.type === "product") body = <div className="adm-form">
    <div className="adm-form-intro"><strong>Product basics</strong><span>These fields control the product card and the product detail page.</span></div>
    <Field label="Product name" value={item.name} onChange={(v) => set("name", v)} />
    <label className="adm-field"><span>Product section</span><small>Choose where this product appears on the main Products page.</small><select value={item.category || "loan"} onChange={(e) => set("category", e.target.value)}><option value="loan">Loans We Offer</option><option value="supply-chain">Supply Chain</option></select></label>
    <Field label="URL slug" value={item.slug} onChange={(v) => set("slug", v)} help="Example: msm e-loan → /products/msme-loan" />
    <Field label="Short description" value={item.shortDescription} onChange={(v) => set("shortDescription", v)} textarea help="Used on the main Products page and product cards." />
    <Field label="Hero span text" value={item.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} help="This appears directly under the H1 in the product hero banner." />
    <Field label="Hero paragraph" value={item.heroParagraph} onChange={(v) => set("heroParagraph", v)} textarea help="Small supporting paragraph shown below the hero subtitle." />
    <Field label="Product description" value={item.description} onChange={(v) => set("description", v)} textarea help="Main product description where the template uses it." />
    <div className="adm-grid2"><Upload label="Product logo (Homepage card)" help="This is the logo/icon shown inside the homepage product card. It is separate from the product card image." value={item.productLogo} onChange={(v) => set("productLogo", v)} /><Upload label="Product card image (Main Products page)" help="Image used on the main Products page card." value={item.cardImage} onChange={(v) => set("cardImage", v)} /><Upload label="Product hero banner" help="Full-width banner on product detail page" value={item.heroImage} onChange={(v) => set("heroImage", v)} /></div>
    <Toggle value={item.published !== false} onChange={(v) => set("published", v)} />
    <section className="adm-form-section"><h3>What You'll Need to Apply</h3><p>Each row becomes a title in <strong>H3</strong> and its one-line description in a <strong>P</strong> tag on the product page.</p><Repeater items={item.eligibility || []} setItems={(v) => set("eligibility", v)} sectionLabel="Eligibility Criteria" /><Repeater items={item.documents || []} setItems={(v) => set("documents", v)} sectionLabel="Required Documents" /><Repeater items={item.terms || []} setItems={(v) => set("terms", v)} sectionLabel="Our Terms" /></section>
    <section className="adm-form-section"><h3>Benefits</h3><p>The product page has exactly 3 benefit cards. Edit the title, description and icon/image for each.</p>{(item.benefits || []).slice(0, 3).map((b, i) => <div className="adm-card-editor" key={b.id || i}><h4>Benefit {i + 1}</h4><Field label="Benefit title" value={b.title} onChange={(v) => { const a = [...item.benefits]; a[i] = { ...b, title: v }; set("benefits", a); }} /><Field label="Benefit description" value={b.description || b.text} onChange={(v) => { const a = [...item.benefits]; a[i] = { ...b, description: v, text: v }; set("benefits", a); }} /><Upload label="Benefit icon / image" value={b.image} onChange={(v) => { const a = [...item.benefits]; a[i] = { ...b, image: v }; set("benefits", a); }} /></div>)}</section>
    <section className="adm-form-section"><h3>Why Vallabhi Capital</h3><p>Add as many points as required. Each point shows its uploaded logo/icon beside the title on the product page.</p><Repeater items={item.whyPoints || []} setItems={(v) => set("whyPoints", v)} sectionLabel="Why Vallabhi point" withImage /></section>
    <section className="adm-form-section"><h3>Product FAQs</h3><p>These FAQs appear only on this product's detail page.</p><FaqEditor items={item.faqs || []} setItems={(v) => set("faqs", v)} /></section>
  </div>;
  if (modal.type === "industry") body = <div className="adm-form">
    <div className="adm-form-intro"><strong>Industry basics</strong><span>These fields create the industry card and its individual detail page.</span></div>
    <Field label="Industry name" value={item.name} onChange={(v) => set("name", v)} /><Field label="URL slug" value={item.slug} onChange={(v) => set("slug", v)} />
    <Upload label="Industry banner" help="Top banner on the individual industry page" value={item.bannerImage} ownership={{ pageKey: "industries", fieldPath: `items.${item.id}.bannerImage`, entityId: item.id }} onUploadingChange={setUploading} onChange={(v) => set("bannerImage", v)} />
    <Field label="Industry heading (H2)" value={item.heading} onChange={(v) => set("heading", v)} help="This appears as the H2 above the main copy on the detail page." />
    <Field label="Industry subtitle (paragraph)" value={item.subtitle} onChange={(v) => set("subtitle", v)} help="This small paragraph appears directly under the H2 on the industry page." />
    <div className="adm-form-section"><h3>Industry description</h3><p>Use the editor below to style the main content like a blog article.</p><RichTextEditor value={item.content || "<p></p>"} onChange={(v) => set("content", v)} /></div>
    <Upload label="Second image" help="Image displayed below the main industry content" value={item.secondImage} ownership={{ pageKey: "industries", fieldPath: `items.${item.id}.secondImage`, entityId: item.id }} onUploadingChange={setUploading} onChange={(v) => set("secondImage", v)} />
    <section className="adm-form-section"><h3>Industry information</h3><p>These four fixed fields are displayed beside the second image.</p>{[["marketSize", "Market Size"], ["coreFocus", "Core Focus"], ["loanAmount", "Loan Amount"], ["approvalTimeline", "Approval Timeline"]].map(([k, label]) => <div className="adm-card-editor" key={k}><h4>{label}</h4><Field label={`${label} value`} value={item[k]?.value} onChange={(v) => set(k, { ...(item[k] || {}), value: v })} /><Upload label={`${label} logo / icon`} value={item[k]?.icon} onChange={(v) => set(k, { ...(item[k] || {}), icon: v })} /></div>)}</section>
    <Toggle value={item.published !== false} onChange={(v) => set("published", v)} />
  </div>;
  if (modal.type === "blog") body = <div className="adm-form"><div className="adm-form-intro"><strong>Blog content</strong><span>Write and format the article here. The published article gets its own page automatically.</span></div><Field label="Blog title" value={item.title} onChange={(v) => set("title", v)} /><Field label="URL slug" value={item.slug} onChange={(v) => set("slug", v)} /><div className="adm-grid2"><Field label="Author" value={item.author} onChange={(v) => set("author", v)} /><label className="adm-field"><span>Publish date</span><input type="date" value={item.publishedAt || ""} onChange={(e) => set("publishedAt", e.target.value)} /></label></div><Upload label="Featured image" value={item.image} onChange={(v) => set("image", v)} /><RichTextEditor value={item.content || "<p></p>"} onChange={(v) => set("content", v)} /><Toggle value={item.published === true} onChange={(v) => set("published", v)} /></div>;
  if (modal.type === "faq") body = <div className="adm-form"><Field label="Question" value={item.question} onChange={(v) => set("question", v)} /><Field label="Answer" value={item.answer} onChange={(v) => set("answer", v)} textarea /><Toggle value={item.published !== false} onChange={(v) => set("published", v)} /></div>;
  if (modal.type === "testimonial") body = <div className="adm-form"><Field label="Name" value={item.name} onChange={(v) => set("name", v)} /><Field label="Role" value={item.role} onChange={(v) => set("role", v)} /><Field label="Testimonial" value={item.text} onChange={(v) => set("text", v)} textarea /><Upload label="Photo" value={item.image} onChange={(v) => set("image", v)} /><Toggle value={item.published !== false} onChange={(v) => set("published", v)} /></div>;
  if (modal.type === "team") body = <div className="adm-form"><Field label="Name" value={item.name} onChange={(v) => set("name", v)} /><Field label="Designation" value={item.designation} onChange={(v) => set("designation", v)} /><Field label="Description" value={item.description} onChange={(v) => set("description", v)} textarea help="Shown in the popup when the team member image is clicked." /><Upload label="Photo" value={item.photo || item.image} onChange={(v) => set("photo", v)} /><Field label="LinkedIn URL" value={item.linkedin} onChange={(v) => set("linkedin", v)} /></div>;
  if (modal.type === "founder") body = <div className="adm-form"><Field label="Name" value={item.name} onChange={(v) => set("name", v)} /><Field label="Designation" value={item.designation} onChange={(v) => set("designation", v)} /><Field label="Description" value={item.description} onChange={(v) => set("description", v)} textarea /><Field label="LinkedIn URL" value={item.linkedin} onChange={(v) => set("linkedin", v)} help="Example: https://www.linkedin.com/in/name" /><Upload label="Photo" value={item.image} onChange={(v) => set("image", v)} /><Toggle value={item.published !== false} onChange={(v) => set("published", v)} /></div>;
  if (modal.type === "employee") body = <div className="adm-form"><Field label="Name" value={item.name} onChange={(v) => set("name", v)} /><Field label="Designation" value={item.designation} onChange={(v) => set("designation", v)} /><Field label="Testimonial" value={item.text} onChange={(v) => set("text", v)} textarea /><Upload label="Photo" value={item.image} onChange={(v) => set("image", v)} /><Toggle value={item.published !== false} onChange={(v) => set("published", v)} /></div>;
  if (modal.type === "job") body = <div className="adm-form"><Field label="Job title" value={item.title} onChange={(v) => set("title", v)} /><div className="adm-grid2"><Field label="Department" value={item.department} onChange={(v) => set("department", v)} /><Field label="Location" value={item.location} onChange={(v) => set("location", v)} /><Field label="Experience" value={item.experience} onChange={(v) => set("experience", v)} /><Field label="Employment type" value={item.type} onChange={(v) => set("type", v)} /></div><Field label="Description" value={item.description} onChange={(v) => set("description", v)} textarea /><Field label="Responsibilities" value={item.responsibilities} onChange={(v) => set("responsibilities", v)} textarea /><Field label="Requirements" value={item.requirements} onChange={(v) => set("requirements", v)} textarea /><Field label="Application email" value={item.applicationEmail} onChange={(v) => set("applicationEmail", v)} /><Toggle value={item.published === true} onChange={(v) => set("published", v)} /></div>;
  if (modal.type === "folder") body = <div className="adm-form"><Field label="Folder name" value={item.title} onChange={(v) => set("title", v)} /></div>;
  return <Modal title={modal.title} subtitle={modal.type === "product" ? "All fields below are mapped to the product page template." : undefined} onClose={() => setModal(null)} onSave={save} saveDisabled={uploading}>{body}</Modal>;
}

function Repeater({ items, setItems, sectionLabel, withImage = false }) { return <div className="adm-repeater"><div className="adm-repeater-head"><strong>{sectionLabel}</strong><button className="adm-secondary" type="button" onClick={() => setItems([...(items || []), { id: createId("point"), title: "", description: "", image: "" }])}>+ Add {sectionLabel}</button></div>{(items || []).map((x, i) => <div className="adm-card-editor" key={x.id || i}><div className="adm-row-title"><h4>{sectionLabel} {i + 1}</h4><button className="adm-danger" type="button" onClick={() => setItems(items.filter((_, n) => n !== i))}>Remove</button></div><Field label="Title (shown as H3)" value={x.title || x.name || ""} onChange={(v) => { const a = [...items]; a[i] = { ...x, title: v }; setItems(a); }} /><Field label="One-line description (shown as P)" value={x.description || x.text || ""} onChange={(v) => { const a = [...items]; a[i] = { ...x, description: v, text: v }; setItems(a); }} />{withImage && <Upload label="Logo / icon" value={x.image || ""} onChange={(v) => { const a = [...items]; a[i] = { ...x, image: v }; setItems(a); }} />}</div>)}</div>; }
function FaqEditor({ items, setItems }) { return <div className="adm-repeater">{items.map((x, i) => <div className="adm-card-editor" key={x.id || i}><div className="adm-row-title"><h4>FAQ {i + 1}</h4><button className="adm-danger" type="button" onClick={() => setItems(items.filter((_, n) => n !== i))}>Remove</button></div><Field label="Question" value={x.question} onChange={(v) => { const a = [...items]; a[i] = { ...x, question: v }; setItems(a); }} /><Field label="Answer" value={x.answer} onChange={(v) => { const a = [...items]; a[i] = { ...x, answer: v }; setItems(a); }} textarea /></div>)}<button className="adm-secondary" type="button" onClick={() => setItems([...items, { id: createId("faq"), question: "", answer: "", published: true }])}>+ Add FAQ</button></div>; }
function FaqInline({ items, update, target, setModal }) { return <div className="adm-list">{items.map((x) => <div className="adm-item-row" key={x.id}><div><strong>{x.question}</strong><small>{x.published === false ? "Draft" : "Published"}</small></div><div className="adm-actions"><button onClick={() => setModal({ type: "faq", target, title: "Edit FAQ", item: structuredClone(x) })}>Edit</button><button className="adm-danger" onClick={() => update((d) => { const key = target === "home" ? "homepage" : "products"; d[key].faqs = d[key].faqs.filter((y) => y.id !== x.id); })}>Delete</button></div></div>)}<button className="adm-secondary" onClick={() => setModal({ type: "faq", target, title: "Add FAQ", item: { id: createId("faq"), question: "", answer: "", published: true } })}>+ Add FAQ</button></div>; }

function RichTextEditor({ value, onChange }) { const ref = React.useRef(null); const [ready, setReady] = useState(false); React.useEffect(() => { if (ref.current && !ready) { ref.current.innerHTML = value || "<p><br></p>"; setReady(true); } }, [value, ready]); const cmd = (command, val = null) => { ref.current?.focus(); document.execCommand(command, false, val); onChange(ref.current?.innerHTML || ""); }; const addLink = () => { const url = window.prompt("Enter link URL"); if (url) cmd("createLink", url); }; return <div className="adm-rich-editor"><div className="adm-editor-toolbar"><button type="button" onClick={() => cmd("formatBlock", "<h2>")}>H2</button><button type="button" onClick={() => cmd("formatBlock", "<h3>")}>H3</button><button type="button" onClick={() => cmd("bold")}>B</button><button type="button" onClick={() => cmd("italic")}>I</button><button type="button" onClick={() => cmd("insertUnorderedList")}>• List</button><button type="button" onClick={() => cmd("insertOrderedList")}>1. List</button><button type="button" onClick={addLink}>Link</button><button type="button" onClick={() => cmd("formatBlock", "<p>")}>Paragraph</button></div><div ref={ref} className="adm-editor-surface" contentEditable suppressContentEditableWarning onInput={(e) => onChange(e.currentTarget.innerHTML)} /><small>Formatting is saved with the blog content. Use headings, paragraphs, lists, bold, italic and links like a normal article editor.</small></div>; }

function Company({ data, update, setModal }) {
  const company = data.company || {};
  return <>
    <section className="adm-panel"><h2>Company assets</h2><p className="adm-note">These images continue to power the existing Company sections.</p><div className="adm-grid2"><Upload label="Hero image" value={company.heroImage || ""} onChange={(v) => update((d) => d.company.heroImage = v)} /><Upload label="Vision image / logo" value={company.visionImage || ""} onChange={(v) => update((d) => d.company.visionImage = v)} /><Upload label="Mission image / logo" value={company.missionImage || ""} onChange={(v) => update((d) => d.company.missionImage = v)} /><Upload label="Values image / logo" value={company.valuesImage || ""} onChange={(v) => update((d) => d.company.valuesImage = v)} /></div></section>
    <section className="adm-panel"><h2>About page content</h2><p className="adm-note">These fields are displayed on the About Vallabhi Capital page.</p><Field label="Intro paragraphs" value={company.aboutIntro?.paragraphs?.map((x) => x.text).join("\n\n")} textarea onChange={(v) => update((d) => { d.company.aboutIntro.paragraphs = v.split(/\n\s*\n/).map((text, i) => ({ id: d.company.aboutIntro.paragraphs?.[i]?.id || createId("intro"), text })).filter((x) => x.text.trim()); })} help="Separate paragraphs with a blank line." /><div className="adm-grid2"><Field label="Team heading" value={company.teamHeading} onChange={(v) => update((d) => d.company.teamHeading = v)} /><Field label="Team heading highlight" value={company.teamHeadingHighlight} onChange={(v) => update((d) => d.company.teamHeadingHighlight = v)} /></div><Field label="Team subtitle" value={company.teamSubtitle} onChange={(v) => update((d) => d.company.teamSubtitle = v)} textarea /></section>
    <section className="adm-panel"><h2>Vision and Mission</h2><p className="adm-note">Edit the two cards shown on the About page.</p><div className="adm-grid2"><AboutBlockEditor title="Vision" value={company.vision} update={(value) => update((d) => d.company.vision = value)} /><AboutBlockEditor title="Mission" value={company.mission} update={(value) => update((d) => d.company.mission = value)} /></div></section>
    <ValuesEditor items={company.values || []} update={(items) => update((d) => d.company.values = items)} />
    <List title="Our Founders" description="Only published founders appear on the About page." items={company.founders || []} onAdd={() => setModal({ type: "founder", title: "Add Founder", item: { id: createId("founder"), name: "", designation: "", description: "", linkedin: "", image: "", published: true } })} onEdit={(x) => setModal({ type: "founder", title: "Edit Founder", item: structuredClone(x) })} onDelete={(x) => update((d) => d.company.founders = d.company.founders.filter((y) => y.id !== x.id))} />
    <List title="Board of Directors / Team" description="Add, edit or remove team members and LinkedIn links." items={company.team || []} onAdd={() => setModal({ type: "team", title: "Add Team Member", item: { id: createId("team"), name: "", designation: "", description: "", photo: "", linkedin: "" } })} onEdit={(x) => setModal({ type: "team", title: "Edit Team Member", item: structuredClone(x) })} onDelete={(x) => update((d) => d.company.team = d.company.team.filter((y) => y.id !== x.id))} />
  </>;
}

function AboutBlockEditor({ title, value = {}, update }) {
  const block = value || {};
  return <div className="adm-card-editor adm-about-block"><h3>{title}</h3><Field label={`${title} title`} value={block.title} onChange={(v) => update({ ...block, title: v })} /><Field label={`${title} description`} value={block.description} onChange={(v) => update({ ...block, description: v })} textarea /><Upload label={`${title} logo`} value={block.logo} onChange={(v) => update({ ...block, logo: v })} /></div>;
}

function TextPointsEditor({ title, items, setItems }) { return <div className="adm-repeater"><div className="adm-repeater-head"><strong>{title}</strong><button className="adm-secondary" type="button" onClick={() => setItems([...(items || []), { id: createId("point"), text: "" }])}>+ Add point</button></div>{(items || []).map((x, i) => <div className="adm-card-editor" key={x.id || i}><div className="adm-row-title"><h4>{title} {i + 1}</h4><button className="adm-danger" type="button" onClick={() => setItems(items.filter((_, n) => n !== i))}>Remove</button></div><Field label="Text" value={x.text} onChange={(v) => { const next = [...items]; next[i] = { ...x, text: v }; setItems(next); }} textarea /></div>)}</div>; }

function ValuesEditor({ items, update }) { return <section className="adm-panel"><div className="adm-panel-title"><div><h2>Our Values</h2><p className="adm-note">The About page displays exactly four value cards. Use the Logo upload inside each value for its individual icon.</p></div>{items.length < 4 && <button className="adm-primary" onClick={() => update([...(items || []), { id: createId("value"), title: "", description: "", logo: "", published: true }])}>+ Add Value</button>}</div>{(items || []).slice(0, 4).map((x, i) => <div className="adm-card-editor" key={x.id || i}><div className="adm-row-title"><h4>Value {i + 1}</h4><button className="adm-danger" type="button" onClick={() => update(items.filter((_, n) => n !== i))}>Remove</button></div><Field label="Title" value={x.title} onChange={(v) => { const next = [...items]; next[i] = { ...x, title: v }; update(next); }} /><Field label="Description" value={x.description} onChange={(v) => { const next = [...items]; next[i] = { ...x, description: v }; update(next); }} textarea /><Upload label="Value logo / icon" help="This image appears on this value card. The Company assets logo is used only as a fallback." value={x.logo || x.image || x.icon || ""} onChange={(v) => { const next = [...items]; next[i] = { ...x, logo: v }; update(next); }} /><Toggle value={x.published !== false} onChange={(v) => { const next = [...items]; next[i] = { ...x, published: v }; update(next); }} /></div>)}</section>; }
function Partners({ data, update }) {
  const TECHNOLOGY_PDF_NAMES = [
    "Fair practice code",
    "KYC & AML Policy",
    "Interest Rate Policy",
    "Refund & Cancellation Policy",
    "Terms & Condition Policy",
  ];

  const group = (title, key) => (
    <section className="adm-panel">
      <div className="adm-panel-title">
        <div>
          <h2>{title}</h2>
          <p className="adm-note">These logos continue to power the existing Partners page.</p>
        </div>
        <button
          className="adm-primary"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
              if (input.files?.[0]) {
                const image = await readFileAsDataUrl(input.files[0]);
                update((d) => {
                  d.partners[key] = d.partners?.[key] || [];
                  d.partners[key].push({ id: createId("partner"), name: "", image });
                });
              }
            };
            input.click();
          }}
        >
          + Add Logo
        </button>
      </div>
      <div className="adm-media-grid">
        {(data.partners?.[key] || []).map((x, i) => (
          <div className="logo-card" key={x.id || i}>
            <img src={x.image} alt="Partner logo" />
            <span>{x.name || `Partner ${i + 1}`}</span>
            <button className="adm-danger" onClick={() => update((d) => d.partners[key] = (d.partners?.[key] || []).filter((y) => y.id !== x.id))}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );

  const pdfGroup = () => (
    <section className="adm-panel">
      <div className="adm-panel-title">
        <div>
          <h2>Technology Partners</h2>
          <p className="adm-note">These five PDF policies are the only documents shown on the public Technology Partners section.</p>
        </div>
      </div>
      <div className="adm-media-grid">
        {TECHNOLOGY_PDF_NAMES.map((name) => {
          const item = (data.partners?.technologyPartners || []).find((x) => x.name === name) || { id: createId("tech-pdf"), name, pdfUrl: "" };
          return (
            <div className="logo-card partner-pdf-admin-card" key={item.id || name}>
              <div className="partner-pdf-admin-icon">PDF</div>
              <span>{name}</span>
              <label className="adm-upload partner-pdf-upload">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (file.type && !file.type.toLowerCase().includes("pdf")) {
                      window.alert("Only PDF files are allowed.");
                      return;
                    }
                    const pdfUrl = await readFileAsDataUrl(file);
                    update((d) => {
                      d.partners.technologyPartners = d.partners?.technologyPartners || [];
                      const existingIndex = d.partners.technologyPartners.findIndex((x) => x.name === name);
                      const entry = { id: existingIndex >= 0 ? d.partners.technologyPartners[existingIndex].id : createId("tech-pdf"), name, pdfUrl, fileName: file.name, mimeType: "application/pdf" };
                      if (existingIndex >= 0) d.partners.technologyPartners[existingIndex] = entry;
                      else d.partners.technologyPartners.push(entry);
                    });
                    event.target.value = "";
                  }}
                />
                {item.pdfUrl ? "Replace PDF" : "Upload PDF"}
              </label>
              {item.pdfUrl && (
                <>
                  <a href={item.pdfUrl} target="_blank" rel="noreferrer">Open PDF</a>
                  <button className="adm-danger" onClick={() => update((d) => {
                    d.partners.technologyPartners = (d.partners?.technologyPartners || []).filter((x) => x.name !== name);
                  })}>Delete</button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <>
      <section className="adm-panel">
        <h2>Partners Banner</h2>
        <Upload label="Banner" value={data.partners?.banner || ""} onChange={(v) => update((d) => d.partners.banner = v)} />
      </section>
      {group("Lending Partners", "lendingPartners")}
      {pdfGroup()}
    </>
  );
}
function CareerAdmin({ data, update, setModal }) { return <><section className="adm-panel"><h2>Career Banner</h2><Upload label="Banner" value={data.career?.banner||""} onChange={v=>update(d=>d.career.banner=v)}/></section><List title="Employee Testimonials" description="These remain the same Admin-managed employee testimonials used by the Career page." items={data.career?.employeeTestimonials||[]} onAdd={()=>setModal({type:"employee",title:"Add Employee Testimonial",item:{id:createId("employee"),name:"",designation:"",text:"",image:"",published:true}})} onEdit={x=>setModal({type:"employee",title:"Edit Employee Testimonial",item:structuredClone(x)})} onDelete={x=>update(d=>d.career.employeeTestimonials=d.career.employeeTestimonials.filter(y=>y.id!==x.id))}/><List title="Job Openings" description="Only published jobs are displayed on the Career page." items={data.career?.jobs||[]} onAdd={()=>setModal({type:"job",title:"Add Job Opening",item:{id:createId("job"),title:"",department:"",location:"",experience:"",type:"Full Time",description:"",responsibilities:"",requirements:"",applicationEmail:"",published:false}})} onEdit={x=>setModal({type:"job",title:"Edit Job Opening",item:structuredClone(x)})} onDelete={x=>update(d=>d.career.jobs=d.career.jobs.filter(y=>y.id!==x.id))}/></>; }
function ESGAdmin({ data, update }) {
  const esg = data.esg || {};
  const banner = esg.banner || {};
  const principles = Array.isArray(esg.principles) ? esg.principles : [];
  const initiatives = Array.isArray(esg.initiatives) ? esg.initiatives : [];
  const updatePrinciple = (index, field, value) => update((d) => {
    d.esg.principles[index] = { ...(d.esg.principles[index] || {}), [field]: value };
  });
  const updateInitiative = (index, value) => update((d) => {
    d.esg.initiatives[index] = { ...(d.esg.initiatives[index] || {}), ...value };
  });
  const addInitiative = () => update((d) => {
    d.esg.initiatives.push({ id: createId("esg"), title: "", description: "<p></p>", photos: [] });
  }, "ESG event added");
  const removeInitiative = (id) => update((d) => {
    d.esg.initiatives = d.esg.initiatives.filter((item) => item.id !== id);
  }, "ESG event removed");
  const addPhotos = async (index, files) => {
    const photos = await Promise.all(files.map((file) => readFileAsDataUrl(file)));
    updateInitiative(index, { photos: [...(initiatives[index].photos || []), ...photos] });
  };
  return <>
    <section className="adm-panel">
      <div className="adm-panel-title"><div><h2>ESG Banner</h2><p className="adm-note">Controls the banner image and heading shown on the ESG page.</p></div></div>
      <div className="adm-form"><Upload label="Banner image" value={banner.image} onChange={(value) => update((d) => d.esg.banner.image = value)} /><Field label="Main heading" value={banner.title} onChange={(value) => update((d) => d.esg.banner.title = value)} /><Field label="Heading highlight" value={banner.subtitle} onChange={(value) => update((d) => d.esg.banner.subtitle = value)} /></div>
    </section>
    <section className="adm-panel">
      <div className="adm-panel-title"><div><h2>ESG Principles</h2><p className="adm-note">These three cards appear below the ESG heading.</p></div></div>
      {principles.map((item, index) => <div className="adm-card-editor" key={item.id || index}><h3>Principle {index + 1}</h3><Field label="Icon" value={item.icon} onChange={(value) => updatePrinciple(index, "icon", value)} /><Field label="Title" value={item.title} onChange={(value) => updatePrinciple(index, "title", value)} /><Field label="Description" value={item.description} onChange={(value) => updatePrinciple(index, "description", value)} textarea /></div>)}
    </section>
    <section className="adm-panel">
      <div className="adm-panel-title"><div><h2>ESG Events and Initiatives</h2><p className="adm-note">Add the events displayed in the alternating ESG initiatives section.</p></div><button className="adm-primary" onClick={addInitiative}>+ Add Event</button></div>
      {initiatives.length ? initiatives.map((item, index) => <div className="adm-card-editor" key={item.id || index}>
        <div className="adm-row-title"><h3>Event {index + 1}</h3><button className="adm-danger" type="button" onClick={() => removeInitiative(item.id)}>Remove</button></div>
        <Field label="Event title" value={item.title} onChange={(value) => updateInitiative(index, { title: value })} />
        <div className="adm-form-section"><h4>Event description</h4><RichTextEditor value={item.description || "<p></p>"} onChange={(value) => updateInitiative(index, { description: value })} /></div>
        <div className="adm-form-section"><h4>Event photos</h4><div className="adm-media-grid">{(item.photos || []).map((photo, photoIndex) => <div className="logo-card" key={`${item.id}-${photoIndex}`}><img src={photo} alt="" /><button className="adm-danger" type="button" onClick={() => updateInitiative(index, { photos: item.photos.filter((_, currentIndex) => currentIndex !== photoIndex) })}>Remove</button></div>)}</div><input type="file" accept="image/*" multiple onChange={(event) => { addPhotos(index, [...event.target.files]); event.target.value = ""; }} /></div>
      </div>) : <div className="adm-empty">No ESG events yet. Add the first event to show it on the ESG page.</div>}
    </section>
  </>;
}

function GalleryAdmin({ data, update, setModal }) { const folders=Array.isArray(data.gallery?.folders)?data.gallery.folders:[]; return <section className="adm-panel"><div className="adm-panel-title"><div><h2>Gallery Folders</h2><p className="adm-note">Create folders and add/remove images. The existing Gallery page continues to use this data.</p></div><button className="adm-primary" onClick={()=>setModal({type:"folder",title:"Create Gallery Folder",item:{id:createId("folder"),title:""}})}>+ New Folder</button></div>{folders.length?folders.map(folder=><div className="adm-folder" key={folder.id}><div className="folder-top"><strong>{folder.title}</strong><div className="adm-actions"><button onClick={()=>setModal({type:"folder",title:"Edit Gallery Folder",item:structuredClone(folder)})}>Rename</button><button className="adm-danger" onClick={()=>{if(window.confirm(`Delete folder ${folder.title}?`))update(d=>d.gallery.folders=d.gallery.folders.filter(x=>x.id!==folder.id))}}>Delete folder</button></div></div><div className="adm-media-grid">{(folder.photos||[]).map(photo=><div className="logo-card" key={photo.id}><img src={photo.image} alt=""/><button className="adm-danger" onClick={()=>update(d=>{const f=d.gallery.folders.find(x=>x.id===folder.id);if(f)f.photos=f.photos.filter(p=>p.id!==photo.id)})}>Remove</button></div>)}</div><button className="adm-secondary" onClick={()=>{const input=document.createElement("input");input.type="file";input.accept="image/*";input.multiple=true;input.onchange=async()=>{const imgs=await Promise.all([...input.files].map(readFileAsDataUrl));update(d=>{const f=d.gallery.folders.find(x=>x.id===folder.id);if(f){f.photos=f.photos||[];imgs.forEach(image=>f.photos.push({id:createId("photo"),image}))}})};input.click()}}>+ Add Images</button></div>):<div className="adm-empty">No gallery folders yet. Create your first folder.</div>}</section>; }
function Contact({ data, update }) { const c=data.contact||{}; return <><section className="adm-panel"><h2>Contact Banner</h2><Upload label="Banner" value={c.banner||""} onChange={v=>update(d=>d.contact.banner=v)}/></section><section className="adm-panel"><h2>Contact Settings</h2><p className="adm-note">These values continue to feed the existing Contact Us page.</p><div className="adm-form"><Field label="Address" value={c.address} onChange={v=>update(d=>d.contact.address=v)} textarea/><Field label="Phone" value={c.phone} onChange={v=>update(d=>d.contact.phone=v)}/><Field label="Email" value={c.email} onChange={v=>update(d=>d.contact.email=v)}/><Field label="Opening time" value={c.openingTime} onChange={v=>update(d=>d.contact.openingTime=v)}/></div></section><section className="adm-panel"><h2>Form-side Image</h2><Upload label="Image beside the form" value={c.formImage||""} onChange={v=>update(d=>d.contact.formImage=v)}/></section></>; }
function Leads({ data, update }) { const [q,setQ]=useState(""); const [status,setStatus]=useState("All"); const filtered=(data.leads||[]).filter(x=>(status==="All"||x.status===status)&&JSON.stringify(x).toLowerCase().includes(q.toLowerCase())); const exportCsv=()=>{const rows=["Name,Company,Phone,Email,Product,Loan Amount,Source,Status,Date",...(data.leads||[]).map(x=>[x.name,x.company,x.phone,x.email,x.product,x.loanAmount,x.source,x.status,x.date].map(v=>`"${String(v||"").replaceAll('"','""')}"`).join(","))];const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([rows.join("\n")],{type:"text/csv"}));a.download="vallabhi-leads.csv";a.click();}; return <section className="adm-panel"><div className="adm-panel-title"><div><h2>Applications / Form Submissions</h2><p className="adm-note">All website form records can be searched, filtered, updated and exported.</p></div><button className="adm-primary" onClick={exportCsv}>Export CSV</button></div><div className="adm-toolbar"><input className="adm-search" placeholder="Search leads..." value={q} onChange={e=>setQ(e.target.value)}/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>New</option><option>Contacted</option><option>Follow-up</option><option>Converted</option><option>Closed</option></select></div>{filtered.length?<div className="adm-table-wrap"><table><thead><tr><th>Name</th><th>Company</th><th>Phone</th><th>Email</th><th>Product</th><th>Status</th><th>Date</th></tr></thead><tbody>{filtered.map(x=><tr key={x.id}><td>{x.name}</td><td>{x.company}</td><td>{x.phone}</td><td>{x.email}</td><td>{x.product}</td><td><select value={x.status||"New"} onChange={e=>update(d=>{const l=d.leads.find(y=>y.id===x.id);if(l)l.status=e.target.value})}><option>New</option><option>Contacted</option><option>Follow-up</option><option>Converted</option><option>Closed</option></select></td><td>{x.date}</td></tr>)}</tbody></table></div>:<div className="adm-empty">No matching submissions.</div>}</section>; }
function MediaLibrary({data,update}){const [q,setQ]=useState("");const files=[];const collect=(value,path="")=>{if(typeof value==="string"&&value.startsWith("data:image"))files.push({path,image:value});else if(value&&typeof value==="object")Object.entries(value).forEach(([k,v])=>collect(v,path?`${path}.${k}`:k));};collect(data);const filtered=files.filter(x=>x.path.toLowerCase().includes(q.toLowerCase()));const upload=()=>{const input=document.createElement("input");input.type="file";input.accept="image/*";input.multiple=true;input.onchange=async()=>{const imgs=await Promise.all([...input.files].map(readFileAsDataUrl));update(d=>{d.media=d.media||[];imgs.forEach(image=>d.media.push({id:createId("media"),image,name:"Uploaded Image"}))})};input.click()};return <section className="adm-panel"><div className="adm-panel-title"><div><h2>Media Library</h2><p className="adm-note">Images already assigned through Admin are shown here.</p></div><button className="adm-primary" onClick={upload}>+ Upload Images</button></div><input className="adm-search" placeholder="Search by usage..." value={q} onChange={e=>setQ(e.target.value)}/><div className="adm-media-grid">{filtered.map((x,i)=><div className="logo-card" key={i}><img src={x.image} alt=""/><span>{x.path}</span></div>)}</div>{!filtered.length&&<div className="adm-empty">No managed images found.</div>}</section>}
