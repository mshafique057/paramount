import Reveal from './Reveal.jsx';

export default function Services({ data }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">What we do</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display section-title">{data.heading}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead">{data.intro}</p>
          </Reveal>
        </div>

        <div className="grid-services">
          {data.items.map((item, i) => (
            <Reveal key={`${item.title}-${i}`} delay={(i % 3) * 0.08}>
              <article className="card service">
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
