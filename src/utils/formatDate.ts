function parseDate(dateString: string): Date | null {
  if (!dateString) return null;

  // Backend format: "01 Jun 2026 15:05" (published_at) or "2026-06-01 15:03:49" (created_at)
  // Both are Asia/Jakarta (UTC+7) without timezone marker
  let iso: string;

  // "01 Jun 2026 15:05" → "2026-06-01T15:05:00+07:00"
  const dMy = dateString.match(/^(\d{2}) (\w{3}) (\d{4}) (\d{2}):(\d{2})/);
  if (dMy) {
    const months: Record<string, string> = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
      jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
    };
    iso = `${dMy[3]}-${months[dMy[2].toLowerCase()]}-${dMy[1]}T${dMy[4]}:${dMy[5]}:00+07:00`;
    return new Date(iso);
  }

  // "2026-06-01 15:03:49" → "2026-06-01T15:03:49+07:00"
  const ymd = dateString.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/);
  if (ymd) {
    return new Date(ymd[1] + 'T' + ymd[2] + '+07:00');
  }

  // Fallback: ISO format with timezone
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

export function formatDate(dateString: string): string {
  const date = parseDate(dateString);
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = parseDate(dateString);
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function timeAgo(dateString: string): string {
  const date = parseDate(dateString);
  if (!date) return '-';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return formatDateShort(dateString);
}