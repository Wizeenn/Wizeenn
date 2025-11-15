"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const data = Array.from({ length: 12 }).map((_, index) => ({
  day: `J${index + 1}`,
  tva: Math.round(Math.random() * 1200 + 400),
}));

export function TvaTrendChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Evolution TVA</CardTitle>
        <CardDescription>Daily refundable VAT capted by the AI pipeline.</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTva" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value: number) => formatCurrency(value)} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Jour ${label.replace("J", "")}`}
              contentStyle={{
                borderRadius: 12,
                borderColor: "hsl(var(--border))",
              }}
            />
            <Area
              type="monotone"
              dataKey="tva"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorTva)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

