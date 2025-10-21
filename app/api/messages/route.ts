import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();

    try {
      // Fetch RSVPs with goodwill messages
      const result = await client.query(
        `SELECT name, goodwill_message, created_at 
         FROM rsvps 
         WHERE goodwill_message IS NOT NULL 
         AND goodwill_message != '' 
         ORDER BY created_at DESC`
      );

      const messages = result.rows.map((row) => ({
        name: row.name,
        message: row.goodwill_message,
        date: row.created_at,
      }));

      return NextResponse.json({
        success: true,
        messages,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
