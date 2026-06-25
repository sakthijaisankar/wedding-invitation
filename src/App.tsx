import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Confetti } from './components/Confetti'
import { FloatingPetals } from './components/FloatingPetals'
import { MusicControls } from './components/MusicControls'
import { OpeningScreen } from './components/OpeningScreen'
import { useMusic } from './hooks/useMusic'
import { HeroSection } from './sections/HeroSection'
import { CoupleSection } from './sections/CoupleSection'
import { CountdownSection } from './sections/CountdownSection'
import { EventDetailsSection } from './sections/EventDetailsSection'
import { MapsSection } from './sections/MapsSection'
import { GallerySection } from './sections/GallerySection'
// import { RsvpSection } from './sections/RsvpSection'
import { CalendarSection } from './sections/CalendarSection'
import { ShareSection } from './sections/ShareSection'
import { FooterSection } from './sections/FooterSection'
import { InvitationCard } from './components/InvitationCard'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const music = useMusic()

  const handleOpenInvitation = () => {
    setIsOpen(true)
    setShowConfetti(true)
    void music.play()
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen && <OpeningScreen key="opening" onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      {isOpen && (
        <div className="relative min-h-screen bg-cream text-dark">
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-maroon focus:px-4 focus:py-2 focus:text-cream"
          >
            Skip to content
          </a>

          <FloatingPetals count={8} className="fixed inset-0 z-0 opacity-40" />

          <main className="relative z-10">
            <HeroSection />
            <CoupleSection />
            <InvitationCard />
            <CountdownSection />
            <EventDetailsSection />
            <MapsSection />
            <GallerySection />
            {/* <RsvpSection /> */}
            <CalendarSection />
            <ShareSection />
            <FooterSection />
          </main>

          <MusicControls
            isPlaying={music.isPlaying}
            isMuted={music.isMuted}
            onTogglePlay={music.togglePlay}
            onToggleMute={music.toggleMute}
          />
        </div>
      )}

      <Confetti active={showConfetti} />
    </>
  )
}
