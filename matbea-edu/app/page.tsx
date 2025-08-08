import PhoneForm from "@/components/PhoneForm"

export default function Page() {
  return (
    <main className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-semibold">Бесплатные материалы по криптовалютам</h2>
        <p className="mb-4 text-sm text-gray-600">Оставьте номер телефона, подтвердите кодом и получите PDF с обучением и ссылками на курсы.</p>
        <PhoneForm />
      </div>
      <ul className="grid gap-3 text-sm text-gray-700">
        <li>• Быстрый старт: кошельки, биржи, безопасность</li>
        <li>• Как покупать/продавать, комиссии, лимиты</li>
        <li>• Риски и защита от мошенников</li>
      </ul>
    </main>
  )
}
