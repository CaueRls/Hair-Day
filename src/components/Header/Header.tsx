export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ff8a1c]/50 bg-gradient-to-br from-[#a855f7] via-[#ff3358] to-[#ff8a1c] text-lg font-black text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]">
          HD
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff8a1c] [text-shadow:0_0_10px_rgba(255,138,28,0.35)]">
            Hair Day Arcade
          </p>
          <h1 className="text-xl font-bold leading-tight text-[#f6eaff] sm:text-2xl [text-shadow:0_0_14px_rgba(168,85,247,0.25)]">
            Plataforma de agendamento
          </h1>
          <p className="mt-1 text-sm text-[#bfa9d8]">Agende seu horário com estilo fliperama.</p>
        </div>
      </div>
    </header>
  )
}
