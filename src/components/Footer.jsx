import { Link } from 'react-router-dom';

export default function Footer({ business }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="display footer-name">{business.name}</p>
          <p className="muted">{business.tagline}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to={{ pathname: '/', hash: 'services' }}>Services</Link>
          <Link to="/blog">Blog</Link>
          <Link to={{ pathname: '/', hash: 'contact' }}>Contact</Link>
        </nav>
        <p className="muted small">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
