import Reveal from './Reveal.jsx';

export default function About({ data }) {
  return (
    <section className="section about">
      <div className="container split">
        <div>
          <Reveal>
            <span className="eyebrow">{data.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display section-title">{data.heading}</h2>
          </Reveal>
        </div>

        <div className="about-body">
          {data.image && (
            <Reveal>
              <img className="about-img" src={data.image} alt="" />
            </Reveal>
          )}
          {data.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <p className="lead">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
