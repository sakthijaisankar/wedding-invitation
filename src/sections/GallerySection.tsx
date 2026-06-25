import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { FadeInView } from '../components/FadeInView'
import { SafeImage } from '../components/SafeImage'
import { GALLERY_IMAGES } from '../constants'
import { useImagesExist } from '../hooks/useImageExists'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function GallerySection() {
  const imagesExist = useImagesExist(GALLERY_IMAGES.map((img) => img.src))
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_IMAGES.length,
    )
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    )
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) goNext()
    else if (info.offset.x > threshold) goPrev()
  }

  if (imagesExist === false) return null

  return (
    <section id="gallery" className="px-4 py-16 sm:py-20" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-5xl">
        <FadeInView className="mb-10 text-center">
          <h2
            id="gallery-heading"
            className="font-heading text-2xl font-bold text-maroon sm:text-3xl"
          >
            Our Moments
          </h2>
          <p className="mt-2 font-body text-base text-dark/70">
            Tap to view · Swipe in lightbox
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {GALLERY_IMAGES.map((image, index) => (
            <FadeInView key={image.src} delay={index * 0.1}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative w-full overflow-hidden rounded-xl border border-gold/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                aria-label={`View ${image.alt}`}
              >
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-maroon/0 transition-colors group-hover:bg-maroon/30">
                  <ZoomIn
                    className="text-cream opacity-0 transition-opacity group-hover:opacity-100"
                    size={32}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </FadeInView>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 rounded-full bg-cream/10 p-2 text-cream transition-colors hover:bg-cream/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="absolute left-2 z-10 hidden rounded-full bg-cream/10 p-2 text-cream sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="absolute right-2 z-10 hidden rounded-full bg-cream/10 p-2 text-cream sm:block"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={lightboxIndex}
              className="max-h-[85vh] max-w-4xl touch-pan-y"
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={GALLERY_IMAGES[lightboxIndex]!.src}
                alt={GALLERY_IMAGES[lightboxIndex]!.alt}
                className="max-h-[85vh] w-full rounded-lg object-contain"
              />
            </motion.div>

            <p className="absolute bottom-4 font-body text-sm text-cream/70">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
