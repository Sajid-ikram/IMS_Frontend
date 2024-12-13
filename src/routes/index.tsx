import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import SharePage from '../pages/SharePage';
import DiscoverPage from '../pages/DiscoverPage';
import RoleChangePage from '../pages/RoleChangePage';
import AcceptCollaborationPage from '../pages/AcceptCollaborationPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="share" element={<SharePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="role-change" element={<RoleChangePage />} />
        <Route path="accept-collaboration" element={<AcceptCollaborationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}