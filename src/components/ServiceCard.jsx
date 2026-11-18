import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Icon, Reveal } from './ui.jsx';
import { BUSINESS } from '../data.js';

export default function ServiceCard({ s, i = 0, index }) {
  const n = String(index ?? i + 1).padStart(2, '0');
  return (
    <Reveal delay={(i % 4) * 0.07} style={{ height: '100%' }}>
      <article className="svc-card">
        <Link to={`/services/${s.slug}`} className="svc-card-media" aria-label={s.title}>
          <img src={s.image} alt={s.title} loading="lazy" />
        </Link>
        <div className="svc-card-body">
          <div className="svc-card-top">
            <span className="svc-card-ic"><Icon name={s.icon} size={22} /></span>
            <span className="svc-card-num">{n}</span>
          </div>
          <h3><Link to={`/services/${s.slug}`}>{s.title}</Link></h3>
          <p>{s.short}</p>
          <div className="svc-card-foot">
            <Link to={`/services/${s.slug}`} className="svc-card-link">Learn more <ArrowRight size={16} /></Link>
            <a className="svc-card-call" href={BUSINESS.phoneHref} aria-label={`Call about ${s.title}`}><Phone size={16} /></a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
