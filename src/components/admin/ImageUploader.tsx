import { useState, useRef } from 'react';

interface ImageUploaderProps {
  currentImage?: string;
  onFileSelect: (file: File) => void;
  onRemove?: () => void;
  label?: string;
}

export default function ImageUploader({ currentImage, onFileSelect, onRemove, label = 'Upload Gambar' }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onRemove?.();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">{label}</label>
      <div className="border-2 border-dashed border-surface-muted rounded-2xl p-6 text-center hover:border-primary/30 transition-colors">
        {preview ? (
          <div className="space-y-3">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-xl object-cover" />
            <button onClick={handleRemove} className="text-sm text-accent hover:underline">Hapus gambar</button>
          </div>
        ) : (
          <div onClick={() => inputRef.current?.click()} className="cursor-pointer py-4">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-sm text-muted">Klik untuk upload</p>
            <p className="text-xs text-muted mt-1">JPG, PNG, WebP (Max 2MB)</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}