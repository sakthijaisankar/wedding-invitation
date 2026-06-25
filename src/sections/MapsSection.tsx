import { MapPin, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeInView } from '../components/FadeInView'
import { GOOGLE_MAP_URL, EVENT } from '../constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function MapsSection() {
  const reducedMotion = useReducedMotion()
  const hasValidUrl =
    GOOGLE_MAP_URL && GOOGLE_MAP_URL !== 'PASTE_GOOGLE_MAP_LINK_HERE'

  const handleDirections = () => {
    if (hasValidUrl) {
      window.open(GOOGLE_MAP_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="directions" className="px-4 py-16 sm:py-20" aria-labelledby="directions-heading">
      <div className="mx-auto max-w-2xl text-center">
        <FadeInView>
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-maroon/5 to-gold/10 p-8 sm:p-10">
            <MapPin className="mx-auto text-maroon" size={36} aria-hidden="true" />
            <h2
              id="directions-heading"
              className="mt-4 font-heading text-xl font-bold text-maroon sm:text-2xl"
            >
              Find Your Way To Us
            </h2>
            <p className="mt-3 font-body text-base text-dark/75">
              {EVENT.venue}, Vellore
            </p>

            <motion.button
              type="button"
              onClick={handleDirections}
              disabled={!hasValidUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-gold bg-maroon px-8 py-3 font-heading text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-maroon/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50"
              whileHover={reducedMotion || !hasValidUrl ? {} : { scale: 1.03 }}
              whileTap={reducedMotion || !hasValidUrl ? {} : { scale: 0.98 }}
              aria-describedby={!hasValidUrl ? 'map-url-hint' : undefined}
            >
              <Navigation size={18} aria-hidden="true" />
              Get Directions
            </motion.button>

            {!hasValidUrl && (
              <p id="map-url-hint" className="mt-3 font-body text-sm text-dark/50">
                Add your Google Maps link in{' '}
                <code className="rounded bg-maroon/5 px-1 text-maroon">GOOGLE_MAP_URL</code>
              </p>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
