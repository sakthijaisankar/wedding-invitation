import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { FadeInView } from '../components/FadeInView'
import { DecorativeBorder } from '../components/DecorativeBorder'
import { RSVP_FORM_URL, WHATSAPP_NUMBER } from '../constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function RsvpSection() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const reducedMotion = useReducedMotion()

  const buildMessage = () =>
    `RSVP for Wedding Reception\nName: ${name}\nGuests: ${guests}\nMessage: ${message || '—'}`

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    if (RSVP_FORM_URL) {
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = RSVP_FORM_URL
      form.target = '_blank'

      const fields: Record<string, string> = {
        name: name.trim(),
        guests,
        message: message.trim(),
      }

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
    } else if (WHATSAPP_NUMBER) {
      const encoded = encodeURIComponent(buildMessage())
      const phone = WHATSAPP_NUMBER.replace(/\D/g, '')
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer')
    } else {
      const encoded = encodeURIComponent(buildMessage())
      window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener,noreferrer')
    }

    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="px-4 py-16 sm:py-20" aria-labelledby="rsvp-heading">
      <div className="mx-auto max-w-xl">
        <FadeInView>
          <DecorativeBorder className="bg-cream shadow-xl">
            <div className="text-center">
              <h2
                id="rsvp-heading"
                className="font-heading text-2xl font-bold text-maroon sm:text-3xl"
              >
                RSVP
              </h2>
              <p className="mt-2 font-body text-base text-dark/70">
                Kindly confirm your presence
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="rsvp-name" className="block font-body text-sm font-medium text-dark">
                  Name <span className="text-maroon">*</span>
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gold/40 bg-cream px-4 py-3 font-body text-dark transition-colors focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="rsvp-guests" className="block font-body text-sm font-medium text-dark">
                  Number of Guests
                </label>
                <select
                  id="rsvp-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gold/40 bg-cream px-4 py-3 font-body text-dark transition-colors focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="rsvp-message" className="block font-body text-sm font-medium text-dark">
                  Message
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-none rounded-lg border border-gold/40 bg-cream px-4 py-3 font-body text-dark transition-colors focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  placeholder="Wishes or special requests (optional)"
                />
              </div>

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-gold bg-maroon px-6 py-3.5 font-heading text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-maroon/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                whileHover={reducedMotion ? {} : { scale: 1.02 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
              >
                <Send size={18} aria-hidden="true" />
                Send RSVP
              </motion.button>

              {submitted && (
                <p className="text-center font-body text-sm text-maroon" role="status">
                  Thank you! Your RSVP has been sent.
                </p>
              )}
            </form>
          </DecorativeBorder>
        </FadeInView>
      </div>
    </section>
  )
}
