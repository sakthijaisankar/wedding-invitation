export const GOOGLE_MAP_URL: string = 'PASTE_GOOGLE_MAP_LINK_HERE'
export const RSVP_FORM_URL: string = ''
export const WHATSAPP_NUMBER: string = ''

export const EVENT_DATE = new Date('2026-07-05T18:00:00+05:30')
export const COUNTDOWN_DATE = new Date('2026-07-05T18:00:00+05:30')

export const COUPLE = {
  groom: {
    honorific: 'Selvan.',
    name: 'J. Suriya',
    qualifications: 'B.A., MBA.',
    profession: 'Success Guide at Salesforce',
    image: '/assets/images/groom.jpeg',
  },
  bride: {
    honorific: 'Selvi.',
    name: 'J. Juhi Yahana',
    qualifications: 'B.E., MBA.',
    profession: 'Senior Analyst at Accenture',
    image: '/assets/images/bride.jpeg',
  },
} as const

export const EVENT = {
  day: 'Sunday the 5th July 2026',
  title: 'Reception',
  time: '6:00 PM – 7:30 PM onwards',
  venue: 'Shanthi Mahal',
  address: [
    'No.109, New Bye Pass Road,',
    'Near GRT Hotel,',
    'Green Circle,',
    'Vellore – 632004.',
  ],
  locationShort: 'Shanthi Mahal, Vellore.',
} as const

export const GALLERY_IMAGES = [
  { src: '/assets/images/gallery1.jpg', alt: 'Wedding gallery photo 1' },
  { src: '/assets/images/gallery2.jpg', alt: 'Wedding gallery photo 2' },
  { src: '/assets/images/gallery3.jpg', alt: 'Wedding gallery photo 3' },
] as const

export const MUSIC_SRC = '/assets/audio/music.mp3'
export const HERO_BG = '/assets/images/hero-bg.jpg'
export const FLORAL_BORDER = '/assets/images/floral-border.png'

export const CALENDAR_EVENT = {
  title: 'Wedding Reception of J. Suriya & J. Juhi Yahana',
  date: '5 July 2026',
  time: '6:00 PM',
  location: EVENT.locationShort,
} as const

export const COLORS = {
  maroon: '#800020',
  gold: '#D4AF37',
  cream: '#FFF8F0',
  dark: '#2B2B2B',
} as const
