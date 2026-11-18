import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Reveal from './Reveal.jsx';

// The vertical line fills in step with the visitor's scroll position.
export default function Process({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });

  return (
    <section id="process" className="section" ref={ref}>
      <div className="container split">
        <div>
          <Reveal>
            <span className="eyebrow">How it works</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display section-title">{data.heading}</h2>
          </Reveal>
        </div>

        <div className="steps">
          <div className="step-line" aria-hidden="true">
            <motion.div className="step-line-fill" style={{ scaleY: scrollYProgress }} />
          </div>
          {data.steps.map((step, i) => (
            <Reveal key={i} delay={0.05}>
              <div className="step">
                <span className="step-num">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
