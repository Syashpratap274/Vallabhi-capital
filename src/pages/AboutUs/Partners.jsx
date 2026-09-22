import React from "react";
import { useCms, readFileAsDataUrl, createId } from "../../cms";
import "./Partners.css";

export default function Partners(){
 const cms=useCms(); const p=cms.partners;
 const LogoGroup=({title,desc,keyName})=><section id={keyName === "lendingPartners" ? "lending-partners" : "technology-partners"} className="partners-section"><div className="partners-section-heading"><h2>{title}</h2>{desc&&<p>{desc}</p>}</div><div className="partners-logo-grid">{p[keyName].length?p[keyName].map(x=><div className="partner-logo-card" key={x.id}><img src={x.image} alt={x.name||title}/></div>):<div className="partners-empty-message"><span>{title} logos</span><p>Logos will be added from the Admin Panel.</p></div>}</div></section>;
 return <main className="partners-page"><LogoGroup title="Our Lending Partners" keyName="lendingPartners"/><LogoGroup title="Our Technology Partners" keyName="technologyPartners"/></main>
}
