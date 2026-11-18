import { useEffect } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Services from '../components/Services.jsx';
import About from '../components/About.jsx';
import Process from '../components/Process.jsx';
import Areas from '../components/Areas.jsx';
import Contact from '../components/Contact.jsx';
import Reveal from '../components/Reveal.jsx';

export default function HomePage() {
  const content = useOutletContext();
  const { hash } = useLocation();

  // Nav links like /#services should scroll to the section once the page has rendered.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  const latest = [...content.blog].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <>
      <Hero hero={content.hero} business={content.business} />
      <Marquee items={content.marquee} />
      <Services data={content.services} />
      <About data={content.about} />
      <Process data={content.process} />
      <Areas data={content.areas} />

      {latest.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head row">
              <div>
                <Reveal>
                  <span className="eyebrow">From the blog</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="display section-title">Home security notes</h2>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <Link className="btn btn-ghost" to="/blog">
                  All posts
                </Link>
              </Reveal>
            </div>

            <div className="grid-posts">
              {latest.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <Link className="card post" to={`/blog/${post.slug}`}>
                    <span className="muted small">{post.date}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="read">Read more →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact business={content.business} />
    </>
  );
}
