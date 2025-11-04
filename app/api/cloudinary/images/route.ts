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

export async function DELETE(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    // Get password and publicIds from request body
    const body = await request.json();
    const { password, publicIds } = body;

    // Verify admin password (same as admin stats route)
    const ADMIN_PASSWORD = "Sade&tolu2025";
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
      return NextResponse.json(
        { error: "publicIds array is required" },
        { status: 400 }
      );
    }

    // Delete images from Cloudinary (bulk delete)
    console.log("Attempting to delete publicIds:", publicIds);

    const deleteResults = await Promise.allSettled(
      publicIds.map(async (publicId: string) => {
        try {
          // Explicitly specify resource_type as 'image' and use invalidate to clear CDN cache
          const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
            invalidate: true,
          });
          console.log(`Delete result for ${publicId}:`, result);
          return result;
        } catch (error: any) {
          console.error(`Error deleting ${publicId}:`, error);
          throw error;
        }
      })
    );

    const successful = deleteResults.filter(
      (result) => result.status === "fulfilled" && result.value.result === "ok"
    ).length;

    const failed = deleteResults.length - successful;

    // Log failed deletions for debugging
    const failedResults = deleteResults
      .map((result, index) => ({ result, publicId: publicIds[index] }))
      .filter(
        ({ result }) =>
          result.status === "rejected" ||
          (result.status === "fulfilled" && result.value.result !== "ok")
      );

    if (failedResults.length > 0) {
      console.error("Failed deletions:", failedResults);
    }

    return NextResponse.json({
      success: true,
      deleted: successful,
      failed,
      total: publicIds.length,
      message: `${successful} image(s) deleted successfully${
        failed > 0 ? `, ${failed} failed` : ""
      }`,
      details:
        failedResults.length > 0
          ? failedResults.map(({ publicId, result }) => ({
              publicId,
              error:
                result.status === "rejected"
                  ? result.reason?.message
                  : result.value.result,
            }))
          : undefined,
    });
  } catch (error: any) {
    console.error("Error deleting Cloudinary images:", error);
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
