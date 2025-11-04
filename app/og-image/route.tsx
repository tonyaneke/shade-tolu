import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    // Get the base URL for the image
    const baseUrl = request.nextUrl.origin;
    const imageUrl = `${baseUrl}/first.jpg`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Background image */}
          <img
            src={imageUrl}
            alt="Shade & Tolu"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Dark overlay for better text readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 60px",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Decorative line */}
            <div
              style={{
                width: "120px",
                height: "4px",
                background:
                  "linear-gradient(to right, transparent, #fbbf24, transparent)",
                marginBottom: "30px",
              }}
            />

            {/* Main title */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "20px",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                fontFamily: "var(--font-tangerine)",
                letterSpacing: "2px",
              }}
            >
              Shade & Tolu
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "32px",
                color: "#fbbf24",
                marginBottom: "40px",
                fontWeight: 400,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                fontFamily: "serif",
                letterSpacing: "1px",
              }}
            >
              Forever Begins
            </p>

            {/* Date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "28px",
                  color: "#ffffff",
                  fontWeight: 300,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  fontFamily: "sans-serif",
                }}
              >
                December 26, 2025
              </p>
              <p
                style={{
                  fontSize: "24px",
                  color: "#fbbf24",
                  fontWeight: 300,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  fontFamily: "sans-serif",
                }}
              >
                Lagos, Nigeria
              </p>
            </div>

            {/* Bottom decorative line */}
            <div
              style={{
                width: "120px",
                height: "4px",
                background:
                  "linear-gradient(to right, transparent, #fbbf24, transparent)",
                marginTop: "40px",
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: any) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
