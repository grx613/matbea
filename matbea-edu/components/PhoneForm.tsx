"use client"
import { useState } from "react"

export default function PhoneForm() {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/otp/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Ошибка отправки кода")
      window.location.href = "/verify"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Мобильный телефон</span>
        <input
          required
          type="tel"
          placeholder="+7 999 123-45-67"
          className="mt-1 w-full rounded-2xl border p-3 shadow-sm focus:outline-none focus:ring"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded-2xl bg-black px-5 py-3 text-white shadow disabled:opacity-50">
        {loading ? "Отправляем код…" : "Получить доступ"}
      </button>
      <p className="text-xs text-gray-500">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности.</p>
    </form>
  )
}
