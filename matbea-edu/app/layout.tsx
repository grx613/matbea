import "./globals.css"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Matbea: Крипто-обучение",
  description: "Бесплатные курсы и PDF по работе с криптовалютами после подтверждения номера"
}
export const viewport: Viewport = { themeColor: "#111827" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-xl p-6">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Matbea Education</h1>
            <p className="text-sm text-gray-600">Учитесь работать с криптовалютами — бесплатно.</p>
          </header>
          {children}
          <footer className="mt-16 text-xs text-gray-500">
            © {new Date().getFullYear()} Matbea Education • Неофициальный сайт обучения • Не биржа
          </footer>
        </div>
      </body>
    </html>
  )
}
