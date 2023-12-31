import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

import { env } from "~/env.mjs";
import * as schema from "./schema/schema";

const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
