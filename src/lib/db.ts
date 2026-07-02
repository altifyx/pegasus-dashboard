import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../../schemas/index';

// Use exact DATABASE_URL from .env with fallback for build time
const connectionString: string = process.env.DATABASE_URL || 'postgres://user:pass@host/db';
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
