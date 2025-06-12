import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart, Radar, PolarAngleAxis, PolarGrid, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity, TrendingUp, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { FoodData, PeriodData, Slide } from '@/types/dashboard';
import { radarConfig, historyConfig } from '@/constants/dashboard-data';
import { dashboardService } from '@/services/dashboardService';

// Hardcoded slides configuration (UI configuration)
const slides: Slide[] = [
  {
    id: 'food',
    title: 'Bahan Makanan Favorit',
    description: 'Konsumsi bahan makanan dalam 7 hari terakhir'
  },
  {
    id: 'history',
    title: 'History Kalori',
    description: 'Data konsumsi kalori berdasarkan periode waktu'
  }
];

interface HorizontalSliderProps {
  currentSlide: number;
  selectedPeriod: string;
  onSlideChange: (slide: number) => void;
  onPeriodChange: (period: string) => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

export function HorizontalSlider({
  currentSlide,
  selectedPeriod,
  onSlideChange,
  onPeriodChange,
  onPrevSlide,
  onNextSlide
}: HorizontalSliderProps) {
  const [foodData, setFoodData] = useState<FoodData[]>([]);
  const [periods, setPeriods] = useState<PeriodData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch both datasets in parallel
        const [foodResponse, historyResponse] = await Promise.all([
          dashboardService.getMostConsumedIngredients(),
          dashboardService.getHistoryCalories()
        ]);

        setFoodData(foodResponse.foodData);
        setPeriods(historyResponse.periods);
        
        // Set default period if current selectedPeriod doesn't exist in the response
        if (historyResponse.periods.length > 0 && !historyResponse.periods.find(p => p.id === selectedPeriod)) {
          onPeriodChange(historyResponse.periods[0].id);
        }
      } catch (err) {
        console.error('Error fetching slider data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentPeriodData = () => {
    if (periods.length === 0) return null;
    const period = periods.find(p => p.id === selectedPeriod);
    return period || periods[0];
  };

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardContent className="flex items-center justify-center py-16">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading dashboard data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-8">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading data</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" />
            {slides[currentSlide].title}
          </CardTitle>
          <CardDescription>
            {slides[currentSlide].description}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevSlide}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNextSlide}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1: Radar Chart */}
            <div className="w-full flex-shrink-0">
              {foodData.length > 0 ? (
                <ChartContainer
                  config={radarConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadarChart data={foodData}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <PolarAngleAxis dataKey="bahan" className="fill-muted-foreground text-sm" />
                    <PolarGrid stroke="#e5e7eb" strokeOpacity={0.5} />
                    <Radar
                      dataKey="konsumsi"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ChartContainer>
              ) : (
                <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                  <p>No food data available</p>
                </div>
              )}
            </div>

            {/* Slide 2: History Chart */}
            <div className="w-full flex-shrink-0">
              {periods.length > 0 ? (
                <div className="space-y-6">
                  {/* Period Buttons */}
                  <div className="flex gap-2 justify-center overflow-x-auto">
                    {periods.map((period) => (
                      <button
                        key={period.id}
                        onClick={() => onPeriodChange(period.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                          selectedPeriod === period.id
                            ? 'bg-amber-600 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>

                  {/* Chart */}
                  {getCurrentPeriodData() && (
                    <ChartContainer
                      config={historyConfig}
                      className="aspect-square max-h-[200px] w-full pr-10"
                    >
                                             <LineChart data={getCurrentPeriodData()?.data || []}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                         <XAxis dataKey={getCurrentPeriodData()?.dataKey || 'day'} className="fill-muted-foreground text-sm" />
                        <YAxis className="fill-muted-foreground text-sm" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="calories"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                  <p>No history data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-amber-600' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {currentSlide === 0 && foodData.length > 0 && `${foodData[0]?.bahan || 'Tidak ada data'} paling sering dikonsumsi`}
          {currentSlide === 0 && foodData.length === 0 && "Belum ada data konsumsi"}
          {currentSlide === 1 && selectedPeriod === 'week' && "Trend kalori harian minggu ini"}
          {currentSlide === 1 && selectedPeriod === 'month' && "Rata-rata kalori bulanan"}
          {currentSlide === 1 && selectedPeriod === 'sixmonth' && "Performa 6 bulan terakhir"}
          {currentSlide === 1 && selectedPeriod === 'year' && "Trend kalori 5 tahun terakhir"}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {currentSlide === 0 && "Data berdasarkan frekuensi konsumsi harian"}
          {currentSlide === 1 && selectedPeriod === 'week' && "Kalori per hari dalam seminggu"}
          {currentSlide === 1 && selectedPeriod === 'month' && "Rata-rata kalori per minggu"}
          {currentSlide === 1 && selectedPeriod === 'sixmonth' && "Rata-rata kalori per bulan"}
          {currentSlide === 1 && selectedPeriod === 'year' && "Rata-rata kalori per tahun"}
        </div>
      </CardFooter>
    </Card>
  );
} 