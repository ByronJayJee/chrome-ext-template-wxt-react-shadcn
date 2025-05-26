import { useState } from "react";
import { Button } from "@/components/ui/button";

import { TrendingUp } from "lucide-react"
import { Milk as Water, Car } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


function App() {
  const [count, setCount] = useState(0);
  const [waterCount, setWaterCount] = useState(24);
  const [carCount, setCarCount] = useState(3);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="#e76e50"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="#2a9d90"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="flex flex-col items-center gap-4">
          <Water className="h-24 w-24 text-blue-500" strokeWidth={1.5} />
          <span className="text-4xl font-bold">{waterCount}</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Car className="h-24 w-24 text-gray-700" strokeWidth={1.5} />
          <span className="text-4xl font-bold">{carCount}</span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;