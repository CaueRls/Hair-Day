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
    <aside className="w-full rounded-2xl border border-[#4a256f] bg-[#140b22]/90 p-5 shadow-[0_0_24px_rgba(168,85,247,0.12),inset_0_0_0_1px_rgba(255,138,28,0.05)] backdrop-blur-sm lg:sticky lg:top-8 lg:max-w-sm">
      <h2 className="text-xl font-semibold text-[#f6eaff] [text-shadow:0_0_10px_rgba(168,85,247,0.25)]">Agende um atendimento</h2>
      <p className="mt-1 text-sm text-[#bfa9d8]">
        Selecione data, horário e informe o nome do cliente para criar o agendamento.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm font-medium text-[#e9d9ff]">
          Data
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(event) => {
              onDateChange(event.target.value)
              onTimeChange('')
            }}
            className="rounded-xl border border-[#5b2a86] bg-[#1b102e] px-3 py-2.5 text-sm text-[#f6eaff] outline-none ring-[#ff8a1c] transition focus:border-[#ff8a1c]/70 focus:ring-2 [color-scheme:dark]"
            required
          />
        </label>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-[#e9d9ff]">Horários</legend>
          <div className="flex flex-col gap-4 rounded-xl border border-[#4a256f] bg-[#11091d] p-3">
            {periods.map((period) => (
              <div key={period.key}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#c084fc]">
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
                            ? 'border-[#ff8a1c] bg-gradient-to-r from-[#ff3358] to-[#ff8a1c] text-white shadow-[0_0_12px_rgba(255,138,28,0.35)]'
                            : 'border-[#5b2a86] bg-[#1b102e] text-[#f6eaff] hover:border-[#a855f7] hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]',
                          disabled && !selected ? 'cursor-not-allowed opacity-35 hover:border-[#5b2a86] hover:shadow-none' : '',
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

        <label className="flex flex-col gap-2 text-sm font-medium text-[#e9d9ff]">
          Cliente
          <input
            type="text"
            value={client}
            onChange={(event) => onClientChange(event.target.value)}
            placeholder="Nome do cliente"
            className="rounded-xl border border-[#5b2a86] bg-[#1b102e] px-3 py-2.5 text-sm text-[#f6eaff] placeholder:text-[#8e78aa] outline-none ring-[#ff3358] transition focus:border-[#ff3358]/70 focus:ring-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={!selectedDate || !time || !client.trim()}
          className="mt-1 rounded-xl border border-[#ff8a1c]/60 bg-gradient-to-r from-[#a855f7] via-[#ff3358] to-[#ff8a1c] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_0_18px_rgba(255,51,88,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
        >
          Agendar
        </button>
      </form>
    </aside>
  )
}
