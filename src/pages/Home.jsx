import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, MapPin, PhoneCall } from 'lucide-react';
import { BUSINESS, HOME, SERVICES, PROBLEMS, FAQS, BLOG } from '../data.js';
import { useTitle, Reveal, CtaBand } from '../components/ui.jsx';
import FaqList from '../components/FaqList.jsx';

const clean = (w) => w.toLowerCase().replace(/[^a-z]/g, '');

export default function Home() {
  useTitle(`${BUSINESS.name} | Residential Locksmith in Bradford`, 'Residential locksmith in Bradford for home lockouts, lock changes, lost keys, uPVC and composite door locks and window lock repairs.');

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroProgress, [0, 1], ['0%', '28%']);
  const heroCopyY = useTransform(heroProgress, [0, 1], ['0%', '-22%']);
  const heroFade = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const processRef = useRef(null);
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ['start 65%', 'end 65%'] });

  const areaRef = useRef(null);
  const { scrollYProgress: areaProgress } = useScroll({ target: areaRef, offset: ['start end', 'end start'] });
  const areaX = useTransform(areaProgress, [0, 1], ['10%', '-18%']);

  const highlightWords = (HOME.hero.highlight || '').split(/\s+/).map(clean).filter(Boolean);
  const heroWords = HOME.hero.headline.split(/\s+/);
  const latest = [...BLOG].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  const bento = SERVICES.slice(0, 6);

  return <>
    {/* HERO */}
    <section className="hero2" ref={heroRef}>
      <motion.div className="hero2-media" style={{ y: heroImgY }} aria-hidden="true">
        <img src={HOME.hero.image} alt="" fetchPriority="high" />
      </motion.div>
      <div className="hero2-shade" aria-hidden="true" />
      <motion.div className="container hero2-inner" style={{ y: heroCopyY, opacity: heroFade }}>
        <motion.span className="hero2-kicker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <span /> {HOME.hero.eyebrow}
        </motion.span>
        <h1 className="hero2-title" aria-label={HOME.hero.headline}>
          {heroWords.map((word, i) => {
            const isHl = highlightWords.includes(clean(word));
            return <span className="hero2-mask" key={`${word}-${i}`} aria-hidden="true">
              <motion.span className={isHl ? 'hl' : ''} initial={{ y: '115%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
            </span>;
          })}
        </h1>
        <motion.p className="hero2-sub" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1 }}>{HOME.hero.sub}</motion.p>
        <motion.div className="hero2-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.15 }}>
          <a className="btn btn-amber" href={BUSINESS.phoneHref}><PhoneCall size={18} /> {HOME.hero.ctaPrimary}</a>
          <Link className="btn btn-line" to="/services">{HOME.hero.ctaSecondary} <ArrowRight size={18} /></Link>
        </motion.div>
        <motion.div className="hero2-chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}>
          <span><CheckCircle2 size={16} /> Residential homes only</span>
          <span><MapPin size={16} /> Bradford and nearby</span>
        </motion.div>
      </motion.div>
      <div className="hero2-scroll" aria-hidden="true"><span /> Scroll</div>
    </section>

    {/* TICKER */}
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...HOME.ticker, ...HOME.ticker].map((t, i) => <span key={i}>{t} <b>✦</b></span>)}
      </div>
    </div>

    {/* SERVICES BENTO */}
    <section className="section2">
      <div className="container">
        <div className="head2">
          <div>
            <Reveal><span className="eyebrow2">Residential services</span></Reveal>
            <Reveal delay={0.08}><h2 className="display2">Help with the locks that protect your home</h2></Reveal>
          </div>
          <Reveal delay={0.16}><p>From a lost key to a faulty multipoint mechanism, get clear guidance on the household lock problem you are facing.</p></Reveal>
        </div>

        <div className="bento">
          {bento.map((s, i) => <Reveal key={s.slug} delay={(i % 3) * 0.08} className={`bento-item bento-${i}`}>
            <Link to={s.path} className="bento-card">
              <img src={s.image} alt={s.alt} loading="lazy" width="960" height="640" />
              <div className="bento-shade" />
              <div className="bento-body">
                <span className="bento-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="bento-go">View service <ArrowUpRight size={18} /></span>
              </div>
            </Link>
          </Reveal>)}
        </div>
        <div className="center-link"><Link className="btn btn-dark" to="/services">All residential services <ArrowRight size={18} /></Link></div>
      </div>
    </section>

    {/* PROBLEMS */}
    <section className="section2 soft">
      <div className="container split2">
        <Reveal className="split2-media">
          <img src="/uk_multipoint_handle.webp" alt="Multipoint locking mechanism and handle used on a UK residential door" loading="lazy" width="580" height="600" />
        </Reveal>
        <div>
          <Reveal><span className="eyebrow2">Common household problems</span></Reveal>
          <Reveal delay={0.08}><h2 className="display2">When a door or window stops working as it should</h2></Reveal>
          <div className="problem2">
            {PROBLEMS.map((p, i) => <Reveal key={p.id} delay={i * 0.06}>
              <Link to={p.link} className="problem2-row">
                <span className="problem2-idx">{String(i + 1).padStart(2, '0')}</span>
                <span><strong>{p.title}</strong><small>{p.text}</small></span>
                <ArrowRight size={20} />
              </Link>
            </Reveal>)}
          </div>
        </div>
      </div>
    </section>

    {/* PROCESS (scroll-linked) */}
    <section className="section2 dark" ref={processRef}>
      <div className="container process2">
        <div className="process2-head">
          <Reveal><span className="eyebrow2 amber">How it works</span></Reveal>
          <Reveal delay={0.08}><h2 className="display2 light">{HOME.process.heading}</h2></Reveal>
        </div>
        <div className="process2-steps">
          <div className="process2-line" aria-hidden="true"><motion.div style={{ scaleY: processProgress }} /></div>
          {HOME.process.steps.map((step, i) => <Reveal key={i} delay={0.05}>
            <div className="process2-step">
              <span className="process2-num">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </Reveal>)}
        </div>
      </div>
    </section>

    {/* AREAS */}
    <section className="areas2" ref={areaRef}>
      <motion.div className="areas2-word" style={{ x: areaX }} aria-hidden="true">
        {BUSINESS.serviceArea.toUpperCase()} · {BUSINESS.serviceArea.toUpperCase()} · {BUSINESS.serviceArea.toUpperCase()} ·
      </motion.div>
      <div className="container areas2-inner">
        <Reveal><span className="eyebrow2 amber">Local service area</span></Reveal>
        <Reveal delay={0.08}><h2 className="display2 light">Residential locksmith help in Bradford</h2></Reveal>
        <Reveal delay={0.16}><p>Share your postcode and the type of property when you get in touch, so coverage can be checked.</p></Reveal>
        <Reveal delay={0.22}><Link className="btn btn-amber" to="/areas">About the service area <ArrowRight size={18} /></Link></Reveal>
      </div>
    </section>

    {/* ABOUT */}
    <section className="section2">
      <div className="container split2 about2">
        <div>
          <Reveal><span className="eyebrow2">About us</span></Reveal>
          <Reveal delay={0.08}><h2 className="display2">{HOME.about.heading}</h2></Reveal>
        </div>
        <div className="about2-body">
          {HOME.about.paragraphs.map((p, i) => <Reveal key={i} delay={i * 0.08}><p className="lead2">{p}</p></Reveal>)}
          <Reveal delay={0.16}><Link className="text-link2" to="/about">Read more about us <ArrowRight size={18} /></Link></Reveal>
        </div>
      </div>
    </section>

    {/* BLOG + FAQ */}
    {latest.length > 0 && <section className="section2 soft">
      <div className="container">
        <div className="head2">
          <div>
            <Reveal><span className="eyebrow2">From the blog</span></Reveal>
            <Reveal delay={0.08}><h2 className="display2">Home security notes</h2></Reveal>
          </div>
          <Reveal delay={0.16}><Link className="btn btn-dark" to="/blog">All posts <ArrowRight size={18} /></Link></Reveal>
        </div>
        <div className="post-grid">
          {latest.map((post, i) => <Reveal key={post.slug} delay={i * 0.08}>
            <Link to={`/blog/${post.slug}`} className="post-card">
              <span className="muted2">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="text-link2">Read more <ArrowRight size={16} /></span>
            </Link>
          </Reveal>)}
        </div>
      </div>
    </section>}

    <section className="section2">
      <div className="container split2 faq2">
        <div>
          <Reveal><span className="eyebrow2">Useful information</span></Reveal>
          <Reveal delay={0.08}><h2 className="display2">Questions about home locks?</h2></Reveal>
          <Reveal delay={0.16}><Link className="text-link2" to="/faqs">Read all FAQs <ArrowRight size={18} /></Link></Reveal>
        </div>
        <Reveal delay={0.1}><FaqList items={FAQS.slice(0, 5)} /></Reveal>
      </div>
    </section>

    <CtaBand title="Tell us what has happened with your home lock." text="For a household lock, door or window issue in Bradford, get in touch to discuss the next step." />
  </>;
}
