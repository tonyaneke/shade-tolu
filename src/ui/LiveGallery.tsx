"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, X } from "lucide-react";

type UploadedItem = {
  id: string;
  url: string;
  width?: number;
  height?: number;
  createdAt?: string;
};

interface LiveGalleryProps {
  className?: string;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

export default function LiveGallery({ className = "" }: LiveGalleryProps) {
  const [items, setItems] = useState<UploadedItems>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("live-uploads");
      return raw ? (JSON.parse(raw) as UploadedItems) : [];
    } catch {
      return [];
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<UploadedItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  type UploadedItems = UploadedItem[];

  const canUpload = useMemo(
    () => Boolean(CLOUD_NAME && UPLOAD_PRESET),
    []
  );

  const optimized = (secureUrl: string) => {
    // Insert Cloudinary transformation to auto format/quality and width bound
    try {
      // e.g. https://res.cloudinary.com/<cloud>/image/upload/v169999/foo.jpg
      const marker = "/upload/";
      if (!secureUrl.includes("res.cloudinary.com")) return secureUrl;
      const [left, right] = secureUrl.split(marker);
      const trans = `f_auto,q_auto:good,c_limit,w_1200`;
      return `${left}${marker}${trans}/${right}`;
    } catch {
      return secureUrl;
    }
  };

  const persist = (next: UploadedItems) => {
    setItems(next);
    try {
      window.localStorage.setItem("live-uploads", JSON.stringify(next));
      // Dispatch custom event to notify gallery of new uploads
      window.dispatchEvent(new Event("live-uploads-updated"));
    } catch {
      // ignore
    }
  };

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      if (!canUpload || !CLOUD_NAME || !UPLOAD_PRESET) return;
      const list = Array.from(files).filter((f) => /^image\//.test(f.type));
      if (list.length === 0) return;
      setUploading(true);

      const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      for (const file of list) {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", UPLOAD_PRESET);
        if (FOLDER) {
          form.append("folder", FOLDER);
        }
        try {
          const res = await fetch(endpoint, { method: "POST", body: form });
          if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
          const data = (await res.json()) as any;
          const url = optimized(data.secure_url || data.url);
          const next = [
            { id: data.asset_id || data.public_id, url, width: data.width, height: data.height, createdAt: data.created_at },
            ...items,
          ];
          persist(next);
        } catch (e) {
          console.error(e);
        }
      }

      setUploading(false);
    },
    [items, canUpload, CLOUD_NAME, UPLOAD_PRESET]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className={`relative py-24 px-6 overflow-hidden ${className}`}>
      {/* Dynamic ambient background (no cards, just vibes) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 0.9, 1.1], rotate: [360, 0, 360], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          className="absolute -bottom-24 -right-24 w-[900px] h-[900px] rounded-full bg-gradient-to-tl from-amber-200 via-yellow-200 to-amber-50 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Live Photos
          </motion.h1>
          <p className="mt-3 text-amber-800/80 text-xl md:text-2xl" style={{ fontFamily: "var(--font-tangerine)" }}>
            Share your moments from the day — photos only for now
          </p>
        </div>

        {/* Upload zone (outline, no shadows) */}
        <div className="flex justify-center mb-10">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`w-full max-w-4xl border-2 ${isDragging ? "border-amber-500" : "border-amber-300"} border-dashed rounded-2xl p-8 md:p-12 bg-white/40 backdrop-blur-sm transition-colors`}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className={`w-14 h-14 rounded-full border-2 ${isDragging ? "border-amber-500" : "border-amber-300"} flex items-center justify-center`}>
                <UploadCloud className={`w-7 h-7 ${isDragging ? "text-amber-600" : "text-amber-700"}`} />
              </div>
              <p className="text-gray-800 text-center">
                Drag & drop your photos here, or
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="ml-2 underline text-amber-700 hover:text-amber-800"
                >
                  browse
                </button>
              </p>
              {!canUpload ? (
                <p className="text-sm text-red-700">
                  Missing Cloudinary env: set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_UPLOAD_PRESET
                </p>
              ) : (
                <p className="text-xs text-gray-600">JPG/PNG/WebP up to your preset limit. Uploaded to folder {FOLDER || 'wedding-uploads'}.</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
            </div>
          </div>
        </div>

        {/* Live stream grid (no cards, thin outlines) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {items.map((it) => (
            <motion.button
              key={it.id}
              onClick={() => setPreview(it)}
              whileHover={{ scale: 1.02 }}
              className="relative w-full aspect-[3/4] rounded-xl border border-amber-300/60 overflow-hidden bg-white/40 backdrop-blur-[1px]"
            >
              <Image
                src={it.url}
                alt={it.id}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </motion.button>
          ))}
        </div>

        {uploading && (
          <div className="mt-6 text-center text-amber-700 text-sm">Uploading…</div>
        )}
      </div>

      {/* Preview (no heavy UI) */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setPreview(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            {preview && (
              <div className="relative w-full h-full max-w-5xl p-6 flex items-center justify-center">
                <Image
                  src={preview.url}
                  alt={preview.id}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


