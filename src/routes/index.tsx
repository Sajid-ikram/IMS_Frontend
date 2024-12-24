import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import SharePage from "../pages/SharePage";
import DiscoverPage from "../pages/DiscoverPage";
import RoleChangePage from "../pages/RoleChangePage";
import ManageCollaborationPage from "../pages/ManageCollaborationPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import IdeaPage from "../pages/IdeaPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="share" element={<SharePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="idea/:ideaId" element={<IdeaPage />} />
        <Route path="role-change" element={<RoleChangePage />} />
        <Route
          path="collaboration/:ideaId"
          element={<ManageCollaborationPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
