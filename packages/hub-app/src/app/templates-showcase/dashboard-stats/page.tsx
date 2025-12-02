'use client'

import React from 'react'
import Link from 'next/link'
import {
  EmbrKitProvider,
  EmbrKitGrid,
  EmbrKitCard,
  EmbrKitCardContent,
  EmbrKitStatCard,
  EmbrKitProgressBar,
  EmbrKitDataList
} from '@embr/ui'

const theme = {
  primaryColor: '#3B82F6',
  secondaryColor: '#10B981',
  backgroundColor: '#f8fafc',
  surfaceColor: '#f1f5f9',
  textColor: '#0f172a',
  textSecondaryColor: '#64748b',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter',
  borderRadius: 'minimal' as const,
  materialStyle: 'flat' as const
}

const kpiData = [
  { label: 'Total Revenue', value: '$847,350', change: { value: '+18.4%', type: 'positive' as const } },
  { label: 'Active Customers', value: '12,847', change: { value: '+12.8%', type: 'positive' as const } },
  { label: 'Conversion Rate', value: '4.87%', change: { value: '+0.3%', type: 'positive' as const } },
  { label: 'Avg. Order Value', value: '$142.80', change: { value: '+7.6%', type: 'positive' as const } }
]

const performanceMetrics = [
  { label: 'Customer Satisfaction', value: 92, target: 95 },
  { label: 'Order Fulfillment', value: 88, target: 90 },
  { label: 'On-Time Delivery', value: 94, target: 95 },
  { label: 'Product Quality', value: 96, target: 98 }
]

const recentActivity = [
  { label: 'New Orders', value: '142' },
  { label: 'Pending Shipments', value: '38' },
  { label: 'Returns', value: '7' },
  { label: 'Customer Inquiries', value: '23' }
]

const topProducts = [
  { name: 'Enterprise Solution', sales: 487, revenue: '$73,050', trend: 'up' },
  { name: 'Professional Plan', sales: 892, revenue: '$62,440', trend: 'up' },
  { name: 'Business Package', sales: 654, revenue: '$45,780', trend: 'up' },
  { name: 'Starter Package', sales: 1203, revenue: '$36,090', trend: 'up' },
  { name: 'Consulting Services', sales: 89, revenue: '$26,700', trend: 'up' }
]

export default function DashboardStatsTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3m4 12v3m4-6v6m4-9v9m4-12v12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Velocity Commerce</h1>
                  <p className="text-sm text-slate-600">Real-time Analytics Dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <Link href="/templates-showcase" className="text-sm px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* KPI Cards */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Key Performance Indicators</h2>
            <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-4">
              {kpiData.map((kpi, idx) => (
                <EmbrKitStatCard
                  key={idx}
                  label={kpi.label}
                  value={kpi.value}
                  change={kpi.change}
                  size="md"
                />
              ))}
            </EmbrKitGrid>
          </section>

          {/* Performance Metrics */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Performance Metrics</h2>
            <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
              {performanceMetrics.map((metric, idx) => (
                <EmbrKitCard key={idx} variant="flat">
                  <EmbrKitCardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900">{metric.label}</h3>
                      <span className={`text-sm font-bold ${
                        metric.value >= metric.target ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {metric.value}%
                      </span>
                    </div>
                    <EmbrKitProgressBar
                      value={metric.value}
                      label=""
                      showValue={false}
                    />
                    <p className="text-xs text-slate-500 mt-2">Target: {metric.target}%</p>
                  </EmbrKitCardContent>
                </EmbrKitCard>
              ))}
            </EmbrKitGrid>
          </section>

          <EmbrKitGrid cols={1} gap={6} className="md:grid-cols-2">
            {/* Recent Activity */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
              <EmbrKitCard variant="flat">
                <EmbrKitCardContent className="p-6">
                  <EmbrKitDataList items={recentActivity.map(item => ({
                    label: item.label,
                    value: item.value,
                    numeric: true
                  }))} />
                </EmbrKitCardContent>
              </EmbrKitCard>
            </section>

            {/* Top Products */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Top Products</h2>
              <EmbrKitCard variant="flat">
                <EmbrKitCardContent className="p-6">
                  <div className="space-y-4">
                    {topProducts.map((product, idx) => (
                      <div key={idx} className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-900">{product.name}</h4>
                            <p className="text-sm text-slate-600">{product.sales} sales</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">{product.revenue}</p>
                            <div className={`flex items-center gap-1 text-xs font-semibold ${
                              product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {product.trend === 'up' ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                </svg>
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                                </svg>
                              )}
                              <span>Trending</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </EmbrKitCardContent>
              </EmbrKitCard>
            </section>
          </EmbrKitGrid>

          {/* Chart Placeholder */}
          <section className="mt-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Revenue Trends</h2>
            <EmbrKitCard variant="flat">
              <EmbrKitCardContent className="p-8">
                <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3m4 12v3m4-6v6m4-9v9m4-12v12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-medium">Revenue Chart Visualization</p>
                    <p className="text-sm mt-2">Connect your data source to display live charts and trends</p>
                  </div>
                </div>
              </EmbrKitCardContent>
            </EmbrKitCard>
          </section>

          {/* Quick Actions */}
          <section className="mt-10">
            <EmbrKitGrid cols={2} gap={4} className="md:grid-cols-4">
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-blue-600">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5m0 0L7 8m5-5v12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 text-sm">Export Data</p>
              </button>
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-blue-600">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zm-1 0l5 5m-4 3H9m6 4H9m2-8H9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 text-sm">Generate Report</p>
              </button>
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-blue-600">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 text-sm">Settings</p>
              </button>
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-blue-600">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 text-sm">Email Report</p>
              </button>
            </EmbrKitGrid>
          </section>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
