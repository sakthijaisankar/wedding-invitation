import { FadeInView } from '../components/FadeInView'
import { DecorativeBorder } from '../components/DecorativeBorder'
import { FloralDivider } from '../components/FloralDivider'
import { EVENT } from '../constants'

export function EventDetailsSection() {
  return (
    <section id="event" className="px-4 py-16 sm:py-20" aria-labelledby="event-heading">
      <div className="mx-auto max-w-2xl">
        <FadeInView>
          <DecorativeBorder className="bg-cream shadow-2xl shadow-maroon/10">
            <div className="text-center">
              <FloralDivider />

              <p className="font-body text-lg text-dark/80 sm:text-xl">On {EVENT.day}</p>

              <h2
                id="event-heading"
                className="mt-6 font-heading text-2xl font-bold tracking-wider text-maroon sm:text-3xl"
              >
                {EVENT.title}
              </h2>

              <p className="mt-3 font-calligraphy text-3xl text-gold sm:text-4xl">{EVENT.time}</p>

              <div className="my-8 flex items-center justify-center gap-3" aria-hidden="true">
                <span className="h-px w-16 bg-gold/50" />
                <span className="font-body text-sm tracking-widest text-maroon/60 uppercase">at</span>
                <span className="h-px w-16 bg-gold/50" />
              </div>

              <h3 className="font-heading text-xl font-bold text-maroon sm:text-2xl">{EVENT.venue}</h3>

              <address className="mt-4 space-y-1 font-body text-base not-italic leading-relaxed text-dark/80 sm:text-lg">
                {EVENT.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <FloralDivider />
            </div>
          </DecorativeBorder>
        </FadeInView>
      </div>
    </section>
  )
}
