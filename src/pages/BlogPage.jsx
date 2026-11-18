import { Link, useOutletContext } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

export default function BlogPage() {
  const content = useOutletContext();
  const posts = [...content.blog].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="page-hero">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Blog</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display page-title">Home security notes</h1>
        </Reveal>

        <div className="grid-posts">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link className="card post" to={`/blog/${post.slug}`}>
                <span className="muted small">{post.date}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="read">Read more →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
