import { FadeInView } from '../components/FadeInView'
import { FloatingPetals } from '../components/FloatingPetals'
import { SafeImage } from '../components/SafeImage'
import { Sparkles } from '../components/FloatingHearts'
import { COUPLE, HERO_BG } from '../constants'
import { useImageExists } from '../hooks/useImageExists'

export function HeroSection() {
  const heroBgExists = useImageExists(HERO_BG)
  const groomExists = useImageExists(COUPLE.groom.image)
  const brideExists = useImageExists(COUPLE.bride.image)
  const showPhotos = groomExists || brideExists

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 py-16 sm:py-24"
      aria-labelledby="hero-heading"
    >
      {heroBgExists && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden="true"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-cream"
        aria-hidden="true"
      />

      <FloatingPetals count={10} />
      <Sparkles count={10} />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <FadeInView delay={0.1}>
          <p className="font-calligraphy text-4xl text-maroon sm:text-5xl md:text-6xl">
            Sri Murugan Thunai
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <h1
            id="hero-heading"
            className="mt-4 font-heading text-2xl font-bold tracking-wide text-maroon sm:text-3xl md:text-4xl"
          >
            Wedding Reception Invitation
          </h1>
        </FadeInView>

        <FadeInView delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-dark/85 sm:text-xl">
            Solicit your gracious presence with family and friends on the occasion of the
            reception of our son.
          </p>
        </FadeInView>

        {showPhotos && (
          <FadeInView delay={0.4} className="mt-10">
            <div className="flex items-end justify-center gap-4 sm:gap-8">
              {groomExists !== false && (
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-gold to-maroon/40 opacity-70 blur-sm transition-opacity group-hover:opacity-100" />
                  <SafeImage
                    src={COUPLE.groom.image}
                    alt="Groom J. Suriya"
                    className="relative h-44 w-36 rounded-2xl border-2 border-gold object-cover object-top shadow-xl sm:h-56 sm:w-44"
                    fallback={
                      <div className="relative flex h-44 w-36 items-center justify-center rounded-2xl border-2 border-gold bg-maroon/10 font-heading text-sm text-maroon sm:h-56 sm:w-44">
                        Groom
                      </div>
                    }
                  />
                </div>
              )}
              {groomExists && brideExists && (
                <span className="mb-8 text-2xl text-maroon" aria-hidden="true">
                  &
                </span>
              )}
              {brideExists !== false && (
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-gold to-maroon/40 opacity-70 blur-sm transition-opacity group-hover:opacity-100" />
                  <SafeImage
                    src={COUPLE.bride.image}
                    alt="Bride J. Juhi Yahana"
                    className="relative h-44 w-36 rounded-2xl border-2 border-gold object-cover object-top shadow-xl sm:h-56 sm:w-44"
                    fallback={
                      <div className="relative flex h-44 w-36 items-center justify-center rounded-2xl border-2 border-gold bg-maroon/10 font-heading text-sm text-maroon sm:h-56 sm:w-44">
                        Bride
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </FadeInView>
        )}
      </div>
    </section>
  )
}
