import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// It's best to store your Neon connection string in an environment variable, e.g. process.env.DATABASE_URL
const connectionString = process.env.DATABASE_URL!;

// Create the Neon client
const sql = neon(connectionString);

// Create the Drizzle ORM instance
export const db = drizzle(sql);
