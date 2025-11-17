import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const colors = {
  offBlack: '#212629',
  heritageBlue: '#2E4F5F',
  sun: '#FFAB40',
  thunderGrey: '#78909C',
  white: '#FFFFFF'
}

export default function Confirmation() {
  const params = new URLSearchParams(useLocation().search)
  const order = params.get('order')
  const total = params.get('total')

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: colors.offBlack }}>
      <div className="w-full max-w-xl rounded-2xl p-8 text-center" style={{ backgroundColor: colors.heritageBlue }}>
        <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255,171,64,0.4)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L9 18L4 13" stroke="#FFAB40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-white text-3xl font-bold" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>Order Confirmed</h1>
        <p className="text-[#78909C] mt-2">Order {order} • Total {total ? `$${Number(total).toLocaleString()}` : 'Custom'}</p>

        <div className="mt-6 text-left space-y-3">
          <p className="text-white/90 font-medium">What Happens Next</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="inline-flex w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,171,64,0.4)' }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.sun }} />
              </span>
              <span className="text-white/90">You’ll receive a confirmation email shortly.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,171,64,0.4)' }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.sun }} />
              </span>
              <span className="text-white/90">Add participants and share pre-work.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,171,64,0.4)' }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.sun }} />
              </span>
              <span className="text-white/90">Meet your facilitator and finalize logistics.</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: colors.sun, color: colors.offBlack }}>View Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
