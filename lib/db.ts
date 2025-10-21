import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

/**
 * Generate a unique access code in the format WED-XXXXX-YYYY
 */
export function generateAccessCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part1 = Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const part2 = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");

  return `WED-${part1}-${part2}`;
}

/**
 * Initialize the RSVP table if it doesn't exist
 */
export async function initializeRSVPTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        goodwill_message TEXT,
        access_code VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    return { success: true };
  } catch (error) {
    console.error("Error initializing RSVP table:", error);
    return { success: false, error };
  } finally {
    client.release();
  }
}

/**
 * Create a new RSVP entry
 */
export async function createRSVP(data: {
  name: string;
  email: string;
  goodwillMessage?: string;
  accessCode: string;
}) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO rsvps (name, email, goodwill_message, access_code)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.name, data.email, data.goodwillMessage || "", data.accessCode]
    );

    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return { success: false, error };
  } finally {
    client.release();
  }
}

/**
 * Check if access code already exists
 */
export async function accessCodeExists(accessCode: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id FROM rsvps WHERE access_code = $1 LIMIT 1`,
      [accessCode]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error("Error checking access code:", error);
    return false;
  } finally {
    client.release();
  }
}

/**
 * Generate a unique access code that doesn't exist in the database
 */
export async function generateUniqueAccessCode(): Promise<string> {
  let accessCode = generateAccessCode();
  let attempts = 0;
  const maxAttempts = 10;

  while ((await accessCodeExists(accessCode)) && attempts < maxAttempts) {
    accessCode = generateAccessCode();
    attempts++;
  }

  return accessCode;
}

/**
 * Get all RSVPs with optional pagination
 */
export async function getAllRSVPs(limit?: number, offset?: number) {
  const client = await pool.connect();
  try {
    const query = limit
      ? `SELECT * FROM rsvps ORDER BY created_at DESC LIMIT $1 OFFSET $2`
      : `SELECT * FROM rsvps ORDER BY created_at DESC`;

    const params = limit ? [limit, offset || 0] : [];
    const result = await client.query(query, params);

    return { success: true, data: result.rows };
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return { success: false, error };
  } finally {
    client.release();
  }
}

/**
 * Get RSVP statistics
 */
export async function getRSVPStats() {
  const client = await pool.connect();
  try {
    // Total count
    const countResult = await client.query(
      `SELECT COUNT(*) as total FROM rsvps`
    );

    // Count with goodwill messages
    const withMessagesResult = await client.query(
      `SELECT COUNT(*) as total FROM rsvps WHERE goodwill_message IS NOT NULL AND goodwill_message != ''`
    );

    // Recent RSVPs (last 7 days)
    const recentResult = await client.query(
      `SELECT COUNT(*) as total FROM rsvps WHERE created_at >= NOW() - INTERVAL '7 days'`
    );

    // RSVPs per day (last 30 days)
    const perDayResult = await client.query(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM rsvps 
       WHERE created_at >= NOW() - INTERVAL '30 days'
       GROUP BY DATE(created_at)
       ORDER BY date DESC`
    );

    return {
      success: true,
      data: {
        total: parseInt(countResult.rows[0].total),
        withMessages: parseInt(withMessagesResult.rows[0].total),
        recentWeek: parseInt(recentResult.rows[0].total),
        perDay: perDayResult.rows,
      },
    };
  } catch (error) {
    console.error("Error fetching RSVP stats:", error);
    return { success: false, error };
  } finally {
    client.release();
  }
}

// Export the pool for advanced usage
export { pool };
