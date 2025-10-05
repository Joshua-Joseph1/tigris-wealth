'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface FunnelChartProps {
  data: Array<{ stage: string; count: number }>
}

export function FunnelChart({ data }: FunnelChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="stage"
          stroke="#A1A1AA"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#A1A1AA"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111111',
            border: '1px solid #262626',
            borderRadius: '8px',
            color: '#FAFAFA',
          }}
          cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
        />
        <Bar dataKey="count" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
