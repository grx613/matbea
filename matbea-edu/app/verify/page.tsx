import CodeForm from "@/components/CodeForm"

export default function VerifyPage() {
  return (
    <main className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-semibold">Подтверждение номера</h2>
        <p className="mb-4 text-sm text-gray-600">Мы отправили код на указанный номер. Введите код для доступа к материалам.</p>
        <CodeForm />
      </div>
    </main>
  )
}
