import { FadeInView } from '../components/FadeInView'
import { FloralDivider } from '../components/FloralDivider'

export function FooterSection() {
  return (
    <footer className="px-4 py-12 pb-24 sm:py-16 sm:pb-28" role="contentinfo">
      <FadeInView className="mx-auto max-w-lg text-center">
        <FloralDivider />
        <p className="mt-4 font-body text-base text-dark/70">With Best Compliments From</p>
        <p className="mt-2 font-calligraphy text-3xl text-maroon sm:text-4xl">
          Friends & Relatives
        </p>
        <FloralDivider />
        <p className="mt-6 font-body text-xs text-dark/45">
          © {new Date().getFullYear()} J. Suriya & J. Juhi Yahana
        </p>
      </FadeInView>
    </footer>
  )
}
