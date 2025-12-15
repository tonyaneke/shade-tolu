"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { fetchCloudinaryImages, uploadToCloudinary, type CloudinaryImage } from "@/lib/api";

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
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

type UploadError = {
  id: string;
  fileName: string;
  message: string;
  timestamp: number;
};

type UploadStatus = {
  fileName: string;
  status: "uploading" | "success" | "error";
  error?: string;
};

export default function LiveGallery({ className = "" }: LiveGalleryProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<UploadedItem | null>(null);
  const [errors, setErrors] = useState<UploadError[]>([]);
  const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
  const [fallbackItems, setFallbackItems] = useState<UploadedItems>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

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

  // Track failed image URLs to filter them out
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  // Fetch images using TanStack Query
  const { data: imagesData, isLoading: loading, isError } = useQuery({
    queryKey: ["cloudinary-images"],
    queryFn: fetchCloudinaryImages,
    refetchInterval: 30000, // Refetch every 30 seconds
    select: (data) => {
        if (data.success && data.images) {
        // Filter out images that have failed to load
        return data.images
          .filter((img: CloudinaryImage) => !failedImageIds.has(img.id))
          .map((img: CloudinaryImage) => ({
            id: img.id,
            url: optimized(img.url),
            width: img.width,
            height: img.height,
            createdAt: img.createdAt,
          })) as UploadedItems;
      }
      return [];
    },
  });

  // Handle successful data fetch - sync to localStorage
  useEffect(() => {
    if (imagesData && imagesData.length > 0) {
          try {
        window.localStorage.setItem("live-uploads", JSON.stringify(imagesData));
        window.dispatchEvent(new Event("live-uploads-updated"));
          } catch {
            // ignore
          }
        }
  }, [imagesData]);

  // Handle localStorage fallback on error
  useEffect(() => {
    if (isError && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem("live-uploads");
        if (raw) {
          const localItems = JSON.parse(raw) as UploadedItems;
          setFallbackItems(localItems);
        }
      } catch {
        // ignore
      }
    }
  }, [isError]);

  const items = imagesData || fallbackItems;

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("Cloudinary is not configured");
      }
      return uploadToCloudinary({
        file,
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        folder: FOLDER,
      });
    },
    onSuccess: () => {
      // Refetch images after successful upload
      queryClient.invalidateQueries({ queryKey: ["cloudinary-images"] });
    },
  });

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!/^image\//.test(file.type)) {
      return `${file.name} is not a valid image file`;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return `${file.name} is too large (${sizeMB} MB). Maximum size is 10 MB`;
    }

    return null;
  };

  const addError = useCallback((fileName: string, message: string) => {
    const error: UploadError = {
      id: `${fileName}-${Date.now()}`,
      fileName,
      message,
      timestamp: Date.now(),
    };
    setErrors((prev) => [error, ...prev]);
    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      setErrors((prev) => prev.filter((e) => e.id !== error.id));
    }, 8000);
  }, []);

  const dismissError = useCallback((id: string) => {
    setErrors((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      if (!canUpload || !CLOUD_NAME || !UPLOAD_PRESET) {
        addError("Configuration", "Cloudinary is not configured. Please check your settings.");
        return;
      }

      const fileArray = Array.from(files);
      if (fileArray.length === 0) return;

      // Validate all files first
      const validFiles: File[] = [];
      const validationErrors: string[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          validationErrors.push(error);
          addError(file.name, error);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length === 0) {
        return; // All files failed validation
      }

      setUploadStatuses(
        validFiles.map((f) => ({ fileName: f.name, status: "uploading" as const }))
      );

      // Upload all files
      const uploadPromises = validFiles.map(async (file) => {
        try {
          const data = await uploadMutation.mutateAsync(file);

          const url = optimized(data.secure_url || data.url);
          const uploadedItem: UploadedItem = {
            id: data.asset_id || data.public_id || `${file.name}-${Date.now()}`,
            url,
            width: data.width,
            height: data.height,
            createdAt: data.created_at || new Date().toISOString(),
          };
          
          // Update status to success
          setUploadStatuses((prev) =>
            prev.map((s) =>
              s.fileName === file.name
                ? { ...s, status: "success" as const }
                : s
            )
          );

          return uploadedItem;
        } catch (error: any) {
          const errorMessage =
            error.message || "An unexpected error occurred during upload";
          
          addError(file.name, errorMessage);
          
          // Update status to error
          setUploadStatuses((prev) =>
            prev.map((s) =>
              s.fileName === file.name
                ? { ...s, status: "error" as const, error: errorMessage }
                : s
            )
          );
          return null;
        }
      });

      await Promise.all(uploadPromises);

      // Clear statuses after a delay
      setTimeout(() => {
        setUploadStatuses([]);
      }, 2000);
    },
    [canUpload, addError, uploadMutation]
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
          <p className="mt-3 text-amber-800/80 text-xl md:text-2xl">
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
                <p className="text-xs text-gray-600">
                  JPG/PNG/WebP up to 10 MB per file. Uploaded to folder {FOLDER || 'wedding-uploads'}.
                </p>
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full"
            />
            <span className="ml-3 text-amber-700">Loading photos...</span>
          </div>
        ) : (
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
                onError={() => {
                  // Track failed images to filter them out
                  setFailedImageIds((prev) => new Set(prev).add(it.id));
                }}
                unoptimized={it.url.startsWith("http://") || it.url.startsWith("https://")}
              />
            </motion.button>
          ))}
          </div>
        )}

        {/* Upload Status */}
        <AnimatePresence>
          {uploadMutation.isPending && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 flex flex-col items-center justify-center gap-3"
            >
              {/* Animated upload icon */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6 text-amber-600" />
                </div>
                {/* Pulsing ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-amber-400"
                />
              </motion.div>
              
              {/* Upload text with dots animation */}
              <div className="flex items-center gap-1 text-amber-700">
                <span className="text-sm font-medium">Uploading</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0,
                  }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.3,
                  }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.6,
                  }}
                >
                  .
                </motion.span>
              </div>

              {/* Upload status list */}
              {uploadStatuses.length > 0 && (
                <div className="mt-4 w-full max-w-md space-y-2">
                  {uploadStatuses.map((status) => (
                    <motion.div
                      key={status.fileName}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-xs text-gray-600 bg-white/60 rounded-lg px-3 py-2"
                    >
                      {status.status === "uploading" && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full"
                        />
                      )}
                      {status.status === "success" && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                      {status.status === "error" && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="flex-1 truncate">{status.fileName}</span>
                      {status.status === "success" && (
                        <span className="text-green-600 font-medium">✓</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Messages */}
        <AnimatePresence>
          {errors.length > 0 && (
            <div className="mt-6 w-full max-w-4xl mx-auto space-y-2">
              {errors.map((error) => (
                <motion.div
                  key={error.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-red-900">
                      {error.fileName}
                    </p>
                    <p className="text-sm text-red-700 mt-1">{error.message}</p>
                  </div>
                  <button
                    onClick={() => dismissError(error.id)}
                    className="flex-shrink-0 text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Dismiss error"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
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


