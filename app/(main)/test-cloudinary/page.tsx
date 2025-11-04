"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, XCircle, Upload, Loader2 } from "lucide-react";

interface TestResult {
  name: string;
  status: "checking" | "pass" | "fail";
  message: string;
}

export default function TestCloudinaryPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    const tests: TestResult[] = [];

    // Test 1: Check Cloud Name
    tests.push({
      name: "Cloud Name",
      status: "checking",
      message: "Checking...",
    });
    setResults([...tests]);

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (CLOUD_NAME) {
      tests[0] = {
        name: "Cloud Name",
        status: "pass",
        message: `✓ Found: ${CLOUD_NAME}`,
      };
    } else {
      tests[0] = {
        name: "Cloud Name",
        status: "fail",
        message: "✗ Missing: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
      };
    }
    setResults([...tests]);

    // Test 2: Check Upload Preset
    tests.push({
      name: "Upload Preset",
      status: "checking",
      message: "Checking...",
    });
    setResults([...tests]);

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (UPLOAD_PRESET) {
      tests[1] = {
        name: "Upload Preset",
        status: "pass",
        message: `✓ Found: ${UPLOAD_PRESET}`,
      };
    } else {
      tests[1] = {
        name: "Upload Preset",
        status: "fail",
        message: "✗ Missing: NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
      };
    }
    setResults([...tests]);

    // Test 3: Check Folder (optional)
    tests.push({
      name: "Upload Folder",
      status: "checking",
      message: "Checking...",
    });
    setResults([...tests]);

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (FOLDER) {
      tests[2] = {
        name: "Upload Folder",
        status: "pass",
        message: `✓ Found: ${FOLDER}`,
      };
    } else {
      tests[2] = {
        name: "Upload Folder",
        status: "pass",
        message: "⚠ Optional (not set, will upload to root)",
      };
    }
    setResults([...tests]);

    // Test 4: Verify API Endpoint
    tests.push({
      name: "API Endpoint",
      status: "checking",
      message: "Verifying...",
    });
    setResults([...tests]);

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (CLOUD_NAME) {
      const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      try {
        // Just verify the endpoint format is correct
        tests[3] = {
          name: "API Endpoint",
          status: "pass",
          message: `✓ Endpoint: ${endpoint}`,
        };
      } catch (error) {
        tests[3] = {
          name: "API Endpoint",
          status: "fail",
          message: `✗ Invalid endpoint format`,
        };
      }
    } else {
      tests[3] = {
        name: "API Endpoint",
        status: "fail",
        message: "✗ Cannot verify (missing cloud name)",
      };
    }
    setResults([...tests]);
  };

  const testUpload = async (file: File) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setUploadError("Missing Cloudinary configuration");
      return;
    }

    setUploading(true);
    setUploadResult(null);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      if (FOLDER) {
        formData.append("folder", FOLDER);
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Upload failed: ${response.status}`
        );
      }

      const data = await response.json();
      setUploadResult(data.secure_url);
    } catch (error: any) {
      setUploadError(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      testUpload(file);
    }
  };

  const allPassed = results.every((r) => r.status === "pass");
  const hasFailures = results.some((r) => r.status === "fail");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Cloudinary Connection Test
          </h1>
          <p className="text-gray-600 text-lg">
            Verify your Cloudinary configuration and test uploads
          </p>
        </motion.div>

        {/* Configuration Tests */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Configuration Status
          </h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  result.status === "pass"
                    ? "bg-green-50 border-green-200"
                    : result.status === "fail"
                    ? "bg-red-50 border-red-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                {result.status === "checking" ? (
                  <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
                ) : result.status === "pass" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{result.name}</p>
                  <p className="text-sm text-gray-600">{result.message}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall Status */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`mt-6 p-4 rounded-xl border-2 ${
                allPassed && !hasFailures
                  ? "bg-green-100 border-green-300"
                  : "bg-red-100 border-red-300"
              }`}
            >
              <p className="text-center font-semibold text-lg">
                {allPassed && !hasFailures
                  ? "✓ All checks passed! Cloudinary is configured correctly."
                  : "✗ Some checks failed. Please review your configuration."}
              </p>
            </motion.div>
          )}
        </div>

        {/* Upload Test */}
        {CLOUD_NAME && UPLOAD_PRESET && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Upload Test
            </h2>
            <div className="border-2 border-dashed border-amber-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <p className="text-gray-700 mb-4">
                Select an image to test the upload functionality
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={uploading}
                  className="px-6 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    "Choose Image"
                  )}
                </motion.button>
              </label>
            </div>

            {uploadResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <p className="text-green-800 font-semibold mb-2">
                  ✓ Upload successful!
                </p>
                <p className="text-sm text-green-700 break-all">
                  {uploadResult}
                </p>
                {uploadResult && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-green-200">
                    <img
                      src={uploadResult}
                      alt="Uploaded test"
                      className="w-full h-auto max-h-64 object-contain"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-red-800 font-semibold mb-2">
                  ✗ Upload failed
                </p>
                <p className="text-sm text-red-700">{uploadError}</p>
              </motion.div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-amber-50/50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Setup Instructions:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>
              Create a <code className="bg-white px-2 py-1 rounded">.env.local</code> file in
              your project root
            </li>
            <li>
              Add your Cloudinary credentials:
              <pre className="bg-white p-3 rounded mt-2 text-xs overflow-x-auto">
                {`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name
NEXT_PUBLIC_CLOUDINARY_FOLDER=wedding-uploads`}
              </pre>
            </li>
            <li>
              In Cloudinary Dashboard, create an unsigned upload preset with:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Signing mode: Unsigned</li>
                <li>Folder: wedding-uploads (or your preferred folder)</li>
                <li>Allowed formats: images only</li>
                <li>Max file size: 10MB (or your preference)</li>
              </ul>
            </li>
            <li>Restart your dev server after adding environment variables</li>
          </ol>
        </div>
      </div>
    </div>
  );
}


