// scripts/init-db.ts
import { sql } from "@vercel/postgres";
import { readFileSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

config({ path: ".env.local" }); // Load environment variables

async function initDatabase() {
  try {
    // Read the schema SQL file
    const schemaPath = join(process.cwd(), "lib", "schema.sql");
    const schemaSql = readFileSync(schemaPath, "utf8");

    // Split the SQL into individual statements
    const statements = schemaSql
      .split(";")
      .map((statement) => statement.trim())
      .filter((statement) => statement.length > 0);

    // Connect to the Vercel Postgres database using the environment variable
    await sql.connect();

    // Execute each statement
    for (const statement of statements) {
      await sql.query(statement + ";");
      console.log("Executed:", statement.substring(0, 50) + "...");
    }

    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  } finally {
    // Close the connection
    await sql.end();
  }
}

initDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
