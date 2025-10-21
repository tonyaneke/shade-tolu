/**
 * Database Setup Script
 * 
 * This script creates the RSVP table in your PostgreSQL database.
 * Run with: pnpm db:setup
 */

import dotenv from "dotenv";
import { Pool } from "pg";
import { existsSync } from "fs";
import { resolve } from "path";

// Load environment variables from .env.local or .env file
const envLocalPath = resolve(process.cwd(), ".env.local");
const envPath = resolve(process.cwd(), ".env");

if (existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
  console.log("📁 Loading environment from .env.local\n");
} else if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("📁 Loading environment from .env\n");
} else {
  console.log("⚠️  No .env or .env.local file found\n");
}

// Ensure database URL is set
const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ No database connection string found!");
  console.log("\nPlease set POSTGRES_URL or DATABASE_URL in your .env.local file:");
  console.log("POSTGRES_URL=postgres://username:password@host:port/database\n");
  process.exit(1);
}

async function setupDatabase() {
  console.log("🚀 Starting database setup for Railway PostgreSQL...\n");
  
  console.log("✅ Database connection string found");
  
  // Create connection pool
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }, // Railway requires SSL
  });

  try {
    // Test connection
    console.log("🔌 Testing database connection...");
    const testClient = await pool.connect();
    testClient.release();
    console.log("✅ Successfully connected to database\n");

    // Create RSVP table
    console.log("📋 Creating RSVP table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        goodwill_message TEXT,
        access_code VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ RSVP table created successfully!\n");

    // Check if table exists and show structure
    console.log("🔍 Verifying table structure...");
    const tableInfo = await pool.query(`
      SELECT column_name, data_type, character_maximum_length, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'rsvps'
      ORDER BY ordinal_position
    `);

    console.log("\n📊 Table Structure:");
    console.table(tableInfo.rows);

    // Show current record count
    const count = await pool.query(`SELECT COUNT(*) as count FROM rsvps`);
    console.log(`\n📈 Current RSVP count: ${count.rows[0].count}\n`);

    console.log("✨ Database setup complete!");
    
    await pool.end();
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    await pool.end();
    process.exit(1);
  }
}

// Run the setup
setupDatabase()
  .then(() => {
    console.log("\n✅ All done! Your Railway PostgreSQL database is ready to accept RSVPs.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
  });
