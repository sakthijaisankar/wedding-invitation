import { CalendarPlus, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeInView } from '../components/FadeInView'
import { CALENDAR_EVENT, EVENT_DATE } from '../constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

function generateICS(): string {
  const formatDate = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')

  const start = EVENT_DATE
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Reception//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${CALENDAR_EVENT.title}`,
    `LOCATION:${CALENDAR_EVENT.location}`,
    `DESCRIPTION:Wedding Reception at ${CALENDAR_EVENT.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return lines.join('\r\n')
}

function downloadICS() {
  const blob = new Blob([generateICS()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'wedding-reception.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function CalendarSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="calendar" className="px-4 py-12 sm:py-16" aria-labelledby="calendar-heading">
      <div className="mx-auto max-w-md text-center">
        <FadeInView>
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/5 to-maroon/5 p-8">
            <CalendarPlus className="mx-auto text-maroon" size={32} aria-hidden="true" />
            <h2
              id="calendar-heading"
              className="mt-4 font-heading text-xl font-bold text-maroon"
            >
              Add To Calendar
            </h2>
            <p className="mt-2 font-body text-sm text-dark/70">
              {CALENDAR_EVENT.date} · {CALENDAR_EVENT.time}
            </p>
            <p className="font-body text-sm text-dark/60">{CALENDAR_EVENT.location}</p>

            <motion.button
              type="button"
              onClick={downloadICS}
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-gold bg-maroon px-6 py-3 font-heading text-xs font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-maroon/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              whileHover={reducedMotion ? {} : { scale: 1.03 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              <Download size={16} aria-hidden="true" />
              Download Event
            </motion.button>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
