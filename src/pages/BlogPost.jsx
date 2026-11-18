import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BLOG } from '../data.js';
import { useTitle, Reveal, CtaBand } from '../components/ui.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG.find((p) => p.slug === slug);
  useTitle(post ? `${post.title} | Paramount Locksmiths` : 'Post not found | Paramount Locksmiths', post?.excerpt || '');

  if (!post) {
    return <section className="page-hero2"><div className="container">
      <h1 className="display2">Post not found</h1>
      <Link className="btn btn-dark" to="/blog" style={{ marginTop: 30 }}>Back to the blog</Link>
    </div></section>;
  }

  return <>
    <section className="page-hero2 section2 soft" style={{ paddingTop: 200, paddingBottom: 90 }}>
      <div className="container article2">
        <Reveal><Link className="text-link2" to="/blog"><ArrowLeft size={18} /> All posts</Link></Reveal>
        <Reveal delay={0.08}><span className="muted2" style={{ display: 'block', marginTop: 30 }}>{post.date}</span></Reveal>
        <Reveal delay={0.12}><h1 className="display2" style={{ marginTop: 14 }}>{post.title}</h1></Reveal>
        {post.image && <Reveal delay={0.16}><img src={post.image} alt="" style={{ width: '100%', borderRadius: 22, marginTop: 40 }} /></Reveal>}
        <div style={{ marginTop: 50 }}>
          {post.body.map((para, i) => <Reveal key={i}><p>{para}</p></Reveal>)}
        </div>
      </div>
    </section>
    <CtaBand />
  </>;
}
