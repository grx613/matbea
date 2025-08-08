import { NextResponse } from "next/server"
import { z } from "zod"
import { getOtpCookie, unpackOtpSession, hashCode } from "@/lib/cookies"

// OPTIONAL: финальная проверка статуса в Sigma (если используете SDK)
// import { SigmaOtpSDK } from "@sigmamessaging/otp-sdk"
// const sigma = new SigmaOtpSDK({ apiToken: process.env.SIGMA_API_TOKEN!, apiUrl: `${process.env.SIGMA_API_BASE_URL}/api/n/otp-handler` })

const schema2 = z.object({ code: z.string().min(4).max(6) })

export async function POST(req: Request) {
  try {
    const { code } = schema2.parse(await req.json())
    const cookieVal = getOtpCookie(req)
    const session = unpackOtpSession(cookieVal)
    if (!session) return NextResponse.json({ error: "Сессия не найдена или истекла" }, { status: 401 })

    // Сравнение с хэшем кода
    if (session.hash !== hashCode(code)) {
      return NextResponse.json({ error: "Неверный код" }, { status: 401 })
    }

    // TODO (Sigma): завершить процесс на стороне Sigma и зафиксировать авторизацию
    // await sigma.checkStatusAndComplete({ phone: session.phone })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "verify error" }, { status: 400 })
  }
}
