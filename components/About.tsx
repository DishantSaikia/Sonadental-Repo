'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const faqs = [
  {
    q: 'Does root canal treatment hurt?',
    a: 'Modern root canal treatment is performed under local anaesthesia and is no more uncomfortable than a routine filling. Most patients are surprised by how painless it is. Any mild soreness afterwards typically resolves within a day or two.',
  },
  {
    q: 'How often should I visit the dentist?',
    a: 'We recommend a check-up every six months for most patients. Those with gum disease or a higher cavity risk may benefit from more frequent visits — your dentist will advise the right schedule for you.',
  },
  {
    q: 'What is recovery like after a tooth extraction?',
    a: 'Most patients are comfortable within 2–3 days. The socket heals fully over a few weeks. We provide detailed aftercare instructions to minimise discomfort and speed recovery.',
  },
  {
    q: 'Are dental implants a long-term solution?',
    a: 'Yes — implants are the gold standard for tooth replacement. With proper care they can last a lifetime. Dr. Shubham Aggarwal specialises in implant placement and will assess your suitability at consultation.',
  },
  {
    q: 'Is teeth whitening safe?',
    a: 'Professional whitening carried out under dental supervision is safe and effective. We assess your enamel health before recommending any whitening treatment to ensure the best outcome with no sensitivity.',
  },
]

function FAQItem({
  q, a, index, sectionInView,
}: { q: string; a: string; index: number; sectionInView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-white/10 last:border-b-0"
      initial={{ opacity: 0, y: 18 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay: 0.45 + index * 0.09 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-[18px] text-left group focus-visible:outline-none"
      >
        <span className="font-display font-bold text-white/80 text-[14.5px] leading-snug group-hover:text-white transition-colors duration-200">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.32, ease }}
          className="shrink-0 w-[26px] h-[26px] rounded-full border border-white/18 flex items-center justify-center text-white/45 group-hover:border-white/35 group-hover:text-white/75 transition-colors duration-200"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease }}
            className="overflow-hidden"
          >
            <p className="font-body text-[13.5px] leading-[1.82] pb-5 pr-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const textInView = useInView(textRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-navy-dark">
        <motion.div className="w-full h-full" style={{ scale: imgScale, willChange: 'transform' }}>
          <img
            src="/clinic-interior-chair.jpeg"
            alt=""
            className="w-full h-full object-cover object-[69%_46%] md:object-[center_48%]"
            style={{
              filter: 'saturate(1) contrast(1.01) brightness(0.97)',
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(4,10,28,0.84) 0%, rgba(7,17,46,0.66) 36%, rgba(7,17,46,0.34) 64%, rgba(4,10,28,0.46) 100%), linear-gradient(180deg, rgba(4,10,28,0.36) 0%, rgba(4,10,28,0.08) 44%, rgba(4,10,28,0.62) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(75,150,232,0.10) 0%, transparent 28%), radial-gradient(circle at 78% 76%, rgba(120,224,212,0.06) 0%, transparent 26%)',
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[58%] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(4,10,28,0.38) 0%, rgba(4,10,28,0.14) 62%, transparent 100%)',
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-0 h-px opacity-40"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(187,220,255,0.55), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-35"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(187,220,255,0.45), transparent)' }}
      />

      <div className="absolute top-10 right-10 text-white/30 text-[11px] font-body tracking-[0.22em] uppercase hidden md:block">
        About Us
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-24 md:py-36 flex flex-col justify-between min-h-[80vh]">

        {/* Two-column main body */}
        <div ref={textRef} className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-24 items-start">

          {/* Left — existing content */}
          <div>
            <motion.h2
              className="font-display font-extrabold text-white leading-[1.05] text-[clamp(2.4rem,5.5vw,4.8rem)] mb-8"
              style={{ letterSpacing: '-0.022em' }}
              initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
              animate={textInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.3, ease }}
            >
              Serving generations.{' '}
              <br className="hidden sm:block" />
              Compassionate dental care since 1994.
            </motion.h2>

            <motion.p
              className="text-white/70 font-body text-[15px] leading-[1.8] max-w-[480px]"
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={textInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
            >
              With a legacy of dental care spanning over 30 years, Dr. Rajesh Aggarwal and
              Dr. Shalini Aggarwal have been serving the community since 1994. Their extensive
              experience, gentle approach and commitment to patient well-being continue to make
              them trusted names in dentistry. Dr. Shubham Aggarwal brings modern oral and
              maxillofacial surgical training to the clinic, supporting dental implants, wisdom
              tooth extractions, jaw fracture management and other oral surgical procedures.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.45 }}
            >
              <a
                href="/appointment"
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold font-body text-sm rounded-full px-6 py-3 hover:bg-[#1d52b0] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light"
              >
                Book a consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-white/25 text-white/80 font-body text-sm rounded-full px-6 py-3 hover:bg-white/10 transition-colors duration-300"
              >
                Our services →
              </a>
            </motion.div>
          </div>

          {/* Right — FAQs */}
          <div className="lg:pt-2">
            <motion.p
              className="text-[11px] font-body font-semibold tracking-[0.22em] uppercase text-brand-light/70 mb-3"
              initial={{ opacity: 0, y: 14 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              Common Questions
            </motion.p>
            <motion.h3
              className="font-display font-extrabold text-white text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.12] mb-8"
              style={{ letterSpacing: '-0.018em' }}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={textInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, ease, delay: 0.35 }}
            >
              Answers to your dental questions
            </motion.h3>

            <div
              className="rounded-[22px] border border-brand-light/18 px-6 py-1 relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.085) 0%, rgba(255,255,255,0.035) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(75,150,232,0.12) 0%, transparent 48%), radial-gradient(circle at 88% 10%, rgba(255,255,255,0.10) 0%, transparent 28%)',
                }}
              />
              <div className="relative">
                {faqs.map((faq, i) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} sectionInView={inView} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
