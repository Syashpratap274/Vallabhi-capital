import { useParams } from "react-router-dom";
import { useCms } from "../../cms";
import ProductDetailTemplate from "./ProductDetailTemplate";

const ALIASES = {
  msme: "msme-loan",
  "msme-loan": "msme-loan",
  "loan-against-property": "loan-against-property",
  lap: "loan-against-property",
  "machinery-and-equipment": "machinery-and-equipment",
  machinery: "machinery-and-equipment",
  "equipment-and-machinery-loan": "machinery-and-equipment",
  "green-finance": "green-finance",
  green: "green-finance",
  "mid-corporate": "mid-corporate",
  "mid-corporate-loan": "mid-corporate",
  "micro-enterprises": "micro-enterprises",
  "micro-enterprise": "micro-enterprises",
  "purchase-finance": "purchase-finance",
  "work-order-finance": "work-order-finance",
  "workorder-finance": "work-order-finance",
  "invoice-discounting": "invoice-discounting",
  "vendor-finance": "vendor-finance"
};

export default function DynamicProductPage() {
  const params = useParams();
  const slug = params.slug || params["*"]?.replace(/^supply-chain\//, "");
  const cms = useCms();
  const normalized = decodeURIComponent(String(slug || "")).replace(/^\/+|\/+$/g, "").toLowerCase();
  const product = (cms.products?.items || []).find((p) => String(p.slug || "").toLowerCase() === (ALIASES[normalized] || normalized) && p.published !== false);
  if (!product) return <main style={{padding:"160px 40px",fontFamily:"Poppins,sans-serif"}}><h1>Product not found</h1><p>The product may be unpublished or deleted.</p></main>;
  return <ProductDetailTemplate product={product} />;
}
