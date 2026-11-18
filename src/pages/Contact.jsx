import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock3, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS, SERVICES } from '../data.js';
import { useTitle, PageIntro } from '../components/ui.jsx';

export default function Contact() {
  useTitle(`Contact | ${BUSINESS.name}`, `Contact ${BUSINESS.name} about residential lock, door and window problems in Bradford.`);
  const [status, setStatus] = useState(''); // '' | sent | error
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setStatus('');
    setBusy(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const endpoint = BUSINESS.formEndpoint || '/api/enquiry';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || 'Submission failed');
      setStatus('sent');
      setMessage('Thank you. Your enquiry has been received and we will be in touch.');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'We could not send your enquiry. Please try again later.');
    } finally {
      setBusy(false);
    }
  }

  return <>
    <PageIntro title="Contact" text="Tell us about the household lock, door or window problem you need help with in Bradford." />
    <section className="section">
      <div className="container contact-layout">
        <div className="contact-copy">
          <span className="eyebrow">Get in touch</span>
          <h2>Let's understand what has happened.</h2>
          <p>Share your postcode, the type of door or window and a brief description of the issue.</p>
          <div className="contact-detail"><Phone /><div><strong>Telephone</strong>{BUSINESS.phoneHref ? <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> : <span>{BUSINESS.phoneDisplay}</span>}</div></div>
          <div className="contact-detail"><Mail /><div><strong>Email</strong>{BUSINESS.emailHref ? <a href={BUSINESS.emailHref}>{BUSINESS.email}</a> : <span>{BUSINESS.email}</span>}</div></div>
          <div className="contact-detail"><MapPin /><div><strong>Address</strong><span>{BUSINESS.address}</span></div></div>
          <div className="contact-detail"><Clock3 /><div><strong>Opening hours</strong><span>{BUSINESS.hours}</span></div></div>
        </div>

        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={submit}>
            <h2>Describe your lock problem</h2>
            <p>Fields marked with * are required.</p>
            {/* Honeypot: hidden from people, left empty by real visitors */}
            <input type="text" name="website" tabIndex="-1" autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />
            <div className="form-two">
              <label>Your name *<input name="name" autoComplete="name" required minLength="2" maxLength="100" /></label>
              <label>Phone or email *<input name="contact" required minLength="5" maxLength="150" /></label>
            </div>
            <label>Bradford postcode<input name="postcode" autoComplete="postal-code" maxLength="12" placeholder="e.g. BD1 1AA" /></label>
            <label>Service needed
              <select name="service" defaultValue="">
                <option value="">Select a service</option>
                {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                <option value="Not sure">I am not sure</option>
              </select>
            </label>
            <label>Message *<textarea name="message" required minLength="10" maxLength="2000" rows="5" placeholder="Tell us what has happened and what type of door or window is involved." /></label>
            <button className="btn btn-dark submit-button" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send enquiry'} <Send size={17} /></button>
            {status === 'sent' && <p className="form-state form-success" role="status"><CheckCircle2 size={17} /> {message}</p>}
            {status === 'error' && <p className="form-state form-error" role="alert">{message}</p>}
            <small>Information you send is used to respond to your enquiry, in line with the <a href="/privacy-policy">privacy policy</a>.</small>
          </form>
        </div>
      </div>
    </section>
  </>;
}
