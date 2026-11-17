import type { Appointment } from '../../types/appointment'

interface AppointmentItemProps {
  appointment: Appointment
  onCancel: (id: string) => void
}

export function AppointmentItem({ appointment, onCancel }: AppointmentItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-[#2e2c30] bg-[#232225] px-4 py-3 transition hover:border-[#3a383d]">
      <div className="flex min-w-0 items-center gap-4">
        <span className="w-14 shrink-0 text-sm font-semibold text-[#b8952e]">
          {appointment.time}
        </span>
        <span className="truncate text-sm font-medium text-[#f5f4f5]" title={appointment.client}>
          {appointment.client}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onCancel(appointment.id)}
        className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-[#b2afb6] transition hover:bg-[#2e2c30] hover:text-[#f5f4f5]"
        aria-label={`Cancelar agendamento de ${appointment.client} às ${appointment.time}`}
      >
        Cancelar
      </button>
    </li>
  )
}
