import { Link, useLocation } from "react-router-dom";
import "./Policies.css";

const policyContent = {
  "/policies/privacy-policy": {
    title: "Privacy Policy",
    sections: [
      {
        paragraphs: [
          "The terms We, Us, Our and Company refer to Vallabhi Capital Private Limited. The terms You, Your and Yourself refer to visitors and users of this website.",
          "This Privacy Policy is an electronic record and an electronic contract under the Information Technology Act, 2000, and the rules made under it. It does not require a physical, electronic or digital signature.",
          "This policy forms a legally binding agreement between you and Vallabhi Capital Private Limited. It becomes effective when you accept it directly or indirectly by using this website or its services.",
          "This document is published in accordance with applicable requirements relating to reasonable security practices and the collection, use, storage and transfer of sensitive personal data or information.",
          "Please read this policy carefully. By using the website, you confirm that you understand and consent to its terms. If you do not agree, please do not use the website.",
          "By providing information or using the facilities available through the website, you consent to our collection, storage, processing and transfer of personal and non-personal information as described below.",
        ],
      },
      {
        heading: "User Information",
        paragraphs: [
          "To use certain website services, you may be asked to provide information such as your name, email address, age, PIN code, occupation, interests and other details required for the relevant service. Where applicable, financial, identity and verification information may also be requested.",
          "The information provided helps us operate and improve our services, respond to enquiries, assess applications, maintain security and develop relevant services.",
          "Information that is freely available in the public domain or supplied under the Right to Information Act, 2005, or another applicable law will not be treated as sensitive solely because it is collected by us.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "We may use cookies and similar technologies to improve website responsiveness, understand visitor preferences and support website functionality. A cookie cannot read unrelated data from your device, and it contains only information supplied through your interaction with the website.",
          "Our service providers or advertisers may use their own cookies when you interact with their content. These technologies are outside our direct control.",
          "Our servers may collect limited technical information, including your IP address and connection details, to deliver requested pages, measure traffic and understand general visitor locations. This information is used for operational and analytical purposes.",
        ],
      },
      {
        heading: "Links to Other Websites",
        paragraphs: [
          "This policy describes the privacy practices of our website only. The website may link to third-party websites that operate independently and are outside our control. We are not responsible for the privacy practices or content of those websites.",
        ],
      },
      {
        heading: "Information Sharing",
        paragraphs: [
          "We do not share sensitive personal information with third parties without consent except in limited circumstances permitted by law, including the following:",
        ],
        items: [
          "When disclosure is required by law, a court, or a government agency for identity verification, prevention or investigation of unlawful activity, cyber incidents, or prosecution of offences.",
          "When information must be shared within our group companies, officers or employees to process information on our behalf. Such recipients are required to follow our instructions, maintain confidentiality and apply appropriate security measures.",
        ],
      },
      {
        heading: "Information Security",
        paragraphs: [
          "We use reasonable administrative, technical and physical safeguards to protect information against unauthorised access, alteration, disclosure or destruction. These measures may include internal reviews, access controls, encryption and physical security.",
          "Information collected through the website is stored in controlled systems with restricted, password-protected access. However, no internet transmission or security system can be guaranteed to be completely secure, and we cannot guarantee that information transmitted online will never be intercepted.",
          "The internet and our services evolve over time. We may update this policy when necessary. Any information we use will continue to be handled in accordance with the policy applicable when it was collected, subject to lawful changes.",
        ],
      },
      {
        heading: "Grievance Redressal",
        paragraphs: [
          "Complaints, abuse reports, concerns about website content or suspected breaches of these terms should be sent in writing to the designated grievance contact.",
        ],
        contact: true,
      },
    ],
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions",
    sections: [
      {
        paragraphs: [
          "The terms We, Us, Our and Company refer individually and collectively to Vallabhi Capital Private Limited. The terms Visitor and User refer to users of this website.",
          "These Terms and Conditions state the terms under which you may visit and use this website. If you do not accept these Terms and Conditions, please exit the website.",
          "The Company and its business divisions, subsidiaries, associate companies and investment companies reserve the right to revise these Terms and Conditions at any time by updating this page. Users should review this page periodically because the updated terms are binding on all users of the website.",
        ],
      },
      {
        heading: "Use of Content",
        paragraphs: [
          "All logos, brands, marks, headings, labels, names, signatures, numerals, shapes and combinations appearing on this website, except where otherwise noted, are owned or used under licence by the Company or its associate entities.",
          "Use of these properties or any other website content is strictly prohibited except as expressly permitted by these Terms and Conditions or the relevant website content.",
          "You may not sell, modify, reproduce, display, publicly perform, distribute or otherwise use website materials for a public or commercial purpose without the written permission of the relevant organisation or entity.",
        ],
      },
      {
        heading: "Acceptable Website Use",
        paragraphs: [
          "Visitors must use the website lawfully and responsibly and must not transmit, distribute, store or destroy material that violates applicable law or the rights of others.",
        ],
      },
      {
        heading: "Security Rules",
        paragraphs: [
          "Visitors are prohibited from violating or attempting to violate website security, including:",
        ],
        items: [
          "Accessing data not intended for the user or logging into a server or account that the user is not authorised to access.",
          "Probing, scanning or testing the vulnerability of a system or network, or breaching security or authentication measures without proper authorisation.",
          "Interfering with service to any user, host or network, including by submitting a virus or Trojan horse, overloading, flooding, mail bombing or crashing the website.",
          "Sending unsolicited electronic mail, including promotions or advertising for products or services.",
        ],
      },
      {
        heading: "General Rules",
        paragraphs: [
          "Visitors may not use the website to transmit, distribute, store or destroy material that could constitute or encourage criminal conduct, violate any applicable law or regulation, infringe copyright, trademark, trade secret or other intellectual property rights, violate privacy or publicity rights, or be libellous, defamatory, pornographic, profane, obscene, threatening, abusive or hateful.",
          "The Company and its associate entities may investigate suspected violations and may involve and cooperate with law enforcement authorities in prosecuting users involved in such violations.",
        ],
      },
      {
        heading: "Indemnity",
        paragraphs: [
          "The User agrees to indemnify and hold harmless the Company, its officers, directors, employees and agents from and against claims, actions, demands, liabilities, losses and damages arising from or resulting from the User's use of www.vallabhicapital.com or breach of these Terms and Conditions.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "The User agrees that the Company and its group companies, directors, officers and employees will not be liable for direct, indirect, incidental, special, consequential or exemplary damages resulting from use of or inability to use the service, procurement of substitute goods or services, data or information obtained through the service, transactions entered into through the service, or unauthorised access to or alteration of transmissions or data, even if advised of the possibility of such damages.",
          "The Company will not be liable for damages arising from interruption, suspension or termination of service, whether direct, indirect, incidental, special, consequential or exemplary, and whether such interruption, suspension or termination was justified, negligent, intentional, inadvertent or advertent.",
          "The Company is not responsible or liable for statements or conduct of third parties using the service. In no event will the Company's total liability to the User for all damages, losses or causes of action exceed the amount paid by the User to the Company, if any, related to the cause of action.",
        ],
      },
      {
        heading: "Disclaimer of Consequential Damages",
        paragraphs: [
          "The Company and parties, organisations or entities associated with its corporate brand will not be liable for damages, including incidental or consequential damages, lost profits, damage to computer hardware, loss of data or business interruption, resulting from use of or inability to use the website or its materials, whether based on warranty, contract, tort or another legal theory, and whether or not advised of the possibility of such damages.",
        ],
      },
    ],
  },
  "/refund-cancellation": {
    title: "Refund and Cancellation Policy",
    sections: [
      {
        paragraphs: [
          "Our focus is complete customer satisfaction. In the event that a customer has paid advance Equated Monthly Instalments (EMIs) and wants a refund, the Company may process the refund subject to the terms of the agreement under which the customer has made or is making the payment, and subject to the satisfaction of Vallabhi Capital Private Limited.",
        ],
      },
    ],
  },
};

export default function Policies() {
  const location = useLocation();
  const policy = policyContent[location.pathname] || policyContent["/policies/privacy-policy"];

  return <main className="policy-page">
    <div className="policy-inner">
      <Link className="policy-back" to="/">Back to website</Link>
      <h1>{policy.title}</h1>
      {policy.sections ? policy.sections.map((section, index) => <section className="policy-section" key={section.heading || index}>
        {section.heading && <h2>{section.heading}</h2>}
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
        {section.contact && <div className="policy-contact"><p><strong>Email:</strong> <a href="mailto:compliance@vallabhicapital.com">compliance@vallabhicapital.com</a></p><p><strong>Phone:</strong> +91-8448820331</p></div>}
      </section>) : policy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <nav className="policy-links" aria-label="Policy links">
        <Link to="/policies/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-and-conditions">Terms and Conditions</Link>
        <Link to="/refund-cancellation">Refund and Cancellation</Link>
      </nav>
    </div>
  </main>;
}
