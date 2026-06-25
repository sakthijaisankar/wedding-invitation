import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface FloatingHeartsProps {
  count?: number
}

export function FloatingHearts({ count = 6 }: FloatingHeartsProps) {
  const reducedMotion = useReducedMotion()

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
        size: 14 + Math.random() * 12,
      })),
    [count],
  )

  if (reducedMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-maroon/30"
          style={{ left: heart.left, bottom: '10%', fontSize: heart.size }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.1, 0.9],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}

interface SparklesProps {
  count?: number
}

export function Sparkles({ count = 8 }: SparklesProps) {
  const reducedMotion = useReducedMotion()

  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${10 + Math.random() * 80}%`,
        left: `${5 + Math.random() * 90}%`,
        delay: Math.random() * 3,
        size: 4 + Math.random() * 6,
      })),
    [count],
  )

  if (reducedMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-gold"
          style={{ top: s.top, left: s.left, fontSize: s.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2 + Math.random(),
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}
