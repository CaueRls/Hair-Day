import type { Appointment } from '../../types/appointment'
import { AppointmentItem } from '../Appointment/AppointmentItem'

interface AppointmentListProps {
  appointments: Appointment[]
  selectedDate: string
  onCancel: (id: string) => void
}

type Period = {
  key: 'morning' | 'afternoon' | 'night'
  label: string
  range: string
  start: string
  end: string
  icon: string
}

const periods: Period[] = [
  { key: 'morning', label: 'Manhã', range: '09h-12h', start: '09:00', end: '12:00', icon: '☀️' },
  { key: 'afternoon', label: 'Tarde', range: '13h-18h', start: '13:00', end: '18:00', icon: '🌤️' },
  { key: 'night', label: 'Noite', range: '19h-21h', start: '19:00', end: '21:00', icon: '🌙' },
]

function inPeriod(time: string, start: string, end: string) {
  return time >= start && time <= end
}

function formatSelectedDate(date: string) {
  if (!date) return ''
  const parsed = new Date(`${date}T00:00:00`)
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(parsed)
}

export function AppointmentList({ appointments, selectedDate, onCancel }: AppointmentListProps) {
  const sorted = [...appointments].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#f5f4f5]">Sua agenda</h2>
          <p className="text-sm text-[#b2afb6]">
            Consulte os seus cortes de cabelo agendados por dia.
          </p>
        </div>
        {selectedDate ? (
          <p className="rounded-full border border-[#3a383d] bg-[#232225] px-3 py-1 text-sm font-medium capitalize text-[#d6d4d9]">
            {formatSelectedDate(selectedDate)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        {periods.map((period) => {
          const items = sorted.filter((appointment) =>
            inPeriod(appointment.time, period.start, period.end),
          )

          return (
            <div
              key={period.key}
              className="overflow-hidden rounded-2xl border border-[#2e2c30] bg-[#1f1e21]"
            >
              <div className="flex items-center justify-between border-b border-[#2e2c30] px-4 py-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f5f4f5]">
                  <span aria-hidden>{period.icon}</span>
                  {period.label}
                </h3>
                <span className="text-xs font-medium text-[#8c8991]">{period.range}</span>
              </div>

              <div className="p-4">
                {items.length === 0 ? (
                  <p className="py-2 text-center text-sm text-[#6f6c75]">
                    Nenhum agendamento neste período
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {items.map((appointment) => (
                      <AppointmentItem
                        key={appointment.id}
                        appointment={appointment}
                        onCancel={onCancel}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
