import appRootPath from 'app-root-path'
import { config } from 'dotenv'
import { z } from 'zod'

// config({
//   path: path.resolve(import.meta.dirname, "../../../.env"),
// });

const envFile = appRootPath.resolve('.env')

config({
  path: envFile,
})

// console.info(`Loading env from ${envFile}`, import.meta.url)

const envSchema = z.object({
  MAIN_ANALYTICS_ACCOUNT: z.string(),
  GOOGLE_APPLICATION_CREDENTIALS_FILE: z.string(),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error('Error parsing .env file')
  console.error(result.error.message)
  process.exit(1)
}

export const env = result.data
