import { useParams } from "react-router-dom";
import { useCms } from "../cms";
import "./Blogs.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const cms = useCms();
  const normalizedSlug = decodeURIComponent(String(slug || ""))
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
  const slugify = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const blog = (cms.blogs || []).find(
    (b) =>
      (String(b.slug || "").toLowerCase() === normalizedSlug ||
        slugify(b.title) === normalizedSlug) &&
      b.published !== false,
  );
  if (!blog)
    return (
      <main className="blog-detail-page">
        <div className="blogs-empty">
          <h1>Blog not found</h1>
          <a href="/blogs">Back to Blogs</a>
        </div>
      </main>
    );
  return (
    <main className="blog-detail-page">
      <article className="blog-article">
        <a className="blog-back" href="/blogs">
          ← All Blogs
        </a>
        <span className="blog-category">
          {blog.category || "Business & Finance"}
        </span>
        <h1>{blog.title}</h1>
        <div className="blog-meta">
          {blog.author ? `By ${blog.author}` : "Vallabhi Capital"}
          {blog.publishedAt ? ` · ${blog.publishedAt}` : ""}
        </div>
        {blog.image && (
          <img className="blog-detail-image" src={blog.image} alt="" />
        )}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </article>
    </main>
  );
}
