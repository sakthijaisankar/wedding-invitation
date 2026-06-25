import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const PETAL_COLORS = ['#D4AF37', '#800020', '#F5D0A9', '#C9A227', '#E8B4B8']

interface FloatingPetalsProps {
  count?: number
  className?: string
}

export function FloatingPetals({ count = 12, className = '' }: FloatingPetalsProps) {
  const reducedMotion = useReducedMotion()

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        size: 8 + Math.random() * 10,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]!,
        sway: 20 + Math.random() * 40,
      })),
    [count],
  )

  if (reducedMotion) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: petal.left,
            top: '-5%',
            width: petal.size,
            height: petal.size * 1.4,
            backgroundColor: petal.color,
            borderRadius: '50% 0 50% 50%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, petal.sway, -petal.sway / 2, petal.sway / 3],
            rotate: [0, 180, 360],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
