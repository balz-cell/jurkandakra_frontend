export const ROLES = {
  USER: 'user',
  ANGGOTA_JURNALS: 'anggota_jurnals',
  KONTRIBUTOR: 'kontributor',
  ADMIN: 'admin',
} as const;

export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  user: 'User',
  anggota_jurnals: 'Anggota Jurnals',
  kontributor: 'Kontributor',
  admin: 'Admin',
};

export const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800',
};