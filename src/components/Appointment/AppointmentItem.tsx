import type { Appointment } from '../../types/appointment'

interface AppointmentItemProps {
  appointment: Appointment
  onCancel: (id: string) => void
}

export function AppointmentItem({ appointment, onCancel }: AppointmentItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-[#4a256f] bg-[#140b22]/90 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.08)] transition hover:border-[#ff3358]/60 hover:shadow-[0_0_14px_rgba(255,51,88,0.12)]">
      <div className="flex min-w-0 items-center gap-4">
        <span className="w-14 shrink-0 text-sm font-semibold text-[#ff8a1c] [text-shadow:0_0_8px_rgba(255,138,28,0.3)]">
          {appointment.time}
        </span>
        <span className="truncate text-sm font-medium text-[#f6eaff]" title={appointment.client}>
          {appointment.client}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onCancel(appointment.id)}
        className="shrink-0 rounded-lg border border-[#a855f7]/30 px-2.5 py-1 text-xs font-medium text-[#d7c7ee] transition hover:border-[#ff3358]/60 hover:bg-[#ff3358]/10 hover:text-[#fff0f4]"
        aria-label={`Cancelar agendamento de ${appointment.client} às ${appointment.time}`}
      >
        Cancelar
      </button>
    </li>
  )
}
