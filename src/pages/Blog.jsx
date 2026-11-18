import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG, BUSINESS } from '../data.js';
import { useTitle, Reveal } from '../components/ui.jsx';


export default function Blog() {
  useTitle(`Home security notes | ${BUSINESS.name}`, 'Practical notes on home locks, keys and door security from a residential locksmith in Bradford.');
  const posts = [...BLOG].sort((a, b) => (a.date < b.date ? 1 : -1));

  return <section className="page-hero2 section2 soft" style={{ paddingTop: 200 }}>
    <div className="container">
      <Reveal><span className="eyebrow2">Blog</span></Reveal>
      <Reveal delay={0.08}><h1 className="display2">Home security notes</h1></Reveal>
      <div className="post-grid" style={{ marginTop: 60 }}>
        {posts.map((post, i) => <Reveal key={post.slug} delay={i * 0.08}>
          <Link to={`/blog/${post.slug}`} className="post-card">
            <span className="muted2">{post.date}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="text-link2">Read more <ArrowRight size={16} /></span>
          </Link>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
