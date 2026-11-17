export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b8952e] text-lg font-bold text-[#19181b]">
          HD
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8952e]">
            Hair Day
          </p>
          <h1 className="text-xl font-bold leading-tight text-[#f5f4f5] sm:text-2xl">
            Plataforma de agendamento
          </h1>
        </div>
      </div>
    </header>
  )
}
