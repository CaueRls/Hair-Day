interface HeaderProps {
  title?: string
}

export function Header({ title = 'HairDay' }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#f5f4f5] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[#b2afb6]">
          Agende e gerencie horários de forma simples.
        </p>
      </div>
    </header>
  )
}
