import type { Appointment } from '../../types/appointment'
import { AppointmentItem } from '../Appointment/AppointmentItem'

interface AppointmentListProps {
  appointments: Appointment[]
  onCancel: (id: string) => void
}

type Period = {
  key: 'morning' | 'afternoon' | 'night'
  label: string
  range: string
  start: string
  end: string
}

const periods: Period[] = [
  { key: 'morning', label: 'Manhã', range: '09h - 12h', start: '09:00', end: '12:00' },
  { key: 'afternoon', label: 'Tarde', range: '13h - 18h', start: '13:00', end: '18:00' },
  { key: 'night', label: 'Noite', range: '19h - 21h', start: '19:00', end: '21:00' },
]

function inPeriod(time: string, start: string, end: string) {
  return time >= start && time <= end
}

export function AppointmentList({ appointments, onCancel }: AppointmentListProps) {
  const sorted = [...appointments].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <section className="flex flex-1 flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-[#f5f4f5]">Agendamentos</h2>
        <p className="mt-1 text-sm text-[#b2afb6]">
          Visualize os horários agendados por período do dia.
        </p>
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
                <h3 className="text-sm font-semibold text-[#f5f4f5]">{period.label}</h3>
                <span className="text-xs text-[#8c8991]">{period.range}</span>
              </div>

              <div className="p-4">
                {items.length === 0 ? (
                  <p className="text-sm text-[#6f6c75]">Nenhum agendamento neste período.</p>
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
