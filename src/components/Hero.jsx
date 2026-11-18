import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { telHref } from '../lib/useContent.js';

const clean = (w) => w.toLowerCase().replace(/[^a-z]/g, '');

export default function Hero({ hero, business }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const highlightWords = (hero.highlight || '').split(/\s+/).map(clean).filter(Boolean);
  const words = hero.headline.split(/\s+/);

  return (
    <section ref={ref} className="hero" id="top">
      <motion.div className="hero-bg" style={{ y: bgY }} aria-hidden="true">
        {hero.image ? <img src={hero.image} alt="" /> : <div className="hero-fallback" />}
      </motion.div>
      <div className="hero-veil" aria-hidden="true" />

      <motion.div className="container hero-inner" style={{ y: textY, opacity: fade }}>
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          {hero.eyebrow}
        </motion.span>

        <h1 className="display hero-title" aria-label={hero.headline}>
          {words.map((word, i) => {
            const isHl = highlightWords.includes(clean(word));
            return (
              <span className="word-mask" key={`${word}-${i}`} aria-hidden="true">
                <motion.span
                  className={`word ${isHl ? 'hl' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9 }}
        >
          <a className="btn btn-primary" href={telHref(business.phone)}>
            {hero.ctaPrimary}
          </a>
          <a className="btn btn-ghost" href="#services">
            {hero.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden="true"
      >
        <span />
        Scroll
      </motion.div>
    </section>
  );
}
