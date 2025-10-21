import { NextRequest, NextResponse } from "next/server";
import { getAllRSVPs, getRSVPStats, initializeRSVPTable } from "@/lib/db";

const ADMIN_PASSWORD = "Sade&tolu2025";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, action } = body;

    // Verify password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Initialize table if needed
    await initializeRSVPTable();

    // Handle different actions
    if (action === "stats") {
      const stats = await getRSVPStats();
      if (!stats.success) {
        return NextResponse.json(
          { error: "Failed to fetch statistics" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, stats: stats.data });
    }

    if (action === "attendees") {
      const attendees = await getAllRSVPs();
      if (!attendees.success) {
        return NextResponse.json(
          { error: "Failed to fetch attendees" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, attendees: attendees.data });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
