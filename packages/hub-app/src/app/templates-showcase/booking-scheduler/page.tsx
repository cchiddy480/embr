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
  primaryColor: '#7C3AED',
  secondaryColor: '#A78BFA',
  backgroundColor: '#faf5ff',
  surfaceColor: '#f3e8ff',
  textColor: '#1a1a1a',
  textSecondaryColor: '#6b7280',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'rounded' as const,
  materialStyle: 'glass' as const
}

const services = [
  { id: 1, name: 'Haircut & Style', duration: '45 min', price: '$60', category: 'Hair' },
  { id: 2, name: 'Color Treatment', duration: '2 hours', price: '$150', category: 'Hair' },
  { id: 3, name: 'Deep Tissue Massage', duration: '60 min', price: '$120', category: 'Wellness' },
  { id: 4, name: 'Facial Treatment', duration: '50 min', price: '$90', category: 'Skincare' },
  { id: 5, name: 'Manicure & Pedicure', duration: '75 min', price: '$85', category: 'Nails' },
  { id: 6, name: 'Personal Training', duration: '45 min', price: '$75', category: 'Fitness' }
]

const timeSlots = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: false },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: false }
]

const dates = [
  { id: 1, day: 'Mon', date: '15', month: 'Mar', available: true },
  { id: 2, day: 'Tue', date: '16', month: 'Mar', available: true },
  { id: 3, day: 'Wed', date: '17', month: 'Mar', available: true },
  { id: 4, day: 'Thu', date: '18', month: 'Mar', available: false },
  { id: 5, day: 'Fri', date: '19', month: 'Mar', available: true },
  { id: 6, day: 'Sat', date: '20', month: 'Mar', available: true },
  { id: 7, day: 'Sun', date: '21', month: 'Mar', available: true }
]

export default function BookingSchedulerTemplate() {
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-200">
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">💆</div>
                <div>
                  <h1 className="text-2xl font-bold text-purple-900">Serenity Spa</h1>
                  <p className="text-sm text-purple-700">Book Your Appointment</p>
                </div>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-white hover:bg-purple-50 rounded-lg font-medium transition-colors border border-purple-200">
                Back
              </Link>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="bg-white border-b border-purple-200 py-6">
          <EmbrKitContainer>
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s, idx) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step >= s
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {s}
                    </div>
                    <span className={`font-medium hidden sm:inline ${
                      step >= s ? 'text-purple-900' : 'text-gray-500'
                    }`}>
                      {s === 1 ? 'Service' : s === 2 ? 'Date & Time' : 'Details'}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={`w-12 h-1 rounded ${
                      step > s ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </EmbrKitContainer>
        </div>

        <main className="max-w-5xl mx-auto px-6 py-10">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-900 mb-2">Choose a Service</h2>
              <p className="text-purple-700 mb-8">Select from our range of premium treatments</p>

              <EmbrKitGrid cols={1} gap={4} className="md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-6 rounded-2xl text-left transition-all ${
                      selectedService === service.id
                        ? 'bg-purple-600 text-white shadow-2xl shadow-purple-600/40 scale-105'
                        : 'bg-white hover:bg-purple-50 border-2 border-purple-200'
                    }`}
                  >
                    <EmbrKitBadge
                      variant={selectedService === service.id ? 'secondary' : 'primary'}
                      className="mb-3"
                    >
                      {service.category}
                    </EmbrKitBadge>
                    <h3 className={`text-xl font-bold mb-2 ${
                      selectedService === service.id ? 'text-white' : 'text-purple-900'
                    }`}>
                      {service.name}
                    </h3>
                    <div className={`space-y-1 text-sm ${
                      selectedService === service.id ? 'text-purple-100' : 'text-purple-700'
                    }`}>
                      <p>⏱️ {service.duration}</p>
                      <p className="text-lg font-bold">{service.price}</p>
                    </div>
                  </button>
                ))}
              </EmbrKitGrid>

              <div className="mt-8 flex justify-end">
                <EmbrKitButton
                  onClick={handleNext}
                  disabled={!selectedService}
                  className="px-8 py-3 text-lg"
                >
                  Continue
                </EmbrKitButton>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <button onClick={handleBack} className="text-purple-600 hover:text-purple-700 font-medium mb-6 flex items-center gap-2">
                ← Back
              </button>

              <h2 className="text-3xl font-bold text-purple-900 mb-2">Select Date & Time</h2>
              <p className="text-purple-700 mb-8">Choose your preferred appointment slot</p>

              {/* Selected Service Summary */}
              {selectedServiceData && (
                <EmbrKitCard variant="elevated" className="mb-8 bg-purple-100 border-2 border-purple-300">
                  <EmbrKitCardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-purple-900">{selectedServiceData.name}</h3>
                      <p className="text-sm text-purple-700">{selectedServiceData.duration} • {selectedServiceData.price}</p>
                    </div>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              )}

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Choose Date</h3>
                <div className="flex gap-3 overflow-x-auto pb-4">
                  {dates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => date.available && setSelectedDate(date.id)}
                      disabled={!date.available}
                      className={`flex-shrink-0 p-4 rounded-xl text-center min-w-[80px] transition-all ${
                        selectedDate === date.id
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                          : date.available
                          ? 'bg-white hover:bg-purple-50 border-2 border-purple-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">{date.day}</div>
                      <div className="text-2xl font-bold mb-1">{date.date}</div>
                      <div className="text-xs">{date.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-4">Choose Time</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-4 rounded-xl font-semibold transition-all ${
                          selectedTime === slot.time
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                            : slot.available
                            ? 'bg-white hover:bg-purple-50 border-2 border-purple-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <EmbrKitButton
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                  className="px-8 py-3 text-lg"
                >
                  Continue
                </EmbrKitButton>
              </div>
            </div>
          )}

          {/* Step 3: Enter Details */}
          {step === 3 && (
            <div>
              <button onClick={handleBack} className="text-purple-600 hover:text-purple-700 font-medium mb-6 flex items-center gap-2">
                ← Back
              </button>

              <h2 className="text-3xl font-bold text-purple-900 mb-2">Your Details</h2>
              <p className="text-purple-700 mb-8">Please provide your information to confirm the booking</p>

              {/* Booking Summary */}
              <EmbrKitCard variant="elevated" className="mb-8 bg-purple-600 text-white">
                <EmbrKitCardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-100">Service:</span>
                      <span className="font-bold">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-100">Date:</span>
                      <span className="font-bold">{dates.find(d => d.id === selectedDate)?.day}, {dates.find(d => d.id === selectedDate)?.date} {dates.find(d => d.id === selectedDate)?.month}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-100">Time:</span>
                      <span className="font-bold">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-purple-400">
                      <span className="text-purple-100">Total:</span>
                      <span className="font-bold text-2xl">{selectedServiceData?.price}</span>
                    </div>
                  </div>
                </EmbrKitCardContent>
              </EmbrKitCard>

              {/* Form */}
              <EmbrKitCard variant="elevated">
                <EmbrKitCardContent className="p-8">
                  <form className="space-y-6">
                    <EmbrKitInput
                      label="Full Name"
                      placeholder="John Doe"
                      type="text"
                    />
                    <EmbrKitInput
                      label="Email Address"
                      placeholder="john@example.com"
                      type="email"
                    />
                    <EmbrKitInput
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      type="tel"
                    />
                    <EmbrKitInput
                      label="Special Requests (Optional)"
                      placeholder="Any preferences or special requirements..."
                      type="text"
                    />

                    <div className="pt-4">
                      <EmbrKitButton className="w-full py-4 text-lg font-bold">
                        Confirm Booking
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
