import { Routes, Route } from 'react-router-dom';
import { ADMIN_PATH } from './config.js';
import PublicLayout from './components/PublicLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminApp from './admin/AdminApp.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
      </Route>
      <Route path={ADMIN_PATH} element={<AdminApp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
