import { Outlet } from 'react-router-dom';
import { useContent } from '../lib/useContent.js';
import ScrollProgress from './ScrollProgress.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

// Wraps every public page. Content is passed to pages through Outlet context.
export default function PublicLayout() {
  const { content } = useContent();

  return (
    <>
      <ScrollProgress />
      <Nav business={content.business} />
      <main>
        <Outlet context={content} />
      </main>
      <Footer business={content.business} />
    </>
  );
}
