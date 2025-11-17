import React, { useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const colors = {
  offBlack: '#212629',
  heritageBlue: '#2E4F5F',
  sun: '#FFAB40',
  thunderGrey: '#78909C',
  white: '#FFFFFF'
}

const plans = {
  starter: { id: 'starter', name: 'Sprint Starter', price: 1500, participantsLabel: 'Up to 12 participants', features: ['1-day design sprint','Certified facilitator','Workshop materials','Post-sprint summary'] },
  team: { id: 'team', name: 'Team Development', price: 2800, participantsLabel: 'Up to 24 participants', features: ['2-day immersive sprint','Advanced playbooks','Team retrospectives','Follow-up coaching'] },
  enterprise: { id: 'enterprise', name: 'Enterprise Excellence', price: null, participantsLabel: '50+ participants', features: ['Custom multi-team program','Exec alignment workshops','Dedicated success manager','Onsite + virtual options'] },
}

function Summary({ selected }) {
  const plan = plans[selected] || plans.starter
  const total = plan.price ?? 0
  return (
    <div className="sticky top-6 rounded-2xl p-6" style={{ backgroundColor: colors.heritageBlue }}>
      <h3 className="text-white text-xl font-semibold" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>Order Summary</h3>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-white/90" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>{plan.name}</p>
          <p className="text-[#78909C] text-sm">{plan.participantsLabel}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold" style={{ fontSize: 24 }}>{plan.price ? `$${plan.price.toLocaleString()}` : 'Custom'}</p>
          {plan.price && <p className="text-[#78909C] text-xs">USD</p>}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-white/90 font-medium" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>What's Included</p>
        <ul className="mt-3 space-y-2">
          {plan.features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="inline-flex w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,171,64,0.4)' }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.sun }} />
              </span>
              <span className="text-white/90">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-[#78909C]">Total</span>
        <span className="text-white font-bold" style={{ fontSize: 20 }}>{plan.price ? `$${total.toLocaleString()}` : 'Custom'}</span>
      </div>
    </div>
  )
}

export default function Checkout() {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const selected = search.get('package') || 'starter'
  const plan = plans[selected] || plans.starter

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    sprint_date: '',
    participants: plan.price ? (plan.id === 'starter' ? 12 : 24) : 50,
    card: '',
  })

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      package_id: plan.id,
      name: form.name,
      email: form.email,
      company: form.company || null,
      sprint_date: form.sprint_date,
      participants: Number(form.participants),
      payment_last4: form.card.slice(-4) || null,
    }
    const res = await fetch(`${backend}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok) {
      navigate(`/confirmation?order=${data.order_number}&total=${data.amount}`)
    } else {
      alert(data.detail || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.offBlack }}>
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: colors.heritageBlue }}>
            <h2 className="text-white text-2xl font-semibold" style={{ fontFamily: 'Lexend Deca, Inter, sans-serif' }}>Checkout</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#78909C] mb-1">Full Name</label>
                <input name="name" required value={form.name} onChange={onChange} className="w-full rounded-xl px-4 py-3 bg-black/20 text-white placeholder-[#78909C] focus:outline-none focus:ring-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-[#78909C] mb-1">Email</label>
                <input type="email" name="email" required value={form.email} onChange={onChange} className="w-full rounded-xl px-4 py-3 bg.black/20 text-white placeholder-[#78909C] focus:outline-none focus:ring-2" style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(0,0,0,0.2)' }} placeholder="jane@company.com" />
              </div>
              <div>
                <label className="block text-[#78909C] mb-1">Company</label>
                <input name="company" value={form.company} onChange={onChange} className="w-full rounded-xl px-4 py-3 bg-black/20 text-white placeholder-[#78909C] focus:outline-none focus:ring-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }} placeholder="Acme Inc." />
              </div>
              <div>
                <label className="block text-[#78909C] mb-1">Sprint Date</label>
                <input type="date" name="sprint_date" required value={form.sprint_date} onChange={onChange} className="w-full rounded-xl px-4 py-3 bg-black/20 text-white placeholder-[#78909C] focus:outline-none focus:ring-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
              <div>
                <label className="block text-[#78909C] mb-1">Participants</label>
                <input type="number" min="1" name="participants" required value={form.participants} onChange={onChange} className="w-full rounded-xl px-4 py-3 bg-black/20 text-white placeholder-[#78909C] focus:outline-none focus:ring-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
              <div>
                <label className="block text-[#78909C] mb-1">Card Details</label>
                <input name="card" required value={form.card} onChange={onChange} className="w-full rounded-xl px-4 py-3 bg-black/20 text-white placeholder-[#78909C] focus:outline-none focus:ring-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }} placeholder="4242 4242 4242 4242" />
                <p className="text-xs text-[#78909C] mt-1">Mock input. In production, integrate Stripe Elements.</p>
              </div>
            </div>
            <button type="submit" className="w-full rounded-xl px-5 py-3 font-semibold transition-transform hover:scale-[1.02]" style={{ backgroundColor: colors.sun, color: colors.offBlack }}>Pay & Confirm</button>
          </form>
        </div>
        <div className="lg:col-span-5">
          <Summary selected={selected} />
        </div>
      </div>
    </div>
  )
}
