import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MapPin, PhoneCall } from 'lucide-react';
import { BUSINESS, HOME, SERVICES, PROBLEMS, FAQS } from '../data.js';
import { useTitle, Reveal, CtaBand, SectionHeading } from '../components/ui.jsx';
import FaqList from '../components/FaqList.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

// Dark homepage slider. It changes slides every few seconds and does not move sideways on scroll.
function HeroSlider() {
  const slides = [HOME.hero, ...(HOME.extraSlides || [])];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => setIndex(v => (v + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const s = slides[index];
  const parts = s.highlight && s.headline.includes(s.highlight) ? s.headline.split(s.highlight) : [s.headline];

  return <section className="hero hero-dark" aria-label="Introduction">
    <div className="container hero-grid">
      <div className="hero-copy">
        <motion.div className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <i /> {s.eyebrow}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.6 }}>
            <h1>{parts[0]}{parts.length > 1 && <span className="hl">{s.highlight}</span>}{parts.length > 1 ? parts[1] : null}</h1>
            <p className="hero-sub">{s.sub}</p>
            <div className="hero-actions">
              <a className="button button-amber" href={BUSINESS.phoneHref}><PhoneCall size={17} /> {s.ctaPrimary || HOME.hero.ctaPrimary}</a>
              <Link className="button button-light" to="/services">{HOME.hero.ctaSecondary} <ArrowRight size={17} /></Link>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="slider-dots" role="group" aria-label="Choose a slide">
          {slides.map((_, n) => <button key={n} type="button" className={n === index ? 'active' : ''} aria-label={`Show slide ${n + 1}`} aria-pressed={n === index} onClick={() => setIndex(n)} />)}
        </div>
      </div>
      <div className="hero-visual">
        <AnimatePresence mode="wait">
          <motion.div key={index} className="hero-photo" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <img src={s.image} alt={s.alt || 'Residential lock and door hardware'} fetchPriority="high" />
          </motion.div>
        </AnimatePresence>
        <div className="hero-location"><MapPin size={15} /> {BUSINESS.serviceArea}</div>
      </div>
    </div>
  </section>;
}

export default function Home() {
  useTitle(`${BUSINESS.name} | Residential Locksmith in Bradford`, 'Residential locksmith in Bradford for home lockouts, lock changes, lost keys, uPVC and composite door locks and window lock repairs.');

  return <>
    <HeroSlider />

    <section className="plus-strip" aria-label="Why choose us">
      <div className="container plus-grid">
        {HOME.plusPoints.map((p, i) => <Reveal key={p.title} delay={i * 0.06}>
          <div className="plus-item"><CheckCircle2 size={22} /><div><strong>{p.title}</strong><span>{p.text}</span></div></div>
        </Reveal>)}
      </div>
    </section>

    {/* SERVICES: static cards that reveal as you scroll */}
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Residential services" title="Help with the locks that protect your home" align="left" />
        <div className="service-grid">{SERVICES.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}</div>
      </div>
    </section>

    {/* PROBLEMS: photo stays in place while the list scrolls past it */}
    <section className="section section-tint">
      <div className="container split">
        <div className="sticky-col">
          <Reveal className="split-photo">
            <img src="/uk_antisnap_cylinder.webp" alt="Anti-snap cylinder lock for a UK residential door" loading="lazy" width="580" height="600" />
          </Reveal>
        </div>
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
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <Reveal><span className="eyebrow">How it works</span></Reveal>
          <Reveal delay={0.08}><h2>{HOME.process.heading}</h2></Reveal>
        </div>
        <div className="process-grid">
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
    <section className="areas">
      <div className="container areas-inner">
        <div>
          <Reveal><span className="eyebrow">Local service area</span></Reveal>
          <Reveal delay={0.08}><h2>Residential locksmith help in Bradford</h2></Reveal>
        </div>
        <Reveal delay={0.14}>
          <p>Share your postcode and the type of property when you get in touch, so coverage can be checked before we arrange a visit.</p>
          <div className="areas-chips"><span>{BUSINESS.serviceArea}</span><span>Homes & flats</span></div>
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

    {/* FAQ */}
    <section className="section section-tint">
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
