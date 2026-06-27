import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { LoadingProvider } from '@/components/LoadingContext'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Services from '@/components/Services'
import Specialists from '@/components/Specialists'
import Treatments from '@/components/Treatments'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <LoadingProvider>
      <LoadingScreen />
      <div className="page-frame">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Stats />
          <About />
          <Services />
          <Specialists />
          <Treatments />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      </LoadingProvider>
    </SmoothScrollProvider>
  )
}
