import type { Metadata } from 'next'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { LoadingProvider } from '@/components/LoadingContext'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AppointmentHero from '@/components/appointment/AppointmentHero'
import BookingFlow from '@/components/appointment/BookingFlow'
import VisitInfo from '@/components/appointment/VisitInfo'

export const metadata: Metadata = {
  title: 'Book an Appointment — Sona Dental & Maxillofacial Clinic, Delhi',
  description:
    'Reserve your visit at Sona Dental & Maxillofacial Clinic in Delhi. Choose your treatment, pick a time, and we confirm within two hours.',
}

export default function AppointmentPage() {
  return (
    <SmoothScrollProvider>
      <LoadingProvider>
        <LoadingScreen />
        <div className="page-frame">
          <Navbar />
          <main id="main-content">
            <AppointmentHero />
            <BookingFlow />
            <VisitInfo />
          </main>
          <Footer />
        </div>
      </LoadingProvider>
    </SmoothScrollProvider>
  )
}
