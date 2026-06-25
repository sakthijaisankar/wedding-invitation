import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  size: number
  rotation: number
  delay: number
}

const COLORS = ['#D4AF37', '#800020', '#FFF8F0', '#C9A227', '#A0153E']

interface ConfettiProps {
  active: boolean
  duration?: number
}

export function Confetti({ active, duration = 4000 }: ConfettiProps) {
  const reducedMotion = useReducedMotion()
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!active || reducedMotion) return

    const generated: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }))
    setPieces(generated)

    const timer = window.setTimeout(() => setPieces([]), duration)
    return () => window.clearTimeout(timer)
  }, [active, duration, reducedMotion])

  if (reducedMotion || pieces.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.span
            key={piece.id}
            className="absolute rounded-sm"
            style={{
              left: `${piece.x}%`,
              top: '-5%',
              width: piece.size,
              height: piece.size * 0.6,
              backgroundColor: piece.color,
            }}
            initial={{ y: 0, opacity: 1, rotate: piece.rotation }}
            animate={{
              y: '110vh',
              opacity: [1, 1, 0],
              rotate: piece.rotation + 720,
              x: [0, (Math.random() - 0.5) * 120],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: piece.delay,
              ease: 'easeIn',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
