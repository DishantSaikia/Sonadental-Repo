import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, Great_Vibes } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-syne',   // same CSS variable — no component changes needed
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-signature',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sona Dental & Maxillofacial Clinic — Shahdara, Delhi',
  description:
    'Established in 1994, Sona Dental & Maxillofacial Clinic in Shahdara, Delhi offers family dentistry, root canal treatment, dental implants, orthodontic care, cosmetic dentistry and oral and maxillofacial surgery.',
  keywords:
    'dental clinic Shahdara Delhi, maxillofacial surgery Delhi, dental implants, root canal treatment, cosmetic dentistry, orthodontics, oral surgery Delhi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${dmSans.variable} ${greatVibes.variable} antialiased`}>{children}</body>
    </html>
  )
}
