import { SafeImage } from './SafeImage'
import { FLORAL_BORDER } from '../constants'

interface DecorativeBorderProps {
  children: React.ReactNode
  className?: string
}

export function DecorativeBorder({ children, className = '' }: DecorativeBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-gold/60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-1 rounded-xl border border-maroon/20"
        aria-hidden="true"
      />
      <SafeImage
        src={FLORAL_BORDER}
        alt=""
        className="pointer-events-none absolute -top-3 left-1/2 h-8 w-auto max-w-[90%] -translate-x-1/2 object-contain opacity-90"
        fallback={
          <div
            className="pointer-events-none absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1"
            aria-hidden="true"
          >
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-gold text-lg">
                ✦
              </span>
            ))}
          </div>
        }
      />
      <div className="relative z-10 p-6 sm:p-8">{children}</div>
    </div>
  )
}
