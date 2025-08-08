"use client"
import { useState } from "react"

export default function CodeForm() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/otp/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Неверный код")
      window.location.href = "/success"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Код из SMS</span>
        <input
          required
          inputMode="numeric"
          pattern="[0-9]{4,6}"
          maxLength={6}
          placeholder="123456"
          className="mt-1 w-full rounded-2xl border p-3 shadow-sm focus:outline-none focus:ring"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="rounded-2xl bg-black px-5 py-3 text-white shadow disabled:opacity-50">
        {loading ? "Проверяем…" : "Подтвердить"}
      </button>
    </form>
  )
}
