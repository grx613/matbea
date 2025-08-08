import { NextResponse } from "next/server"
import { z } from "zod"
import { setOtpCookieHeaders, packOtpSession, hashCode } from "@/lib/cookies"

// OPTIONAL: SigmaSMS SDK wiring (uncomment when switching to Sigma)
// import { SigmaOtpSDK, SigmaOtpSDKEnvironmentEnum } from "@sigmamessaging/otp-sdk"
// const sigma = new SigmaOtpSDK({
//   apiToken: process.env.SIGMA_API_TOKEN!,
//   apiUrl: `${process.env.SIGMA_API_BASE_URL}/api/n/otp-handler`,
//   environment: SigmaOtpSDKEnvironmentEnum.production
// })

const schema = z.object({ phone: z.string().min(8).max(20) })

export async function POST(req: Request) {
  try {
    const { phone } = schema.parse(await req.json())

    // 1) По ТЗ телефон нигде не сохраняется — пропускаем этот шаг

    // 2) Генерируем одноразовый код (для dev) — на проде включите SigmaSMS ниже
    const code = (Math.floor(100000 + Math.random() * 900000)).toString().slice(0, 6)

    // TODO: включите Sigma: раскомментируйте и удалите mock-отправку
    // await sigma.start({ phone, channel: "sms", textTemplate: `Ваш код: ${code}` })

    // В DEV просто пишем код в логи (или отправьте себе через любой канал)
    if (process.env.NODE_ENV !== "production") console.log(`OTP dev preview`, { phone, code })

    const cookieHeaders = setOtpCookieHeaders(
      packOtpSession(phone, hashCode(code), 5 * 60), // 5 минут
      5 * 60
    )
    return new NextResponse(JSON.stringify({ ok: true }), { status: 200, headers: cookieHeaders as any })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "init error" }, { status: 400 })
  }
}
