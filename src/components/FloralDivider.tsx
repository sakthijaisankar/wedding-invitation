export function FloralDivider() {
  return (
    <div
      className="mx-auto flex max-w-xs items-center justify-center gap-3 py-4"
      role="separator"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-gold/40" />
      <span className="font-calligraphy text-2xl text-gold sm:text-3xl">❀</span>
      <span className="font-heading text-xs tracking-[0.3em] text-maroon/70">✦</span>
      <span className="font-calligraphy text-2xl text-gold sm:text-3xl">❀</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold to-gold/40" />
    </div>
  )
}
