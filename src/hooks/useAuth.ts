import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === 'admin',
    isKontributor: user?.role === 'kontributor',
    isAnggotaJurnals: user?.role === 'anggota_jurnals',
    isUser: user?.role === 'user',
  };
};