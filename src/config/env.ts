import { z } from 'zod'

const envSchema = z.object({
  VITE_NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  VITE_API_SPOTIFY: z.string(),
  VITE_API_ACCESS_SPOTIFY: z.string(),
  VITE_SPOTIFY_CLIENT_ID: z.string(),
  VITE_SPOTIFY_CLIENT_SECRET: z.string(),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

type ISchemaEnv = z.infer<typeof envSchema>

type RemoveVitePrefix<T extends string> = T extends `VITE_${infer R}`
  ? R
  : never

type CleanedSchemaEnv = {
  [K in keyof ISchemaEnv as RemoveVitePrefix<K>]: ISchemaEnv[K]
} & Record<string, unknown>

function removePrefix(value: ISchemaEnv): CleanedSchemaEnv {
  const newObject = {} as CleanedSchemaEnv

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const newKey = key.replace(/^VITE_/, '')
      newObject[newKey as keyof CleanedSchemaEnv] =
        value[key as keyof ISchemaEnv]
    }
  }

  return newObject
}

export const env: CleanedSchemaEnv = removePrefix(_env.data)
