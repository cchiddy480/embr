'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitButton,
  EmbrKitInput,
  EmbrKitBadge
} from '@embr/ui'

const theme = {
  primaryColor: '#BE123C',
  secondaryColor: '#E11D48',
  backgroundColor: '#fff1f2',
  surfaceColor: '#ffe4e6',
  textColor: '#881337',
  textSecondaryColor: '#9f1239',
  fontFamily: 'Georgia, serif',
  headingFontFamily: 'Georgia',
  borderRadius: 'rounded' as const,
  materialStyle: 'elevated' as const
}

const services = [
  { id: 1, name: 'Signature Facial', duration: '75 minutes', price: '$195', description: 'Luxurious deep cleansing and rejuvenation' },
  { id: 2, name: 'Premium Massage', duration: '90 minutes', price: '$245', description: 'Full body therapeutic relaxation' },
  { id: 3, name: 'Complete Wellness Package', duration: '3 hours', price: '$485', description: 'Facial, massage, and body treatment' }
]

const timeSlots = [
  { time: '10:00 AM', available: true },
  { time: '11:30 AM', available: true },
  { time: '1:00 PM', available: false },
  { time: '2:30 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:30 PM', available: true }
]

const dates = [
  { id: 1, day: 'Monday', date: '15', month: 'March', available: true },
  { id: 2, day: 'Tuesday', date: '16', month: 'March', available: true },
  { id: 3, day: 'Wednesday', date: '17', month: 'March', available: true },
  { id: 4, day: 'Thursday', date: '18', month: 'March', available: false },
  { id: 5, day: 'Friday', date: '19', month: 'March', available: true }
]

export default function BookingElegantTemplate() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const handleNext = () => {
    if (step < 3) setStep((step + 1) as 1 | 2 | 3)
  }

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3)
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b-2 border-rose-200">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="text-center flex-grow">
                <h1 className="text-5xl font-bold text-rose-900 mb-2" style={{fontFamily: 'Georgia, serif'}}>
                  Rosewood Spa
                </h1>
                <p className="text-rose-700 text-lg italic">Luxury Wellness & Beauty</p>
              </div>
              <Link href="/templates-showcase" className="absolute top-6 right-6 text-sm px-5 py-2 border-2 border-rose-300 hover:bg-rose-50 rounded-lg font-semibold transition-colors text-rose-900">
                Back
              </Link>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-rose-200 py-8">
          <EmbrKitContainer>
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s, idx) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                        step >= s
                          ? 'bg-rose-700 text-white border-rose-700'
                          : 'bg-white text-rose-300 border-rose-300'
                      }`}
                    >
                      {s}
                    </div>
                    <span className={`font-serif hidden sm:inline ${
                      step >= s ? 'text-rose-900' : 'text-rose-400'
                    }`}>
                      {s === 1 ? 'Service' : s === 2 ? 'Schedule' : 'Details'}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={`w-16 h-0.5 ${
                      step > s ? 'bg-rose-700' : 'bg-rose-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </EmbrKitContainer>
        </div>

        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-4xl font-bold text-rose-900 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                Select Your Treatment
              </h2>
              <p className="text-center text-rose-700 mb-12 italic">Experience our signature services</p>

              <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-3 mb-12">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-8 rounded-2xl text-left transition-all border-2 ${
                      selectedService === service.id
                        ? 'bg-rose-700 text-white border-rose-800 shadow-2xl scale-105'
                        : 'bg-white hover:bg-rose-50 border-rose-200'
                    }`}
                  >
                    <h3 className={`text-2xl font-bold mb-2 ${
                      selectedService === service.id ? 'text-white' : 'text-rose-900'
                    }`} style={{fontFamily: 'Georgia, serif'}}>
                      {service.name}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      selectedService === service.id ? 'text-rose-100' : 'text-rose-700'
                    }`} style={{fontFamily: 'Georgia, serif', fontStyle: 'italic'}}>
                      {service.description}
                    </p>
                    <div className={`flex items-center justify-between ${
                      selectedService === service.id ? 'text-rose-100' : 'text-rose-600'
                    }`}>
                      <span className="text-sm">{service.duration}</span>
                      <span className="text-2xl font-bold">{service.price}</span>
                    </div>
                  </button>
                ))}
              </EmbrKitGrid>

              <div className="flex justify-center">
                <EmbrKitButton
                  onClick={handleNext}
                  disabled={!selectedService}
                  className="px-12 py-4 text-lg"
                >
                  Continue
                </EmbrKitButton>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <button onClick={handleBack} className="text-rose-700 hover:text-rose-900 font-semibold mb-8 flex items-center gap-2">
                ← Back to Services
              </button>

              <h2 className="text-4xl font-bold text-rose-900 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                Choose Your Appointment
              </h2>
              <p className="text-center text-rose-700 mb-12 italic">Select your preferred date and time</p>

              {/* Date Selection */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-rose-900 mb-6" style={{fontFamily: 'Georgia, serif'}}>Date</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {dates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => date.available && setSelectedDate(date.id)}
                      disabled={!date.available}
                      className={`flex-shrink-0 p-6 rounded-2xl text-center min-w-[140px] transition-all border-2 ${
                        selectedDate === date.id
                          ? 'bg-rose-700 text-white border-rose-800 shadow-xl'
                          : date.available
                          ? 'bg-white hover:bg-rose-50 border-rose-200'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-sm mb-2" style={{fontFamily: 'Georgia, serif'}}>{date.day}</div>
                      <div className="text-3xl font-bold mb-1">{date.date}</div>
                      <div className="text-xs">{date.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-2xl font-bold text-rose-900 mb-6" style={{fontFamily: 'Georgia, serif'}}>Time</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-6 rounded-2xl font-semibold text-lg transition-all border-2 ${
                          selectedTime === slot.time
                            ? 'bg-rose-700 text-white border-rose-800 shadow-xl'
                            : slot.available
                            ? 'bg-white hover:bg-rose-50 border-rose-200'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 flex justify-center">
                <EmbrKitButton
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                  className="px-12 py-4 text-lg"
                >
                  Continue to Details
                </EmbrKitButton>
              </div>
            </div>
          )}

          {/* Step 3: Enter Details */}
          {step === 3 && (
            <div>
              <button onClick={handleBack} className="text-rose-700 hover:text-rose-900 font-semibold mb-8 flex items-center gap-2">
                ← Back to Schedule
              </button>

              <h2 className="text-4xl font-bold text-rose-900 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                Complete Your Booking
              </h2>
              <p className="text-center text-rose-700 mb-12 italic">Just a few more details</p>

              {/* Booking Summary */}
              <EmbrKitCard variant="elevated" className="mb-12 bg-gradient-to-br from-rose-700 to-rose-600 text-white border-2 border-rose-800">
                <EmbrKitCardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6" style={{fontFamily: 'Georgia, serif'}}>Appointment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-rose-500 pb-2">
                      <span className="text-rose-100">Treatment:</span>
                      <span className="font-bold">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-rose-500 pb-2">
                      <span className="text-rose-100">Date:</span>
                      <span className="font-bold">{dates.find(d => d.id === selectedDate)?.day}, {dates.find(d => d.id === selectedDate)?.month} {dates.find(d => d.id === selectedDate)?.date}</span>
                    </div>
                    <div className="flex justify-between border-b border-rose-500 pb-2">
                      <span className="text-rose-100">Time:</span>
                      <span className="font-bold">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between pt-3">
                      <span className="text-rose-100 text-lg">Total:</span>
                      <span className="font-bold text-3xl">{selectedServiceData?.price}</span>
                    </div>
                  </div>
                </EmbrKitCardContent>
              </EmbrKitCard>

              {/* Form */}
              <EmbrKitCard variant="elevated" className="bg-white">
                <EmbrKitCardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EmbrKitInput
                        label="First Name"
                        placeholder="Jane"
                        type="text"
                      />
                      <EmbrKitInput
                        label="Last Name"
                        placeholder="Smith"
                        type="text"
                      />
                    </div>
                    <EmbrKitInput
                      label="Email Address"
                      placeholder="jane@example.com"
                      type="email"
                    />
                    <EmbrKitInput
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      type="tel"
                    />
                    <EmbrKitInput
                      label="Special Requests (Optional)"
                      placeholder="Any preferences or requirements..."
                      type="text"
                    />

                    <div className="pt-6">
                      <EmbrKitButton className="w-full py-4 text-lg font-bold">
                        Confirm Appointment
                      </EmbrKitButton>
                    </div>
                  </form>
                </EmbrKitCardContent>
              </EmbrKitCard>
            </div>
          )}
        </main>
      </div>
    </EmbrKitProvider>
  )
}
