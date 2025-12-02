'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitButton,
  EmbrKitInput
} from '@embr/ui'

const theme = {
  primaryColor: '#0F172A',
  secondaryColor: '#475569',
  backgroundColor: '#ffffff',
  surfaceColor: '#f8fafc',
  textColor: '#0f172a',
  textSecondaryColor: '#64748b',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'flat' as const
}

const services = [
  { id: 1, name: 'Consultation', duration: '30 min', price: '$150' },
  { id: 2, name: 'Full Session', duration: '60 min', price: '$250' },
  { id: 3, name: 'Extended Session', duration: '90 min', price: '$350' }
]

const timeSlots = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '4:00 PM', available: true }
]

const dates = [
  { id: 1, day: 'Mon', date: '15', available: true },
  { id: 2, day: 'Tue', date: '16', available: true },
  { id: 3, day: 'Wed', date: '17', available: true },
  { id: 4, day: 'Thu', date: '18', available: false },
  { id: 5, day: 'Fri', date: '19', available: true }
]

export default function BookingMinimalTemplate() {
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
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Minimal Clinic</h1>
                <p className="text-gray-600">Book Your Appointment</p>
              </div>
              <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium transition-colors">
                Back
              </Link>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <div className="bg-gray-50 border-b border-gray-200 py-8">
          <EmbrKitContainer>
            <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1 transition-all ${
                    step >= s ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </EmbrKitContainer>
        </div>

        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Select Service</h2>

              <div className="space-y-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`w-full p-6 text-left transition-all border ${
                      selectedService === service.id
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{service.name}</h3>
                        <p className={`text-sm ${selectedService === service.id ? 'text-gray-300' : 'text-gray-600'}`}>
                          {service.duration}
                        </p>
                      </div>
                      <span className="text-xl font-bold">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <EmbrKitButton
                  onClick={handleNext}
                  disabled={!selectedService}
                  className="px-8 py-3"
                >
                  Continue
                </EmbrKitButton>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 font-medium mb-6">
                ← Back
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-8">Select Date & Time</h2>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Date</h3>
                <div className="flex gap-2">
                  {dates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => date.available && setSelectedDate(date.id)}
                      disabled={!date.available}
                      className={`flex-1 p-4 text-center transition-all border ${
                        selectedDate === date.id
                          ? 'bg-gray-900 text-white border-gray-900'
                          : date.available
                          ? 'bg-white hover:bg-gray-50 border-gray-300'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-xs mb-1">{date.day}</div>
                      <div className="text-xl font-bold">{date.date}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-4 text-center font-semibold transition-all border ${
                          selectedTime === slot.time
                            ? 'bg-gray-900 text-white border-gray-900'
                            : slot.available
                            ? 'bg-white hover:bg-gray-50 border-gray-300'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
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
                  className="px-8 py-3"
                >
                  Continue
                </EmbrKitButton>
              </div>
            </div>
          )}

          {/* Step 3: Enter Details */}
          {step === 3 && (
            <div>
              <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 font-medium mb-6">
                ← Back
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Information</h2>

              {/* Booking Summary */}
              <div className="bg-gray-100 p-6 mb-8 border border-gray-300">
                <h3 className="font-bold mb-3">Appointment Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold">{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{dates.find(d => d.id === selectedDate)?.day}, {dates.find(d => d.id === selectedDate)?.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300 mt-2">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-lg">{selectedServiceData?.price}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <EmbrKitInput
                    label="First Name"
                    placeholder="John"
                    type="text"
                  />
                  <EmbrKitInput
                    label="Last Name"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
                <EmbrKitInput
                  label="Email"
                  placeholder="john@example.com"
                  type="email"
                />
                <EmbrKitInput
                  label="Phone"
                  placeholder="(555) 123-4567"
                  type="tel"
                />
                <EmbrKitInput
                  label="Notes (Optional)"
                  placeholder="Any special requests..."
                  type="text"
                />

                <div className="pt-4">
                  <EmbrKitButton className="w-full py-3 font-bold">
                    Confirm Appointment
                  </EmbrKitButton>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </EmbrKitProvider>
  )
}
