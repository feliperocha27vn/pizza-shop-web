import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

const data = [
  {
    date: '10/12',
    revenue: 900,
  },
  {
    date: '11/12',
    revenue: 1500,
  },
  {
    date: '12/12',
    revenue: 1800,
  },
  {
    date: '13/12',
    revenue: 1200,
  },
  {
    date: '14/12',
    revenue: 2200,
  },
  {
    date: '15/12',
    revenue: 600,
  },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              stroke="#888"
              dy={16}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
              width={80}
            />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
