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
  { label: 'Total Revenue', value: '$124,500', change: { value: '+12.5%', type: 'positive' as const } },
  { label: 'Active Users', value: '2,847', change: { value: '+8.2%', type: 'positive' as const } },
  { label: 'Conversion Rate', value: '3.24%', change: { value: '-0.5%', type: 'negative' as const } },
  { label: 'Avg. Order Value', value: '$87.50', change: { value: '+5.1%', type: 'positive' as const } }
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
  { name: 'Premium Widget', sales: 245, revenue: '$12,250', trend: 'up' },
  { name: 'Starter Bundle', sales: 189, revenue: '$9,450', trend: 'up' },
  { name: 'Pro Package', sales: 156, revenue: '$15,600', trend: 'up' },
  { name: 'Basic Item', sales: 134, revenue: '$2,680', trend: 'down' }
]

export default function DashboardStatsTemplate() {
  return (
    <EmbrKitProvider initialTheme={theme}>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Business Analytics</h1>
                <p className="text-sm text-slate-600">Real-time performance dashboard</p>
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
                            <span className={`text-xs font-semibold ${
                              product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {product.trend === 'up' ? '↗' : '↘'} Trending
                            </span>
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
                    <div className="text-6xl mb-4">📊</div>
                    <p className="font-medium">Revenue chart visualization</p>
                    <p className="text-sm mt-2">Connect your data source to display live charts</p>
                  </div>
                </div>
              </EmbrKitCardContent>
            </EmbrKitCard>
          </section>

          {/* Quick Actions */}
          <section className="mt-10">
            <EmbrKitGrid cols={2} gap={4} className="md:grid-cols-4">
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="text-3xl mb-2">📥</div>
                <p className="font-semibold text-slate-900 text-sm">Export Data</p>
              </button>
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="text-3xl mb-2">📄</div>
                <p className="font-semibold text-slate-900 text-sm">Generate Report</p>
              </button>
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="text-3xl mb-2">⚙️</div>
                <p className="font-semibold text-slate-900 text-sm">Settings</p>
              </button>
              <button className="p-6 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all text-center">
                <div className="text-3xl mb-2">📧</div>
                <p className="font-semibold text-slate-900 text-sm">Email Report</p>
              </button>
            </EmbrKitGrid>
          </section>
        </main>
      </div>
    </EmbrKitProvider>
  )
}
