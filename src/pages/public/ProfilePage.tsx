import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userService } from '../../services/userService';
import { UserProfile } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { formatDate, timeAgo } from '../../utils/formatDate';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    userService.getProfile(username)
      .then(setProfile)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [username]);

  if (isLoading) return <div className="container-custom py-24"><LoadingSpinner size="lg" /></div>;
  if (!profile) return (
    <div className="container-custom py-24 text-center">
      <div className="max-w-sm mx-auto">
        <div className="w-20 h-20 bg-surface-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="font-display text-xl text-text mb-2">User tidak ditemukan</h2>
        <p className="text-muted text-sm">Mungkin akun ini sudah dihapus atau username salah.</p>
        <Link to="/" className="inline-block mt-4 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );

  const isOwnProfile = currentUser?.username === profile.username;
  const canCreateContent = profile.role === 'admin' || profile.role === 'kontributor';

  return (
    <div className="container-custom py-24">
      {/* Cover */}
      <div className="relative h-48 md:h-56 -mx-4 md:-mx-0 rounded-none md:rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary/40">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-secondary blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }} />
      </div>

      {/* Profile Card */}
      <div className="relative -mt-20 md:-mt-24 px-4 md:px-0">
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface rounded-3xl shadow-soft border border-surface-muted/50">
            {/* Header Section */}
            <div className="px-6 md:px-8 pt-0 pb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-surface overflow-hidden shadow-lg bg-surface">
                    <img
                      src={profile.avatar}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name & Role */}
                <div className="flex-1 min-w-0 pt-2 md:pt-16">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h1 className="font-display text-2xl md:text-3xl text-text truncate">{profile.full_name}</h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary text-xs font-semibold rounded-full w-fit whitespace-nowrap">
                      {profile.role_label}
                    </span>
                  </div>
                  <p className="text-muted text-sm mt-0.5">@{profile.username}</p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 pt-2 md:pt-16">
                  {isOwnProfile ? (
                    <Link
                      to="/profil/edit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all shadow-lg shadow-primary/20 active:scale-[0.97]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Edit Profil
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="px-6 md:px-8 pb-6">
              <div className={`grid gap-3 ${canCreateContent ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {canCreateContent && (
                  <div className="bg-gradient-to-br from-primary/5 to-primary/0 rounded-2xl p-4 md:p-5 text-center border border-primary/5">
                    <p className="font-display text-2xl md:text-3xl text-primary">{profile.stats.contents_count}</p>
                    <p className="text-xs text-muted font-medium mt-1">Konten</p>
                  </div>
                )}
                <div className="bg-gradient-to-br from-secondary/5 to-secondary/0 rounded-2xl p-4 md:p-5 text-center border border-secondary/5">
                  <p className="font-display text-2xl md:text-3xl text-secondary">{profile.stats.comments_count}</p>
                  <p className="text-xs text-muted font-medium mt-1">Komentar</p>
                </div>
                <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-2xl p-4 md:p-5 text-center border border-accent/5">
                  <p className="font-display text-2xl md:text-3xl text-accent">{profile.stats.likes_count}</p>
                  <p className="text-xs text-muted font-medium mt-1">Disukai</p>
                </div>
              </div>
            </div>

            {/* Info Details */}
            {(profile.anggota_jurnal || profile.joined_at) && (
              <div className="px-6 md:px-8 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.anggota_jurnal && (
                    <div className="bg-surface-muted/50 rounded-2xl p-4 border border-surface-muted">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text">Anggota Jurnalistik</p>
                          <p className="text-xs text-muted">Divisi {profile.anggota_jurnal.divisions?.map(d => d.name).join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">Posisi</span>
                        <span className="font-medium text-text">{profile.anggota_jurnal.position}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1.5">
                        <span className="text-muted">Bergabung</span>
                        <span className="font-medium text-text">{formatDate(profile.anggota_jurnal.joined_at)}</span>
                      </div>
                    </div>
                  )}

                  {profile.joined_at && (
                    <div className="bg-surface-muted/50 rounded-2xl p-4 border border-surface-muted">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center">
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text">Bergabung</p>
                          <p className="text-xs text-muted">Sejak {formatDate(profile.joined_at)}</p>
                        </div>
                      </div>
                      {profile.last_login_at && (
                        <div className="flex items-center justify-between text-sm mt-2">
                          <span className="text-muted">Terakhir login</span>
                          <span className="font-medium text-text">{timeAgo(profile.last_login_at)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Member badge */}
          <div className="flex justify-center -mt-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-muted/80 backdrop-blur-sm rounded-full text-xs text-muted border border-surface-muted shadow-soft">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Member sejak {formatDate(profile.created_at || profile.joined_at) || '-'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
