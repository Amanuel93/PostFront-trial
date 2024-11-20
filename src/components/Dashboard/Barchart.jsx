"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

const chartData = [
  { month: "January", trainee: 10 },
  { month: "February",trainee: 20 },
  { month: "March",trainee: 30 },
  { month: "April",trainee: 40 },
  { month: "May",trainee: 20 },
  { month: "June",trainee: 214 },
]

const chartConfig = {
  trainee: {
    label: "Trainees",
    color: "hsl(228, 39%, 33%)",
  },
} 

export default function Component() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto  max-h-[200px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="trainee" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trainees that took trainings
        </div>
      </CardFooter>
    </Card>
  )
}
