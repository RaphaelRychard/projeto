import 'dotenv/config'

import { z } from 'zod/v4'

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.url().min(1),

  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.url(),
})

export const env = envSchema.parse(process.env)
