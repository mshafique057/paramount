import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, KeyRound, MapPin, PhoneCall } from 'lucide-react';
import { BUSINESS, HOME, SERVICES, PROBLEMS, FAQS, BLOG } from '../data.js';
import { useTitle, Reveal, CtaBand } from '../components/ui.jsx';
import FaqList from '../components/FaqList.jsx';

const clean = (w) => w.toLowerCase().replace(/[^a-z]/g, '');

export default function Home() {
  useTitle(`${BUSINESS.name} | Residential Locksmith in Bradford`, 'Residential locksmith in Bradford for home lockouts, lock changes, lost keys, uPVC and composite door locks and window lock repairs.');

  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(heroP, [0, 1], ['0%', '18%']);
  const badgeRotate = useTransform(heroP, [0, 1], [0, 140]);
  const heroFade = useTransform(heroP, [0, 0.8], [1, 0.2]);

  const processRef = useRef(null);
  const { scrollYProgress: processP } = useScroll({ target: processRef, offset: ['start 75%', 'end 65%'] });

  const areaRef = useRef(null);
  const { scrollYProgress: areaP } = useScroll({ target: areaRef, offset: ['start end', 'end start'] });
  const areaX = useTransform(areaP, [0, 1], ['6%', '-22%']);

  const highlightWords = (HOME.hero.highlight || '').split(/\s+/).map(clean).filter(Boolean);
  const heroWords = HOME.hero.headline.split(/\s+/);
  const latest = [...BLOG].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return <>
    {/* HERO */}
    <section className="hero" ref={heroRef}>
      <div className="container">
      <motion.div className="hero-grid" style={{ opacity: heroFade }}>
        <div>
          <motion.div className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <i /> {HOME.hero.eyebrow}
          </motion.div>
          <h1 aria-label={HOME.hero.headline}>
            {heroWords.map((word, i) => {
              const isHl = highlightWords.includes(clean(word));
              return <span className="hero-mask" key={`${word}-${i}`} aria-hidden="true">
                <motion.span className={isHl ? 'hl' : ''} initial={{ y: '112%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
              </span>;
            })}
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}>{HOME.hero.sub}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05 }}>
            <a className="button button-amber" href={BUSINESS.phoneHref}><PhoneCall size={17} /> {HOME.hero.ctaPrimary}</a>
            <Link className="button button-light" to="/services">{HOME.hero.ctaSecondary} <ArrowRight size={17} /></Link>
          </motion.div>
          <motion.div className="hero-chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }}>
            <span><CheckCircle2 size={15} /> Residential homes only</span>
            <span><MapPin size={15} /> {BUSINESS.serviceArea} and nearby</span>
          </motion.div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo">
            <motion.img src={HOME.hero.image} alt="Modern UK composite residential front door" style={{ y: photoY }} fetchPriority="high" />
          </div>
          <motion.div className="key-badge" style={{ rotate: badgeRotate }} aria-hidden="true">
            <svg className="ring" viewBox="0 0 190 190">
              <defs><path id="ringPath" d="M95,95 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
              <text><textPath href="#ringPath">24/7 · Residential locks · Bradford ·</textPath></text>
            </svg>
            <div className="core"><KeyRound size={34} strokeWidth={2} /></div>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </section>

    {/* TICKER */}
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...HOME.ticker, ...HOME.ticker].map((t, i) => <span key={i}>{t} <b>✦</b></span>)}
      </div>
    </div>

    {/* SERVICES: pinned horizontal track */}
    <ServicesTrack />

    {/* PROBLEMS */}
    <section className="section">
      <div className="container split">
        <Reveal className="split-photo">
          <img src="/uk_multipoint_handle.webp" alt="Multipoint locking mechanism and handle used on a UK residential door" loading="lazy" width="580" height="600" />
          <div className="tag"><span>Door hardware</span><strong>uPVC & composite locks</strong></div>
        </Reveal>
        <div className="split-copy">
          <Reveal><span className="eyebrow">Common household problems</span></Reveal>
          <Reveal delay={0.08}><h2>When a door or window stops working as it should</h2></Reveal>
          <div className="problem-list">
            {PROBLEMS.map((p, i) => <Reveal key={p.id} delay={i * 0.06}>
              <Link to={p.link}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span><strong>{p.title}</strong><small>{p.text}</small></span>
                <ArrowRight size={20} />
              </Link>
            </Reveal>)}
          </div>
        </div>
      </div>
    </section>

    {/* PROCESS */}
    <section className="section process" ref={processRef}>
      <div className="container">
        <div className="section-heading">
          <Reveal><span className="eyebrow">How it works</span></Reveal>
          <Reveal delay={0.08}><h2>{HOME.process.heading}</h2></Reveal>
        </div>
        <div className="process-grid">
          <motion.div aria-hidden="true" style={{ position: 'absolute', top: -2, left: 0, height: 2, width: '100%', background: 'var(--gold)', transformOrigin: 'left', scaleX: processP }} />
          {HOME.process.steps.map((step, i) => <Reveal key={i} delay={i * 0.06}>
            <div className="process-step">
              <span className="num">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </Reveal>)}
        </div>
      </div>
    </section>

    {/* AREAS */}
    <section className="areas" ref={areaRef}>
      <motion.div className="areas-word" style={{ x: areaX }} aria-hidden="true">
        {BUSINESS.serviceArea} {BUSINESS.serviceArea} {BUSINESS.serviceArea}
      </motion.div>
      <div className="container areas-inner">
        <div>
          <Reveal><span className="eyebrow">Local service area</span></Reveal>
          <Reveal delay={0.08}><h2>Residential locksmith help in Bradford</h2></Reveal>
        </div>
        <Reveal delay={0.14}>
          <p>Share your postcode and the type of property when you get in touch, so coverage can be checked before we arrange a visit.</p>
          <div className="areas-chips"><span>{BUSINESS.serviceArea}</span><span>West Yorkshire</span><span>Homes & flats</span></div>
          <div style={{ marginTop: 34 }}><Link className="button button-amber" to="/areas">About the service area <ArrowRight size={17} /></Link></div>
        </Reveal>
      </div>
    </section>

    {/* ABOUT */}
    <section className="section">
      <div className="container about">
        <div>
          <Reveal><span className="eyebrow">About us</span></Reveal>
          <Reveal delay={0.08}><h2>{HOME.about.heading}</h2></Reveal>
        </div>
        <div className="about-body">
          {HOME.about.paragraphs.map((p, i) => <Reveal key={i} delay={i * 0.08}><p>{p}</p></Reveal>)}
          <Reveal delay={0.16}><Link className="text-link" to="/about">Read more about us <ArrowRight size={16} /></Link></Reveal>
        </div>
      </div>
    </section>

    {/* BLOG */}
    {latest.length > 0 && <section className="section process">
      <div className="container">
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 30, flexWrap: 'wrap', maxWidth: 'none' }}>
          <div>
            <Reveal><span className="eyebrow">From the blog</span></Reveal>
            <Reveal delay={0.08}><h2>Home security notes</h2></Reveal>
          </div>
          <Reveal delay={0.16}><Link className="button button-amber" to="/blog">All posts <ArrowUpRight size={17} /></Link></Reveal>
        </div>
        <div className="post-grid">
          {latest.map((post, i) => <Reveal key={post.slug} delay={i * 0.08}>
            <Link to={`/blog/${post.slug}`} className="post-card">
              <span className="date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="text-link">Read more <ArrowRight size={15} /></span>
            </Link>
          </Reveal>)}
        </div>
      </div>
    </section>}

    {/* FAQ */}
    <section className="section">
      <div className="container faq-split">
        <div>
          <Reveal><span className="eyebrow">Useful information</span></Reveal>
          <Reveal delay={0.08}><h2>Questions about home locks?</h2></Reveal>
          <Reveal delay={0.16}><p>Straightforward answers about lockouts, replacement locks and common household door problems.</p></Reveal>
          <Reveal delay={0.22}><Link className="text-link" to="/faqs">Read all FAQs <ArrowRight size={16} /></Link></Reveal>
        </div>
        <Reveal delay={0.1}><FaqList items={FAQS.slice(0, 5)} /></Reveal>
      </div>
    </section>

    <CtaBand title="Tell us what has happened with your home lock." text="For a household lock, door or window issue in Bradford, get in touch to discuss the next step." />
  </>;
}

// Services shown as a track that moves sideways as the visitor scrolls down.
// On small screens it becomes a simple swipeable row.
function ServicesTrack() {
  const wrap = useRef(null);
  const track = useRef(null);
  const [distance, setDistance] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const measure = () => {
      setMobile(window.innerWidth < 760);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cards = SERVICES.map((s, i) => <article className="pin-card" key={s.slug}>
    <div className="pin-card-img">
      <img src={s.image} alt={s.alt} loading="lazy" width="720" height="480" />
      <span className="no">{String(i + 1).padStart(2, '0')}</span>
    </div>
    <h3>{s.title}</h3>
    <p>{s.short}</p>
    <Link to={s.path}>View service <ArrowRight size={15} /></Link>
  </article>);

  const heading = <div className="pin-head container">
    <Reveal><span className="eyebrow">Residential services</span></Reveal>
    <Reveal delay={0.08}><h2>Help with the locks that protect your home</h2></Reveal>
  </div>;

  if (mobile) {
    return <section className="pin-static">
      <div className="container" style={{ marginBottom: 40 }}>
        <span className="eyebrow" style={{ color: 'var(--paper)' }}>Residential services</span>
        <h2 style={{ color: 'var(--paper)', textTransform: 'uppercase', fontSize: 'clamp(36px,8vw,60px)' }}>Help with the locks that protect your home</h2>
      </div>
      <div className="scroll-row">{cards}</div>
    </section>;
  }

  return <section className="pin" ref={wrap} style={{ height: '320vh' }}>
    <div className="pin-stick">
      {heading}
      <motion.div className="pin-track" ref={track} style={{ x }}>{cards}</motion.div>
      <div className="pin-progress"><motion.div style={{ scaleX: progress }} /></div>
    </div>
  </section>;
}
