import { Share2, Link2, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeInView, useCopyToClipboard } from '../components/FadeInView'
import { WHATSAPP_NUMBER } from '../constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ShareSection() {
  const reducedMotion = useReducedMotion()
  const { copied, copy } = useCopyToClipboard()
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = 'You are invited to the Wedding Reception of J. Suriya & J. Juhi Yahana — 5 July 2026'

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(`${shareText}\n${shareUrl}`)
    if (WHATSAPP_NUMBER) {
      const phone = WHATSAPP_NUMBER.replace(/\D/g, '')
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer')
    } else {
      window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCopyLink = () => {
    void copy(shareUrl)
  }

  const handleNativeShare = async () => {
    if (!navigator.share) return
    try {
      await navigator.share({
        title: 'Wedding Reception Invitation',
        text: shareText,
        url: shareUrl,
      })
    } catch {
      /* user cancelled */
    }
  }

  const supportsNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  const buttonClass =
    'inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-cream px-5 py-2.5 font-heading text-xs font-semibold tracking-wider text-maroon uppercase transition-colors hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

  return (
    <section id="share" className="px-4 py-12 sm:py-16" aria-labelledby="share-heading">
      <div className="mx-auto max-w-lg text-center">
        <FadeInView>
          <h2
            id="share-heading"
            className="font-heading text-xl font-bold text-maroon sm:text-2xl"
          >
            Share The Joy
          </h2>
          <p className="mt-2 font-body text-sm text-dark/70">
            Spread the word with family and friends
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <motion.button
              type="button"
              onClick={handleWhatsApp}
              className={buttonClass}
              whileHover={reducedMotion ? {} : { scale: 1.03 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </motion.button>

            <motion.button
              type="button"
              onClick={handleCopyLink}
              className={buttonClass}
              whileHover={reducedMotion ? {} : { scale: 1.03 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
              aria-live="polite"
            >
              <Link2 size={16} aria-hidden="true" />
              {copied ? 'Copied!' : 'Copy Link'}
            </motion.button>

            {supportsNativeShare && (
              <motion.button
                type="button"
                onClick={() => void handleNativeShare()}
                className={buttonClass}
                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
              >
                <Share2 size={16} aria-hidden="true" />
                Share
              </motion.button>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
