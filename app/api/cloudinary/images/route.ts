import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "wedding-uploads";

// Configure Cloudinary
if (CLOUD_NAME && API_KEY && API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
}

export async function GET(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    // Get folder from query params or use default
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || FOLDER;

    // Use Cloudinary Admin API to fetch resources by folder prefix
    // This uses the SDK's admin API which handles authentication automatically
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 500,
    });

    // Transform Cloudinary response to our format
    const images = (result.resources || []).map((resource: any) => ({
      id: resource.asset_id || resource.public_id,
      url: resource.secure_url || resource.url,
      width: resource.width,
      height: resource.height,
      createdAt: resource.created_at,
      publicId: resource.public_id,
    }));

    return NextResponse.json({
      success: true,
      images,
      total: images.length,
    });
  } catch (error: any) {
    console.error("Error fetching Cloudinary images:", error);
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
