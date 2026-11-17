import { useEffect, useMemo, useState } from 'react'
import { AppointmentList } from '../../components/AppointmentList/AppointmentList'
import { Calendar } from '../../components/Calendar/Calendar'
import { Header } from '../../components/Header/Header'
import { initialAppointments } from '../../data/appointments'
import type { Appointment } from '../../types/appointment'

const STORAGE_KEY = 'hairday:appointments'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function loadAppointments(): Appointment[] {
  if (typeof window === 'undefined') return initialAppointments
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialAppointments
    const parsed = JSON.parse(stored) as Appointment[]
    return Array.isArray(parsed) ? parsed : initialAppointments
  } catch {
    return initialAppointments
  }
}

export function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>(loadAppointments)
  const [selectedDate, setSelectedDate] = useState<string>(todayISO())
  const [client, setClient] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
  }, [appointments])

  const appointmentsForDate = useMemo(
    () => appointments.filter((appointment) => appointment.date === selectedDate),
    [appointments, selectedDate],
  )

  const bookedTimes = useMemo(
    () => new Set(appointmentsForDate.map((appointment) => appointment.time)),
    [appointmentsForDate],
  )

  function handleCreateAppointment() {
    if (!client.trim() || !time || !selectedDate) return

    if (bookedTimes.has(time)) {
      window.alert('Este horário já está agendado para a data selecionada.')
      return
    }

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      client: client.trim(),
      date: selectedDate,
      time,
    }

    setAppointments((prev) => [...prev, newAppointment])
    setClient('')
    setTime('')
  }

  function handleCancelAppointment(id: string) {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Header />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Calendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          client={client}
          onClientChange={setClient}
          time={time}
          onTimeChange={setTime}
          onSubmit={handleCreateAppointment}
          bookedTimes={bookedTimes}
        />

        <AppointmentList
          appointments={appointmentsForDate}
          selectedDate={selectedDate}
          onCancel={handleCancelAppointment}
        />
      </div>
    </main>
  )
}
