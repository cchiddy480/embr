'use client'

import React from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitStatCard,
  EmbrKitProgressBar,
  EmbrKitDataList
} from '@embr/ui'

const theme = {
  primaryColor: '#1F2937',
  secondaryColor: '#6366F1',
  backgroundColor: '#0F172A',
  surfaceColor: '#1E293B',
  textColor: '#F1F5F9',
  textSecondaryColor: '#94A3B8',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'flat' as const
}

const kpiData = [
  { label: 'Total Revenue', value: '$2.4M', change: { value: '+24.8%', type: 'positive' as const } },
  { label: 'Active Users', value: '48.2K', change: { value: '+15.3%', type: 'positive' as const } },
  { label: 'Conversion Rate', value: '3.24%', change: { value: '-0.4%', type: 'negative' as const } },
  { label: 'Avg Session', value: '8m 42s', change: { value: '+1.2%', type: 'positive' as const } }
]

const performanceMetrics = [
  { label: 'API Response Time', value: 94, target: 95, unit: 'ms' },
  { label: 'Uptime', value: 99, target: 99.9, unit: '%' },
  { label: 'Error Rate', value: 98, target: 99, unit: '%' },
  { label: 'Cache Hit Rate', value: 89, target: 90, unit: '%' }
]

const recentActivity = [
  { label: 'New Sign-ups Today', value: '284' },
  { label: 'Active Sessions', value: '1,847' },
  { label: 'API Calls (24h)', value: '2.4M' },
  { label: 'Data Processed', value: '847 GB' }
]

const topChannels = [
  { name: 'Organic Search', users: 18400, revenue: '$487K', growth: '+18%' },
  { name: 'Direct Traffic', users: 12800, revenue: '$324K', growth: '+12%' },
  { name: 'Social Media', users: 9200, revenue: '$218K', growth: '+24%' },
  { name: 'Email Campaign', users: 7600, revenue: '$195K', growth: '+8%' }
]

export default function DashboardDarkTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-slate-950">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3m4 12v3m4-6v6m4-9v9m4-12v12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-50">Nebula Analytics</h1>
                  <p className="text-sm text-slate-400">Real-Time Performance Dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* KPI Cards */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-slate-50 mb-4">Key Metrics</h2>
            <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-4">
              {kpiData.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 p-6 hover:border-indigo-500/50 transition-all"
                >
                  <div className="text-sm text-slate-400 mb-2">{kpi.label}</div>
                  <div className="text-3xl font-bold text-slate-50 mb-2">{kpi.value}</div>
                  <div className={`text-sm font-semibold flex items-center gap-1 ${
                    kpi.change.type === 'positive' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {kpi.change.type === 'positive' ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                      </svg>
                    )}
                    <span>{kpi.change.value}</span>
                  </div>
                </div>
              ))}
            </EmbrKitGrid>
          </section>

          {/* Performance Metrics */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-slate-50 mb-4">System Performance</h2>
            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
              {performanceMetrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-50">{metric.label}</h3>
                    <span className={`text-sm font-bold ${
                      metric.value >= metric.target ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        metric.value >= metric.target ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Target: {metric.target}{metric.unit}</p>
                </div>
              ))}
            </EmbrKitGrid>
          </section>

          <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
            {/* Recent Activity */}
            <section>
              <h2 className="text-lg font-bold text-slate-50 mb-4">Live Activity</h2>
              <div className="bg-slate-900 border border-slate-800 p-6">
                <div className="space-y-4">
                  {recentActivity.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                      <span className="text-slate-400 text-sm">{item.label}</span>
                      <span className="text-slate-50 font-bold text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Top Channels */}
            <section>
              <h2 className="text-lg font-bold text-slate-50 mb-4">Traffic Sources</h2>
              <div className="bg-slate-900 border border-slate-800 p-6">
                <div className="space-y-4">
                  {topChannels.map((channel, idx) => (
                    <div key={idx} className="pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-50">{channel.name}</h4>
                          <p className="text-sm text-slate-400">{channel.users.toLocaleString()} users</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-50">{channel.revenue}</p>
                          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                            </svg>
                            <span>{channel.growth}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </EmbrKitGrid>

          {/* Chart Placeholder */}
          <section className="mt-10">
            <h2 className="text-lg font-bold text-slate-50 mb-4">Revenue Analytics</h2>
            <div className="bg-slate-900 border border-slate-800 p-8">
              <div className="aspect-video bg-slate-800 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3m4 12v3m4-6v6m4-9v9m4-12v12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-medium">Revenue Chart Visualization</p>
                  <p className="text-sm mt-2">Connect your data source to display live analytics</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mt-10">
            <EmbrKitGrid cols={2} gap={4} className="md:grid-cols-4">
              <button className="p-6 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-indigo-500 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-indigo-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5m0 0L7 8m5-5v12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-300 text-sm">Export Data</p>
              </button>
              <button className="p-6 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-indigo-500 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-indigo-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zm-1 0l5 5m-4 3H9m6 4H9m2-8H9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-300 text-sm">Generate Report</p>
              </button>
              <button className="p-6 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-indigo-500 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-indigo-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-300 text-sm">Settings</p>
              </button>
              <button className="p-6 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-indigo-500 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-indigo-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-300 text-sm">Email Report</p>
              </button>
            </EmbrKitGrid>
          </section>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
