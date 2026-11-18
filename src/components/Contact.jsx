import Reveal from './Reveal.jsx';
import { telHref } from '../lib/useContent.js';

export default function Contact({ business }) {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Get in touch</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display section-title huge">
            Call us or <span className="hl">send an email</span>
          </h2>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <div className="contact-list">
              <a className="contact-item" href={telHref(business.phone)}>
                <span className="label">Phone</span>
                <span className="value">{business.phone}</span>
              </a>
              <a className="contact-item" href={`mailto:${business.email}`}>
                <span className="label">Email</span>
                <span className="value">{business.email}</span>
              </a>
              <div className="contact-item">
                <span className="label">Address</span>
                <span className="value">{business.address}</span>
              </div>
              <div className="contact-item">
                <span className="label">Opening hours</span>
                <span className="value">{business.hours}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="map">
              <iframe
                title={`Map showing ${business.name} service area`}
                src={business.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
