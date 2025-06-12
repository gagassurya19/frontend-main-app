import React from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from 'lucide-react';
import { WeeklyBenchmarkResponse } from '@/types/dashboard';

interface WeeklyCalorieBenchmarkProps {
  weeklyData: WeeklyBenchmarkResponse['data'];
  hasTriggeredConfetti: boolean;
  onConfettiTriggered: () => void;
}

export function WeeklyCalorieBenchmark({ 
  weeklyData, 
  hasTriggeredConfetti, 
  onConfettiTriggered 
}: WeeklyCalorieBenchmarkProps) {
    console.log(weeklyData.data);
    // Use summary data from API if available, otherwise calculate from data
    const totalCalories = weeklyData.summary?.totalCalories ?? 
      (weeklyData.data.length > 0 ? weeklyData.data.reduce((sum, day) => sum + day.totalCalories, 0) : 0);
    const totalTarget = weeklyData.summary?.targetCalories ?? 
      (weeklyData.data.length > 0 ? weeklyData.data.reduce((sum, day) => sum + day.targetCalories, 0) : 0);
    const achievementPercentage = weeklyData.summary?.achievement ?? 
      (totalTarget > 0 ? Math.round((totalCalories / totalTarget) * 100) : 0);
    const averageCalories = weeklyData.data.length > 0 ? Math.round(totalCalories / weeklyData.data.length) : 0;
    const achievedDays = weeklyData.data.filter(day => day.totalCalories >= day.targetCalories * 0.8).length;

    // Confetti function
    const triggerConfetti = React.useCallback(() => {

      // Multiple confetti bursts for better effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f97316']
      });

      // Second burst with slight delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f97316']
        });
      }, 200);
    }, []);

    // Auto-trigger confetti when component becomes visible and achievement is high
    React.useEffect(() => {
      if (achievementPercentage >= 80 && !hasTriggeredConfetti) {
        const timer = setTimeout(() => {
          triggerConfetti();
          onConfettiTriggered();
        }, 1000); // Delay to ensure component is fully mounted

        return () => clearTimeout(timer);
      }
    }, [achievementPercentage, hasTriggeredConfetti, triggerConfetti, onConfettiTriggered]);

    return (
      <Card className="mb-6 overflow-hidden relative">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" />
            Benchmark Kalori Minggu Ini
            {/* Test button for confetti */}
            <button
              onClick={() => {
                triggerConfetti();
                onConfettiTriggered();
              }}
              className="ml-2 px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 rounded text-amber-700"
            >
              🎉
            </button>
          </CardTitle>
          <CardDescription>
            Performa kalori harian vs target mingguan
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Weekly Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">
                {totalCalories}
              </div>
              <div className="text-xs text-muted-foreground">Total Kalori</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {totalTarget}
              </div>
              <div className="text-xs text-muted-foreground">Target Kalori</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {achievementPercentage}%
              </div>
              <div className="text-xs text-muted-foreground">Achievement</div>
            </div>
          </div>

          {/* Character Animation */}
          <div className="relative mb-6 h-32 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
              {/* Floating food icons */}
              <div className="absolute top-4 left-4 text-orange-300 animate-bounce" style={{ animationDelay: '0s' }}>🍎</div>
              <div className="absolute top-8 right-8 text-green-300 animate-bounce" style={{ animationDelay: '0.5s' }}>🥗</div>
              <div className="absolute bottom-6 left-8 text-red-300 animate-bounce" style={{ animationDelay: '1s' }}>🍅</div>
              <div className="absolute bottom-4 right-12 text-yellow-300 animate-bounce" style={{ animationDelay: '1.5s' }}>🌽</div>
            </div>

            {/* Main Character */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Character Body */}
                <div className="w-16 h-16 bg-amber-400 rounded-full relative animate-pulse">
                  {/* Eyes */}
                  <div className="absolute top-4 left-3 w-2 h-2 bg-white rounded-full">
                    <div className="w-1 h-1 bg-black rounded-full ml-0.5 mt-0.5"></div>
                  </div>
                  <div className="absolute top-4 right-3 w-2 h-2 bg-white rounded-full">
                    <div className="w-1 h-1 bg-black rounded-full ml-0.5 mt-0.5"></div>
                  </div>

                  {/* Mouth */}
                  {achievementPercentage >= 80 ? (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-3 border-2 border-black border-t-0 rounded-b-full bg-pink-200"></div>
                  ) : (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-2 border-2 border-black border-b-0 rounded-t-full"></div>
                  )}

                  {/* Cheeks */}
                  <div className="absolute top-6 left-1 w-3 h-2 bg-pink-300 rounded-full opacity-60"></div>
                  <div className="absolute top-6 right-1 w-3 h-2 bg-pink-300 rounded-full opacity-60"></div>
                </div>

                {/* Arms */}
                <div className="absolute top-8 -left-4 w-6 h-2 bg-amber-400 rounded-full transform rotate-45 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-8 -right-4 w-6 h-2 bg-amber-400 rounded-full transform -rotate-45 animate-bounce" style={{ animationDelay: '0.2s' }}></div>

                {/* Achievement Badge */}
                {achievementPercentage >= 80 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-bounce">
                      🎉 Great!
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Party Pop Animation */}
            {achievementPercentage >= 80 && (
              <>
                {/* Confetti */}
                <div className="absolute top-2 left-8 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-4 right-12 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute top-8 left-16 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute top-6 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.9s' }}></div>
                <div className="absolute bottom-8 left-12 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
                <div className="absolute bottom-4 right-16 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </>
            )}
          </div>

          {/* Daily Progress Bars */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground mb-3">Progress Harian</h4>
            {weeklyData.data.map((day, index) => {
              const percentage = Math.min((day.totalCalories / day.targetCalories) * 100, 100);
              const isToday = day.isToday;

              return (
                <div key={day.day} className={`p-3 rounded-lg ${isToday ? 'bg-amber-50 border border-amber-200' : 'bg-muted/30'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${isToday ? 'text-amber-700' : 'text-foreground'}`}>
                        {day.day}
                      </span>
                      {isToday && <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">Hari Ini</span>}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{day.totalCalories}</span>
                      <span className="text-xs text-muted-foreground">/{day.targetCalories} kcal</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        percentage >= 100 ? 'bg-green-500' :
                        percentage >= 80 ? 'bg-amber-500' :
                        percentage >= 60 ? 'bg-yellow-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground">
                      {percentage.toFixed(0)}% dari target
                    </span>
                    {percentage >= 100 && <span className="text-xs">🎯</span>}
                    {percentage >= 80 && percentage < 100 && <span className="text-xs">👍</span>}
                    {percentage < 60 && <span className="text-xs">💪</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekly Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Ringkasan Minggu Ini</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Hari Tercapai:</span>
                <span className="ml-2 font-semibold text-green-600">
                  {achievedDays}/7 hari
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Rata-rata:</span>
                <span className="ml-2 font-semibold text-amber-600">
                  {averageCalories} kcal/hari
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } 