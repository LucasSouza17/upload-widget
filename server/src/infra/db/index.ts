import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import { schema } from './schemas'

const {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_PORT
} = env

const host =
  process.env.DATABASE_HOST ||
  (process.env.NODE_ENV === "production" ? "pg" : "localhost");

export const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${host}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export const pg = postgres(DATABASE_URL)
export const db = drizzle(pg, { schema: schema })
