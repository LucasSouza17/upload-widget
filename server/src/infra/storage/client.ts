import { S3Client } from '@aws-sdk/client-s3'
import { env } from '@/env'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.CLOUDFARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFARE_SECRET_ACCESS_KEY,
  },
})
