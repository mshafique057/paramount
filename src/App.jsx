import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, FloatingBits } from './components/Layout.jsx';
import { ADMIN_PATH } from './config.js';
import AdminApp from './admin/AdminApp.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Areas from './pages/Areas.jsx';
import About from './pages/About.jsx';
import FAQ from './pages/FAQ.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { pathname } = useLocation();

  // The admin dashboard has its own layout and is not linked from the public site.
  if (pathname === ADMIN_PATH) return <AdminApp />;

  return <>
    <Header />
    <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/emergency-home-lockouts" element={<ServiceDetail fixedSlug="emergency-home-lockouts" />} />
        <Route path="/lock-changes-replacements" element={<ServiceDetail fixedSlug="lock-changes-replacements" />} />
        <Route path="/upvc-composite-door-lock-repairs" element={<ServiceDetail fixedSlug="upvc-composite-door-lock-repairs" />} />
        <Route path="/window-lock-repairs" element={<ServiceDetail fixedSlug="window-lock-repairs" />} />
        <Route path="/about" element={<About />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <FloatingBits />
  </>;
}
