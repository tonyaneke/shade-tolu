import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  createRSVP,
  generateUniqueAccessCode,
  initializeRSVPTable,
} from "@/lib/db";
import {
  getCoupleNotificationEmail,
  getUserConfirmationEmail,
} from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const COUPLE_EMAIL = process.env.COUPLE_EMAIL || "info@Zentrixapex.com";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, goodwillMessage } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate goodwill message length (250 characters max)
    if (goodwillMessage && goodwillMessage.length > 250) {
      return NextResponse.json(
        { error: "Goodwill message must be 250 characters or less" },
        { status: 400 }
      );
    }

    // Initialize table if it doesn't exist
    await initializeRSVPTable();

    // Generate unique access code
    const accessCode = await generateUniqueAccessCode();

    // Save to database
    const result = await createRSVP({
      name,
      email,
      goodwillMessage,
      accessCode,
    });

    if (!result.success) {
      console.error("Database error:", result.error);
      return NextResponse.json(
        { error: "Failed to save RSVP" },
        { status: 500 }
      );
    }

    // Format timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send email to couple
    try {
      await resend.emails.send({
        from: "Shade & Tolu's Wedding <noreply@zentrixapex.com>",
        to: COUPLE_EMAIL,
        subject: `New RSVP from ${name}`,
        html: getCoupleNotificationEmail({
          name,
          email,
          goodwillMessage,
          accessCode,
          timestamp,
        }),
      });
    } catch (emailError) {
      console.error("Error sending notification to couple:", emailError);
      // Don't fail the request if couple notification fails
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: "Shade & Tolu's Wedding <noreply@zentrixapex.com>",
        to: email,
        subject: "RSVP Confirmed - Shade & Tolu's Wedding",
        html: getUserConfirmationEmail({
          name,
          accessCode,
        }),
      });
    } catch (emailError) {
      console.error("Error sending confirmation to user:", emailError);
      // Don't fail the request if user confirmation fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        name,
        email,
        accessCode,
        message: "RSVP submitted successfully",
      },
    });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
