import Countdown from 'react-countdown'
import { motion } from 'framer-motion'
import { FadeInView } from '../components/FadeInView'
import { DecorativeBorder } from '../components/DecorativeBorder'
import { COUNTDOWN_DATE } from '../constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TimeBlockProps {
  value: number
  label: string
  index: number
}

function TimeBlock({ value, label, index }: TimeBlockProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-gold/40 bg-cream px-3 py-4 shadow-md sm:min-w-[5.5rem] sm:px-4 sm:py-5"
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={reducedMotion ? {} : { y: -4, boxShadow: '0 8px 24px rgba(128,0,32,0.15)' }}
    >
      <span className="font-heading text-3xl font-bold text-maroon tabular-nums sm:text-4xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-body text-xs tracking-widest text-dark/60 uppercase sm:text-sm">
        {label}
      </span>
    </motion.div>
  )
}

export function CountdownSection() {
  return (
    <section id="countdown" className="px-4 py-16 sm:py-20" aria-labelledby="countdown-heading">
      <div className="mx-auto max-w-3xl">
        <FadeInView>
          <DecorativeBorder className="bg-gradient-to-br from-cream to-gold/5 shadow-xl">
            <div className="text-center">
              <h2
                id="countdown-heading"
                className="font-heading text-xl font-bold tracking-wide text-maroon sm:text-2xl"
              >
                Counting Down To Our Special Day
              </h2>
              <p className="mt-2 font-body text-base text-dark/70">5 July 2026</p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
                <Countdown
                  date={COUNTDOWN_DATE}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      return (
                        <p className="font-calligraphy text-3xl text-maroon">
                          The celebration has begun!
                        </p>
                      )
                    }
                    return (
                      <>
                        <TimeBlock value={days} label="Days" index={0} />
                        <TimeBlock value={hours} label="Hours" index={1} />
                        <TimeBlock value={minutes} label="Minutes" index={2} />
                        <TimeBlock value={seconds} label="Seconds" index={3} />
                      </>
                    )
                  }}
                />
              </div>
            </div>
          </DecorativeBorder>
        </FadeInView>
      </div>
    </section>
  )
}
