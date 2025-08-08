export default function SuccessPage() {
  return (
    <main className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-semibold">Готово! 🎉</h2>
        <p className="text-sm text-gray-600">Спасибо за подтверждение. Ниже — ссылка на материалы.</p>
        <div className="mt-4">
          <a href="/crypto-edu.pdf" className="rounded-2xl bg-black px-5 py-3 text-white shadow">Скачать PDF</a>
        </div>
        <p className="mt-4 text-xs text-gray-500">Если ссылка не открывается, напишите нам: support@yourdomain.tld</p>
      </div>
    </main>
  )
}
