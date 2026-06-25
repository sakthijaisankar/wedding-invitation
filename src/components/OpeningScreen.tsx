import { motion } from 'framer-motion'
import { DecorativeBorder } from './DecorativeBorder'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface OpeningScreenProps {
  onOpen: () => void
}

export function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-maroon p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.8 }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #D4AF37 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, #D4AF37 1px, transparent 1px),
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(212,175,55,0.08) 20px, rgba(212,175,55,0.08) 22px)
          `,
          backgroundSize: '60px 60px, 60px 60px, auto',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative w-full max-w-md"
        initial={reducedMotion ? {} : { scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <DecorativeBorder className="bg-cream shadow-2xl shadow-black/30">
          <div className="text-center">
            <p className="font-calligraphy text-3xl text-maroon sm:text-4xl">ஸ்ரீ முருகன் துணை</p>
            <div className="my-4 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-px w-12 bg-gold/60" />
              <span className="text-gold">✦</span>
              <span className="h-px w-12 bg-gold/60" />
            </div>
            <h1 className="font-heading text-xl font-bold tracking-wide text-maroon sm:text-2xl">
              Wedding Reception Invitation
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-dark/80">
              You are cordially invited to celebrate with us
            </p>
            <motion.button
              type="button"
              onClick={onOpen}
              className="mt-8 w-full rounded-full border-2 border-gold bg-maroon px-8 py-3.5 font-heading text-sm font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-maroon/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              whileHover={reducedMotion ? {} : { scale: 1.03 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              Open Invitation
            </motion.button>
          </div>
        </DecorativeBorder>
      </motion.div>
    </motion.div>
  )
}
