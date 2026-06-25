import { FadeInView } from './FadeInView'
import { LotusIcon } from './LotusIcon'
import { INVITATION } from '../constants'

export function InvitationCard() {
  return (
    <FadeInView delay={0.2} className="mx-auto w-full max-w-lg">
      <div
        className="rounded-3xl p-4 sm:p-6"
        style={{
          background:
            'linear-gradient(135deg, #eef4fb 0%, #fdf2f8 45%, #f3e8ff 100%)',
        }}
      >
        <div className="relative rounded-2xl border-2 border-gold/80 bg-white/95 px-6 py-10 shadow-lg shadow-maroon/5 sm:px-10 sm:py-12">
          <div
            className="absolute -top-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-lg border border-gold/40 bg-white shadow-md"
            aria-hidden="true"
          >
            <LotusIcon />
          </div>

          <div className="space-y-5 text-center">
            <p className="pt-2 font-body text-lg italic text-[#c2185b] sm:text-xl">
              — {INVITATION.blessing} —
            </p>

            <div className="space-y-2">
              <p className="font-body text-base leading-relaxed text-[#1a237e] sm:text-lg">
                {INVITATION.divineIntro}
              </p>
              <p className="font-body text-sm leading-relaxed text-dark/65 sm:text-base">
                {INVITATION.divineSubtext}
              </p>
            </div>

            <p className="font-heading text-xl font-bold text-[#1a237e] sm:text-2xl">
              {INVITATION.host}
            </p>

            <div className="space-y-3 font-body text-sm leading-relaxed text-dark/75 sm:text-base">
              <p>{INVITATION.familyLine}</p>
              {INVITATION.inviteLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeInView>
  )
}
