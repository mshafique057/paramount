import { Link, useOutletContext, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

export default function BlogPostPage() {
  const content = useOutletContext();
  const { slug } = useParams();
  const post = content.blog.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="page-hero">
        <div className="container article">
          <h1 className="display page-title">Post not found</h1>
          <Link className="btn btn-ghost" to="/blog">Back to the blog</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <article className="container article">
        <Reveal>
          <Link className="back" to="/blog">← All posts</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="muted small">{post.date}</span>
          <h1 className="display page-title">{post.title}</h1>
        </Reveal>
        {post.image && (
          <Reveal delay={0.15}>
            <img className="article-img" src={post.image} alt="" />
          </Reveal>
        )}
        <div className="article-body">
          {post.body.map((para, i) => (
            <Reveal key={i}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>
      </article>
    </section>
  );
}
