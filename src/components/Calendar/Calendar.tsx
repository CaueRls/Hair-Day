interface CalendarProps {
  selectedDate: string
  onDateChange: (date: string) => void
  client: string
  onClientChange: (value: string) => void
  time: string
  onTimeChange: (value: string) => void
  onSubmit: () => void
  bookedTimes: Set<string>
}

const availableTimes = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
]

export function Calendar({
  selectedDate,
  onDateChange,
  client,
  onClientChange,
  time,
  onTimeChange,
  onSubmit,
  bookedTimes,
}: CalendarProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <aside className="w-full rounded-2xl border border-[#2e2c30] bg-[#1f1e21] p-5 lg:max-w-sm">
      <h2 className="text-xl font-semibold text-[#f5f4f5]">Agende um atendimento</h2>
      <p className="mt-1 text-sm text-[#b2afb6]">
        Selecione data, horário e informe o nome do cliente para criar o agendamento.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-[#d6d4d9]">
          Data
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
            className="rounded-xl border border-[#3a383d] bg-[#232225] px-3 py-2.5 text-sm text-[#f5f4f5] outline-none ring-[#b8952e] focus:ring-2"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-[#d6d4d9]">
          Horários
          <select
            value={time}
            onChange={(event) => onTimeChange(event.target.value)}
            className="rounded-xl border border-[#3a383d] bg-[#232225] px-3 py-2.5 text-sm text-[#f5f4f5] outline-none ring-[#b8952e] focus:ring-2 disabled:opacity-60"
            required
            disabled={!selectedDate}
          >
            <option value="">Selecione um horário</option>
            {availableTimes.map((slot) => {
              const isBooked = bookedTimes.has(slot)
              return (
                <option key={slot} value={slot} disabled={isBooked}>
                  {slot}
                  {isBooked ? ' (indisponível)' : ''}
                </option>
              )
            })}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-[#d6d4d9]">
          Cliente
          <input
            type="text"
            value={client}
            onChange={(event) => onClientChange(event.target.value)}
            placeholder="Nome do cliente"
            className="rounded-xl border border-[#3a383d] bg-[#232225] px-3 py-2.5 text-sm text-[#f5f4f5] placeholder:text-[#6f6c75] outline-none ring-[#b8952e] focus:ring-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={!selectedDate || !time || !client.trim()}
          className="mt-2 rounded-xl bg-[#b8952e] px-4 py-3 text-sm font-semibold text-[#19181b] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Agendar
        </button>
      </form>
    </aside>
  )
}
