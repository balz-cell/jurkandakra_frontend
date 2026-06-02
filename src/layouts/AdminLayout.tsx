import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import Toast from '../components/common/Toast';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-surface-secondary flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
}