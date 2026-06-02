import { useState } from 'react';
import { useUIStore } from '../../store/uiStore';

interface ShareButtonProps {
  title: string;
  slug: string;
}

const platforms = [
  { key: 'whatsapp', label: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-1.102-1.02-1.833-2.278-2.05-2.664-.215-.387-.023-.597.163-.79.168-.174.374-.454.56-.68.188-.227.25-.39.376-.65.124-.259.062-.484-.031-.678-.092-.194-.66-1.59-.904-2.177-.238-.578-.48-.477-.66-.486-.168-.009-.36-.01-.552-.01s-.507.078-.774.36c-.266.283-1.034 1.01-1.034 2.464 0 1.455 1.06 2.86 1.208 3.058.149.198 2.086 3.186 5.054 4.466.706.304 1.256.486 1.686.621.71.224 1.354.193 1.864.117.574-.085 1.765-.721 2.013-1.418.25-.697.25-1.294.176-1.42-.074-.126-.273-.2-.57-.35zM12 2C6.477 2 2 6.477 2 12c0 1.978.517 3.84 1.418 5.458L2 22l4.542-1.418A9.964 9.964 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z' },
  { key: 'twitter', label: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { key: 'facebook', label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
];

export default function ShareButton({ title, slug }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const addToast = useUIStore((state) => state.addToast);

  const url = `${window.location.origin}/berita/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    addToast('Link berhasil disalin!', 'success');
    setIsOpen(false);
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const links: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };
    window.open(links[platform], '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-surface-muted text-muted hover:text-primary hover:border-primary/30 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className="text-sm font-medium">Share</span>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-surface rounded-2xl shadow-hover border border-surface-muted p-1.5 z-20 min-w-[200px] animate-scale-in origin-top-right">
            {platforms.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => handleShare(key)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-surface-muted transition-colors text-sm"
              >
                <svg className="w-4 h-4 text-muted flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d={icon} />
                </svg>
                {label}
              </button>
            ))}
            <hr className="my-1 border-surface-muted" />
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-surface-muted transition-colors text-sm"
            >
              <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Copy Link
            </button>
          </div>
        </>
      )}
    </div>
  );
}