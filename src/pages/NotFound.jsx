import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <h1 className="display page-title">Page not found</h1>
        <Link className="btn btn-primary" to="/">Back to home</Link>
      </div>
    </section>
  );
}
