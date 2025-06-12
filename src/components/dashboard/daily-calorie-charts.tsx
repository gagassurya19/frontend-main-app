import React from 'react';
import { ChartContainer } from "@/components/ui/chart";
import { RadialBarChart, RadialBar, Label, PolarGrid, PolarRadiusAxis } from "recharts";
import { DayData } from '@/types/dashboard';
import { chartConfig } from '@/constants/dashboard-data';

interface DailyCalorieChartsProps {
  weeklyData: DayData[];
}

export function DailyCalorieCharts({ weeklyData }: DailyCalorieChartsProps) {
  return (
    <div className="mt-8 mb-8">
      <div className="">
        <div className="grid grid-cols-7 gap-2">
          {weeklyData.map((dayData) => {
            const progress = Math.round((dayData.calories / dayData.target) * 100);
            const progressAngle = Math.min(progress, 100) * 2.7; // 270 degrees max

            return (
              <div key={dayData.day} className="flex flex-col items-center relative">
                {dayData.isToday && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                    Today
                  </div>
                )}
                <div className="relative">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-square w-16 h-16"
                  >
                    <RadialBarChart
                      data={[{
                        calories: dayData.calories,
                        target: dayData.target,
                      }]}
                      startAngle={-90}
                      endAngle={180}
                      innerRadius={20}
                      outerRadius={30}
                    >
                      <PolarGrid
                        gridType="circle"
                        radialLines={false}
                        stroke="none"
                        className={`first:fill-muted last:fill-background ${dayData.isToday ? 'first:fill-amber-100 last:fill-amber-50' : ''}`}
                        polarRadius={[25, 20]}
                      />
                      <RadialBar
                        dataKey="target"
                        startAngle={-90}
                        endAngle={180}
                        fill="#0055FFFF"
                        cornerRadius={2}
                      />
                      <RadialBar
                        dataKey="calories"
                        startAngle={-90}
                        endAngle={-90 + progressAngle}
                        fill={progress >= 100 ? "#22c55e" : "#f59e0b"}
                        cornerRadius={2}
                      />
                      <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-[10px] font-bold"
                                  >
                                    {(dayData.calories / 1000).toFixed(1)}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 8}
                                    className="fill-muted-foreground text-[8px]"
                                  >
                                    kcal
                                  </tspan>
                                </text>
                              ) as React.ReactElement
                            }
                          }}
                        />
                      </PolarRadiusAxis>
                    </RadialBarChart>
                  </ChartContainer>
                </div>
                <div className={`text-xs font-medium ${dayData.isToday ? 'text-amber-600 font-bold' : 'text-muted-foreground'}`}>
                  {dayData.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 