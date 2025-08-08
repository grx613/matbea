import { Redis } from "ioredis"

export function getKV() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  return new Redis(url, { username: "default", password: token, tls: { rejectUnauthorized: false } })
}
