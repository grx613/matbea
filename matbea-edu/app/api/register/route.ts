import { NextResponse } from "next/server"
import { z } from "zod"
import { getKV } from "@/lib/kv"

const schema = z.object({ phone: z.string().min(8).max(20) })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "bad phone" }, { status: 400 })
  const { phone } = parsed.data
  const kv = getKV()
  try {
    if (kv) {
      await kv.sadd("phones", phone)
    } else {
      console.log("PHONE:", phone)
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
