import { useCms, sortItems } from "../cms";
import "./Blogs.css";

export default function Blogs() {
  const cms = useCms();
  const blogs = sortItems(cms.blogs || cms.homepage?.blogs || []).filter(
    (b) => b.published !== false,
  );
  return <main className="blogs-page"><section className="blogs-hero"><h1>Our Blogs</h1><p>Insights, updates and useful information for growing businesses.</p></section><section className="blogs-list">{blogs.length ? blogs.map(blog => <a className="blog-list-card" href={`/blogs/${blog.slug}`} key={blog.id}><div className="blog-list-image">{blog.image && <img src={blog.image} alt="" />}</div><div className="blog-list-copy"><span>{blog.author && `By ${blog.author}`}{blog.author && blog.publishedAt && " · "}{blog.publishedAt}</span><h2>{blog.title}</h2><p>Read more about this article and explore the full insight.</p><b>Read Article →</b></div></a>) : <div className="blogs-empty">No published blogs yet.</div>}</section></main>;
}
