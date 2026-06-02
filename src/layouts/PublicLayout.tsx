import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import Toast from '../components/common/Toast';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface-secondary font-body text-text">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}