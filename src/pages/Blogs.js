import { useNavigate } from "react-router-dom";
import BLOGS from "../utils/blogIndex";
import "./Blogs.css";

function Blogs() {
  const navigate = useNavigate();

  return (
    <section className="blogs">
      <div className="blogs-container">
        <div className="blogs-header">
          <h1>Blogs</h1>
          <p>
            Insights, research and engineering stories from the UGV DTU team.
          </p>
        </div>

        <div className="blogs-grid">
          {BLOGS.map((blog) => (
            <article
              key={blog.slug}
              className="blog-card"
              onClick={() => navigate(`/blogs/${blog.slug}`)}
            >
              <span className="blog-card-category">
                {blog.category}
              </span>

              <h2 className="blog-card-title">
                {blog.title}
              </h2>

              <p className="blog-card-excerpt">
                {blog.description}
              </p>

              <div className="blog-card-meta">
                <span className="author">{blog.author}</span>
                <span className="dot">•</span>
                <span className="date">{blog.date}</span>
              </div>

              <span className="blog-card-read">
                Read article →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blogs;