import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import HomePage from '../pages/public/HomePage';
import ContentDetailPage from '../pages/public/ContentDetailPage';
import CategoryPage from '../pages/public/CategoryPage';
import SearchPage from '../pages/public/SearchPage';
import TrendingPage from '../pages/public/TrendingPage';
import OrganizationPage from '../pages/public/OrganizationPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import ProfilePage from '../pages/public/ProfilePage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import ContributorDashboardPage from '../pages/admin/ContributorDashboardPage';
import ContentManagementPage from '../pages/admin/ContentManagementPage';
import ContentEditorPage from '../pages/admin/ContentEditorPage';
import UserManagementPage from '../pages/admin/UserManagementPage';
import CategoryManagementPage from '../pages/admin/CategoryManagementPage';
import GalleryPage from '../pages/admin/GalleryPage';
import CarouselPage from '../pages/admin/CarouselPage';
import ConfigurationPage from '../pages/admin/ConfigurationPage';
import DivisionManagementPage from '../pages/admin/DivisionManagementPage';
import AnggotaManagementPage from '../pages/admin/AnggotaManagementPage';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePage from '../pages/public/EditProfilePage';

function DashboardRedirect() {
  const { user } = useAuth();
  if (user?.role === 'admin') return <Navigate to="/dashboard/admin" replace />;
  return <Navigate to="/dashboard/kontributor" replace />;
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/berita/:slug', element: <ContentDetailPage /> },
      { path: '/kategori/:slug', element: <CategoryPage /> },
      { path: '/cari', element: <SearchPage /> },
      { path: '/trending', element: <TrendingPage /> },
      { path: '/tentang', element: <OrganizationPage /> },
      { path: '/profil/:username', element: <ProfilePage /> },
      { path: '/profil/edit', element: <ProtectedRoute><EditProfilePage /></ProtectedRoute> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['kontributor', 'admin']}><AdminLayout /></ProtectedRoute>,
    children: [
      { path: '/dashboard', element: <DashboardRedirect /> },
      { path: '/dashboard/kontributor', element: <ContributorDashboardPage /> },
      { path: '/dashboard/kontributor/konten', element: <ContentManagementPage /> },
      { path: '/dashboard/kontributor/konten/buat', element: <ContentEditorPage /> },
      { path: '/dashboard/kontributor/konten/:id/edit', element: <ContentEditorPage /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>,
    children: [
      { path: '/dashboard/admin', element: <AdminDashboardPage /> },
      { path: '/dashboard/admin/konten', element: <ContentManagementPage /> },
      { path: '/dashboard/admin/konten/buat', element: <ContentEditorPage /> },
      { path: '/dashboard/admin/konten/:id/edit', element: <ContentEditorPage /> },
      { path: '/dashboard/admin/user', element: <UserManagementPage /> },
      { path: '/dashboard/admin/kategori', element: <CategoryManagementPage /> },
      { path: '/dashboard/admin/galeri', element: <GalleryPage /> },
      { path: '/dashboard/admin/carousel', element: <CarouselPage /> },
      { path: '/dashboard/admin/konfigurasi', element: <ConfigurationPage /> },
      { path: '/dashboard/admin/divisi', element: <DivisionManagementPage /> },
      { path: '/dashboard/admin/anggota', element: <AnggotaManagementPage /> },
    ],
  },
]);