import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { telHref } from '../lib/useContent.js';

export default function Nav({ business }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo-chip" aria-label={`${business.name} home`}>
          <img src="/logo.png" alt={business.name} />
        </Link>

        <nav className="nav-links" aria-label="Main">
          <Link to={{ pathname: '/', hash: 'services' }}>Services</Link>
          <Link to={{ pathname: '/', hash: 'process' }}>Process</Link>
          <Link to={{ pathname: '/', hash: 'areas' }}>Areas</Link>
          <Link to="/blog">Blog</Link>
          <Link to={{ pathname: '/', hash: 'contact' }}>Contact</Link>
        </nav>

        <a className="btn btn-primary nav-cta" href={telHref(business.phone)}>
          Call {business.phone}
        </a>
      </div>
    </header>
  );
}
