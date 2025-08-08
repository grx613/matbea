import crypto from "crypto"

const OTP_COOKIE_NAME = "otp_session"

export function setOtpCookieHeaders(value: string, maxAgeSec: number) {
  return {
    "Set-Cookie": `${OTP_COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}`
  }
}

export function getOtpCookie(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.match(new RegExp(`${OTP_COOKIE_NAME}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function sign(data: string) {
  const secret = process.env.OTP_SECRET || "dev_secret"
  return crypto.createHmac("sha256", secret).update(data).digest("hex")
}

export function packOtpSession(phone: string, hash: string, ttlSec: number) {
  const exp = Math.floor(Date.now() / 1000) + ttlSec
  const payload = JSON.stringify({ phone, hash, exp })
  const sig = sign(payload)
  return encodeURIComponent(Buffer.from(JSON.stringify({ payload, sig })).toString("base64"))
}

export function unpackOtpSession(cookieVal: string | null): null | { phone: string; hash: string; exp: number } {
  try {
    if (!cookieVal) return null
    const raw = Buffer.from(decodeURIComponent(cookieVal), "base64").toString("utf8")
    const obj = JSON.parse(raw)
    const ok = sign(obj.payload) === obj.sig
    if (!ok) return null
    const session = JSON.parse(obj.payload)
    if (session.exp < Math.floor(Date.now() / 1000)) return null
    return session
  } catch { return null }
}

export function hashCode(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex")
}
