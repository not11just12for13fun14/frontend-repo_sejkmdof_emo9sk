import React from 'react'
import { Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

const colors = {
  offBlack: '#212629',
  heritageBlue: '#2E4F5F',
  sun: '#FFAB40',
  thunderGrey: '#78909C',
  white: '#FFFFFF'
}

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{ backgroundColor: colors.offBlack }}>
      <div className="absolute inset-0" aria-hidden>
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#212629]/60 to-[#212629] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>
            Sprint Packages for High‑Velocity Teams
          </h1>
          <p className="mt-4 text-[#78909C] text-lg" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>
            Choose a plan, schedule your sprint, and get a certified facilitator with a proven playbook.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="#pricing" className="inline-flex items-center justify-center px-5 py-3 rounded-xl" style={{ backgroundColor: colors.sun, color: colors.offBlack, fontFamily: 'Lexend Deca, Inter, sans-serif', fontWeight: 700 }}>
              View Pricing
            </Link>
            <Link to="/checkout" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border" style={{ borderColor: colors.sun, color: colors.white, fontFamily: 'Lexend Deca, Inter, sans-serif' }}>
              Book a Sprint
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const plans = [
  {
    id: 'starter',
    name: 'Sprint Starter',
    price: 1500,
    participants: 'Up to 12 participants',
    features: [
      '1-day design sprint',
      'Certified facilitator',
      'Workshop materials',
      'Post-sprint summary'
    ]
  },
  {
    id: 'team',
    name: 'Team Development',
    price: 2800,
    participants: 'Up to 24 participants',
    features: [
      '2-day immersive sprint',
      'Advanced playbooks',
      'Team retrospectives',
      'Follow-up coaching'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Excellence',
    price: null,
    participants: '50+ participants',
    features: [
      'Custom multi-team program',
      'Exec alignment workshops',
      'Dedicated success manager',
      'Onsite + virtual options'
    ]
  }
]

function PricingCard({ plan }) {
  return (
    <div className="group relative rounded-2xl p-6 md:p-8 transition-transform duration-300" style={{ backgroundColor: colors.heritageBlue, boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 0 2px #FFAB40, 0 10px 40px rgba(255,171,64,0.25)' }} aria-hidden />
      <div className="relative">
        <h3 className="text-white text-2xl font-semibold" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>{plan.name}</h3>
        <p className="mt-1 text-[#78909C]" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>{plan.participants}</p>
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-white font-bold" style={{ fontSize: 48, fontFamily: 'Lexend Deca, Inter, sans-serif' }}>
            {plan.price ? `$${plan.price.toLocaleString()}` : 'Custom'}
          </span>
          {plan.price && <span className="text-[#78909C]">USD</span>}
        </div>
        <ul className="mt-6 space-y-3">
          {plan.features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="inline-flex w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,171,64,0.4)' }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.sun }} />
              </span>
              <span className="text-white/90" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link to={`/checkout?package=${plan.id}`} className="inline-flex w-full items-center justify-center px-5 py-3 rounded-xl font-semibold transition-transform duration-200 hover:scale-[1.02]" style={{ backgroundColor: colors.sun, color: colors.offBlack, fontFamily: 'Lexend Deca, Inter, sans-serif' }}>
            Select Package
          </Link>
        </div>
      </div>
    </div>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="relative py-16 md:py-24" style={{ backgroundColor: colors.offBlack }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>Pricing</h2>
          <p className="text-[#78909C] mt-2" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>Transparent plans designed for different team sizes.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map(p => <PricingCard key={p.id} plan={p} />)}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.offBlack }}>
      <Hero />
      <PricingSection />
    </div>
  )
}

export default App
