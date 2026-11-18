import Reveal from './Reveal.jsx';

export default function Areas({ data }) {
  return (
    <section id="areas" className="section areas">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Where we work</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display section-title">{data.heading}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead">{data.intro}</p>
          </Reveal>
        </div>

        <div className="towns">
          {data.towns.map((town, i) => (
            <Reveal key={`${town}-${i}`} delay={(i % 5) * 0.05} y={20}>
              <span className="town">{town}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
