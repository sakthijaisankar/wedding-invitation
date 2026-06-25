import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface FadeInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  as?: 'div' | 'section' | 'article'
}

export function FadeInView({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as = 'div',
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()

  const offsets: Record<string, { x: number; y: number }> = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  }

  const offset = offsets[direction]

  const variants: Variants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }

  const motionProps = {
    ref,
    className,
    initial: 'hidden' as const,
    animate: isInView ? ('visible' as const) : ('hidden' as const),
    variants,
  }

  if (as === 'section') {
    return <motion.section {...motionProps}>{children}</motion.section>
  }
  if (as === 'article') {
    return <motion.article {...motionProps}>{children}</motion.article>
  }
  return <motion.div {...motionProps}>{children}</motion.div>
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      return true
    } catch {
      return false
    }
  }

  return { copied, copy }
}
