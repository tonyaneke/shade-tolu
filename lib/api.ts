// API utility functions for TanStack Query

export interface RSVPData {
  name: string;
  email: string;
  goodwillMessage?: string;
}

export interface RSVPResponse {
  success: boolean;
  data: {
    accessCode: string;
  };
  error?: string;
}

export interface CloudinaryImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
  createdAt?: string;
  publicId?: string;
}

export interface CloudinaryResponse {
  success: boolean;
  images: CloudinaryImage[];
  total: number;
}

export interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
}

export interface MessagesResponse {
  success: boolean;
  messages: Message[];
}

export interface AdminStats {
  total: number;
  withMessages: number;
  recentWeek: number;
  perDay: { date: string; count: string }[];
}

export interface Attendee {
  id: number;
  name: string;
  email: string;
  goodwill_message: string | null;
  access_code: string;
  created_at: string;
}

export interface AdminStatsResponse {
  success: boolean;
  stats?: AdminStats;
  attendees?: Attendee[];
  error?: string;
}

// RSVP API
export async function submitRSVP(data: RSVPData): Promise<RSVPResponse> {
  const response = await fetch("/api/rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit RSVP");
  }

  return result;
}

// Cloudinary Images API
export async function fetchCloudinaryImages(): Promise<CloudinaryResponse> {
  const response = await fetch("/api/cloudinary/images");

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  return response.json();
}

// Messages API
export async function fetchMessages(): Promise<MessagesResponse> {
  const response = await fetch("/api/messages");

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return response.json();
}

// Admin API
export async function fetchAdminStats(
  password: string
): Promise<AdminStatsResponse> {
  const response = await fetch("/api/admin/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, action: "stats" }),
  });

  if (!response.ok) {
    throw new Error("Invalid password");
  }

  const data = await response.json();
  return { success: true, stats: data.stats };
}

export async function fetchAdminAttendees(
  password: string
): Promise<AdminStatsResponse> {
  const response = await fetch("/api/admin/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, action: "attendees" }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch attendees");
  }

  const data = await response.json();
  return { success: true, attendees: data.attendees };
}

export async function deleteRSVP(
  password: string,
  id: number
): Promise<{ success: boolean }> {
  const response = await fetch("/api/admin/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, action: "delete", id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete RSVP");
  }

  return response.json();
}

// Cloudinary Upload
export interface CloudinaryUploadParams {
  file: File;
  cloudName: string;
  uploadPreset: string;
  folder?: string;
}

export interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  created_at: string;
}

export async function uploadToCloudinary(
  params: CloudinaryUploadParams
): Promise<CloudinaryUploadResponse> {
  const { file, cloudName, uploadPreset, folder } = params;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);
  if (folder) {
    form.append("folder", folder);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, { method: "POST", body: form });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.error?.message ||
      `Upload failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (!data.secure_url && !data.url) {
    throw new Error("Upload succeeded but no image URL was returned");
  }

  return data;
}

// Delete Cloudinary Images (supports bulk delete)
export async function deleteCloudinaryImages(
  password: string,
  publicIds: string[]
): Promise<{
  success: boolean;
  deleted: number;
  failed: number;
  total: number;
  message: string;
}> {
  const response = await fetch("/api/cloudinary/images", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, publicIds }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to delete images");
  }

  return response.json();
}
