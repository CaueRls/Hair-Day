import type { FormEvent } from 'react'

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

const periods = [
  { key: 'morning', label: 'Manhã', slots: ['09:00', '10:00', '11:00', '12:00'] },
  { key: 'afternoon', label: 'Tarde', slots: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'] },
  { key: 'night', label: 'Noite', slots: ['19:00', '20:00', '21:00'] },
] as const

function isPastSlot(selectedDate: string, slot: string) {
  if (!selectedDate) return false
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  if (selectedDate < today) return true
  if (selectedDate > today) return false
  const [h, m] = slot.split(':').map(Number)
  const slotDate = new Date()
  slotDate.setHours(h, m, 0, 0)
  return slotDate.getTime() <= now.getTime()
}

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
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <aside className="w-full rounded-2xl border border-[#2e2c30] bg-[#1f1e21] p-5 lg:sticky lg:top-8 lg:max-w-sm">
      <h2 className="text-xl font-semibold text-[#f5f4f5]">Agende um atendimento</h2>
      <p className="mt-1 text-sm text-[#b2afb6]">
        Selecione data, horário e informe o nome do cliente para criar o agendamento.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm font-medium text-[#d6d4d9]">
          Data
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(event) => {
              onDateChange(event.target.value)
              onTimeChange('')
            }}
            className="rounded-xl border border-[#3a383d] bg-[#232225] px-3 py-2.5 text-sm text-[#f5f4f5] outline-none ring-[#b8952e] transition focus:ring-2 [color-scheme:dark]"
            required
          />
        </label>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-[#d6d4d9]">Horários</legend>
          <div className="flex flex-col gap-4 rounded-xl border border-[#2e2c30] bg-[#232225] p-3">
            {periods.map((period) => (
              <div key={period.key}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8c8991]">
                  {period.label}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {period.slots.map((slot) => {
                    const booked = bookedTimes.has(slot)
                    const past = isPastSlot(selectedDate, slot)
                    const disabled = booked || past || !selectedDate
                    const selected = time === slot
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={disabled}
                        onClick={() => onTimeChange(slot)}
                        className={[
                          'rounded-lg border px-2 py-2 text-sm font-medium transition',
                          selected
                            ? 'border-[#b8952e] bg-[#b8952e] text-[#19181b]'
                            : 'border-[#3a383d] bg-[#1f1e21] text-[#f5f4f5] hover:border-[#b8952e]/70',
                          disabled && !selected ? 'cursor-not-allowed opacity-40 hover:border-[#3a383d]' : '',
                        ].join(' ')}
                        title={booked ? 'Horário indisponível' : past ? 'Horário indisponível' : `Selecionar ${slot}`}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <input type="hidden" value={time} required readOnly />
        </fieldset>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#d6d4d9]">
          Cliente
          <input
            type="text"
            value={client}
            onChange={(event) => onClientChange(event.target.value)}
            placeholder="Nome do cliente"
            className="rounded-xl border border-[#3a383d] bg-[#232225] px-3 py-2.5 text-sm text-[#f5f4f5] placeholder:text-[#6f6c75] outline-none ring-[#b8952e] transition focus:ring-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={!selectedDate || !time || !client.trim()}
          className="mt-1 rounded-xl bg-[#b8952e] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#19181b] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Agendar
        </button>
      </form>
    </aside>
  )
}
