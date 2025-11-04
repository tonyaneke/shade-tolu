/**
 * Test script for Cloudinary Images API
 *
 * Usage: pnpm tsx scripts/test-cloudinary-api.ts
 *
 * Make sure your .env.local has:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * - CLOUDINARY_API_KEY
 * - CLOUDINARY_API_SECRET
 * - NEXT_PUBLIC_CLOUDINARY_FOLDER (optional)
 */

import dotenv from "dotenv";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "wedding-uploads";

async function testCloudinaryAPI() {
  console.log("🧪 Testing Cloudinary Images API\n");
  console.log("=".repeat(50));

  // Check configuration
  console.log("\n📋 Configuration Check:");
  console.log(
    `  Cloud Name: ${CLOUD_NAME ? `✅ Set (${CLOUD_NAME})` : "❌ Missing"}`
  );
  console.log(
    `  API Key: ${
      API_KEY ? `✅ Set (${API_KEY.substring(0, 8)}...)` : "❌ Missing"
    }`
  );
  console.log(
    `  API Secret: ${
      API_SECRET ? `✅ Set (${API_SECRET.substring(0, 8)}...)` : "❌ Missing"
    }`
  );
  console.log(`  Folder: ${FOLDER}`);

  // Verify credentials format
  if (API_KEY && API_KEY.length < 20) {
    console.warn(
      "  ⚠️  Warning: API Key seems too short. Cloudinary API keys are usually longer."
    );
  }
  if (API_SECRET && API_SECRET.length < 20) {
    console.warn(
      "  ⚠️  Warning: API Secret seems too short. Cloudinary API secrets are usually longer."
    );
  }

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error("\n❌ Missing required environment variables!");
    console.log("\nPlease set in .env.local:");
    console.log("  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name");
    console.log("  CLOUDINARY_API_KEY=your_api_key");
    console.log("  CLOUDINARY_API_SECRET=your_api_secret");
    process.exit(1);
  }

  // Test 1: Direct Cloudinary SDK test
  console.log("\n\n🔍 Test 1: Direct Cloudinary SDK Test");
  console.log("-".repeat(50));

  try {
    const { v2: cloudinary } = await import("cloudinary");

    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    console.log("  Fetching resources from Cloudinary...");
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: FOLDER,
      max_results: 10, // Test with just 10 first
    });

    console.log(`  ✅ Success! Found ${result.resources?.length || 0} images`);

    if (result.resources && result.resources.length > 0) {
      console.log("\n  Sample images:");
      result.resources.slice(0, 3).forEach((img: any, index: number) => {
        console.log(`    ${index + 1}. ${img.public_id}`);
        console.log(`       URL: ${img.secure_url?.substring(0, 60)}...`);
        console.log(`       Size: ${img.width}x${img.height}`);
      });
    } else {
      console.log("  ⚠️  No images found in folder:", FOLDER);
      console.log("  💡 Upload some images to test the full flow");
    }
  } catch (error: any) {
    console.error("  ❌ Error:", error.message || error.error?.message);
    if (error.http_code) {
      console.error(`  HTTP Code: ${error.http_code}`);
    }

    if (error.error?.message === "unknown api_key" || error.http_code === 401) {
      console.error("\n  🔍 Troubleshooting:");
      console.error(
        "    1. Verify your API Key and Secret in Cloudinary Dashboard:"
      );
      console.error("       Dashboard → Settings → Security");
      console.error(
        "    2. Make sure you're using the correct credentials for:"
      );
      console.error(`       Cloud Name: ${CLOUD_NAME}`);
      console.error(
        "    3. Check that CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET"
      );
      console.error("       in .env.local match your Cloudinary account");
      console.error("    4. Restart your dev server after updating .env.local");
    }

    if (process.env.NODE_ENV === "development") {
      console.error("\n  Full error:", JSON.stringify(error, null, 2));
    }
  }

  // Test 2: API Route test (if server is running)
  console.log("\n\n🔍 Test 2: API Route Test");
  console.log("-".repeat(50));
  console.log("  Note: This requires your Next.js server to be running");
  console.log("  Start server with: pnpm dev\n");

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/cloudinary/images?folder=${encodeURIComponent(
      FOLDER
    )}`;

    console.log(`  Requesting: ${apiUrl}`);

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      console.log(`  ✅ Success! Status: ${response.status}`);
      console.log(`  Found ${data.images?.length || 0} images`);
      console.log(`  Total: ${data.total || 0}`);

      if (data.images && data.images.length > 0) {
        console.log("\n  Sample images:");
        data.images.slice(0, 3).forEach((img: any, index: number) => {
          console.log(`    ${index + 1}. ID: ${img.id}`);
          console.log(`       URL: ${img.url?.substring(0, 60)}...`);
          console.log(`       Size: ${img.width}x${img.height}`);
        });
      }
    } else {
      console.error(`  ❌ Error! Status: ${response.status}`);
      console.error(`  Message: ${data.error || "Unknown error"}`);
      if (data.details) {
        console.error(`  Details:`, data.details);
      }
    }
  } catch (error: any) {
    if (error.code === "ECONNREFUSED") {
      console.log("  ⚠️  Server not running. Start with: pnpm dev");
    } else {
      console.error("  ❌ Error:", error.message);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ Test completed!\n");
}

// Run the test
testCloudinaryAPI().catch(console.error);
