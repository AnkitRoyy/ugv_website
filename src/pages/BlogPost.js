import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import "./BlogPost.css";
import blogIndex from "../utils/blogIndex";

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = blogIndex.find((b) => b.slug === slug);

  const [content, setContent] = useState("");
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    if (!blog) {
      setStatus("notfound");
      return;
    }

    fetch(blog.file)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then((text) => {
        if (
          !text ||
          text.trim().length === 0 ||
          text.includes("<!DOCTYPE html>")
        ) {
          throw new Error("Invalid markdown");
        }

        setContent(text);
        setStatus("ok");
      })
      .catch(() => {
        setStatus("notfound");
      });
  }, [blog]);

  if (status === "loading") {
    return (
      <section className="blog-post">
        <div className="blog-post-container">
          <p style={{ color: "#aaa" }}>Loading article…</p>
        </div>
      </section>
    );
  }

  if (status === "notfound") {
    return (
      <div className="blog-not-found">
        <h2>404 — Blog not found</h2>
        <p>The article does not exist or failed to load.</p>
        <button onClick={() => navigate("/blogs")}>
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
  <section className="blog-post scan-active">
    <div className="blog-bg">
      <div className="energy-field" />
      <div className="scanner-line" />
    </div>

    <div className="blog-post-container">
      <span className="blog-category">{blog.category}</span>

      <h1 className="blog-title">{blog.title}</h1>

      <div className="blog-meta">
        <span>{blog.author}</span>
        <span>•</span>
        <span>{blog.date}</span>
      </div>

      <article className="blog-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

      <button className="blog-back" onClick={() => navigate("/blogs")}>
        ← Back to Blogs
      </button>
    </div>
  </section>
);
}

export default BlogPost;