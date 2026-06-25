import { motion } from 'framer-motion'
import { FadeInView } from '../components/FadeInView'
import { FloralDivider } from '../components/FloralDivider'
import { FloatingHearts } from '../components/FloatingHearts'
import { COUPLE } from '../constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

function PersonCard({
  honorific,
  name,
  qualifications,
  profession,
  align,
}: {
  honorific: string
  name: string
  qualifications: string
  profession: string
  align: 'left' | 'right'
}) {
  return (
    <div className={`text-center ${align === 'left' ? 'sm:text-right' : 'sm:text-left'}`}>
      <p className="font-calligraphy text-2xl text-gold sm:text-3xl">{honorific}</p>
      <h3 className="mt-2 font-heading text-xl font-bold text-maroon sm:text-2xl">{name}</h3>
      <p className="mt-1 font-body text-base text-dark/80">{qualifications}</p>
      <p className="mt-1 font-body text-sm italic text-dark/60">{profession}</p>
    </div>
  )
}

export function CoupleSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="couple" className="relative px-4 py-16 sm:py-20" aria-labelledby="couple-heading">
      <FloatingHearts count={5} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <FadeInView>
          <FloralDivider />
          <h2 id="couple-heading" className="sr-only">
            The Couple
          </h2>
        </FadeInView>

        <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-6">
          <FadeInView direction="left" delay={0.1}>
            <PersonCard
              honorific={COUPLE.groom.honorific}
              name={COUPLE.groom.name}
              qualifications={COUPLE.groom.qualifications}
              profession={COUPLE.groom.profession}
              align="left"
            />
          </FadeInView>
          <FadeInView direction="right" delay={0.2}>
            <PersonCard
              honorific={COUPLE.bride.honorific}
              name={COUPLE.bride.name}
              qualifications={COUPLE.bride.qualifications}
              profession={COUPLE.bride.profession}
              align="right"
            />
          </FadeInView>
        </div>

        <FadeInView delay={0.4} className="mt-12">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <motion.span
              className="font-heading text-2xl font-semibold text-maroon sm:text-3xl"
              initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {COUPLE.groom.name}
            </motion.span>

            <motion.span
              className="text-3xl text-maroon"
              aria-label="and"
              animate={
                reducedMotion
                  ? {}
                  : { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.span>

            <motion.span
              className="font-heading text-2xl font-semibold text-maroon sm:text-3xl"
              initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {COUPLE.bride.name}
            </motion.span>
          </div>
        </FadeInView>

        <FadeInView delay={0.5}>
          <FloralDivider />
        </FadeInView>
      </div>
    </section>
  )
}
