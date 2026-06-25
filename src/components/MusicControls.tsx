import { motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MusicControlsProps {
  isPlaying: boolean
  isMuted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
}

export function MusicControls({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}: MusicControlsProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className="fixed right-4 bottom-4 z-40 flex flex-col gap-2 sm:right-6 sm:bottom-6"
      role="group"
      aria-label="Music controls"
    >
      <motion.button
        type="button"
        onClick={onTogglePlay}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-maroon text-cream shadow-lg shadow-maroon/30 transition-colors hover:bg-maroon/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        whileHover={reducedMotion ? {} : { scale: 1.08 }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
      >
        {isPlaying ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
      </motion.button>
      <motion.button
        type="button"
        onClick={onToggleMute}
        className="flex h-10 w-10 items-center justify-center self-end rounded-full border border-gold/40 bg-cream/95 text-maroon shadow-md backdrop-blur-sm transition-colors hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        whileHover={reducedMotion ? {} : { scale: 1.08 }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
      >
        {isMuted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
      </motion.button>
    </div>
  )
}
