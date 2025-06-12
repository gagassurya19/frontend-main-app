'use client'

import React from 'react'
import confetti from 'canvas-confetti'
import { useRouter } from 'next/navigation'
import { MenuBar } from '@/components/menu-bar';
import { MenuBarTop } from '@/components/menu-bar-top';
import { ProfileSection } from '@/components/dashboard/profile-section';
import { DailyCalorieCharts } from '@/components/dashboard/daily-calorie-charts';
import { HorizontalSlider } from '@/components/dashboard/horizontal-slider';
import { DailyFoodHistory } from '@/components/dashboard/daily-food-history';
import { WeeklyCalorieBenchmark } from '@/components/dashboard/weekly-calorie-benchmark';
import { DashboardLoading } from '@/components/dashboard/dashboard-loading';
import { DashboardError } from '@/components/dashboard/dashboard-error';
import { ProtectedPageContent } from '@/components/auth/ProtectedPage';
import { DailyFood } from '@/types/dashboard';
import { useDashboard } from '@/hooks/useDashboard';
import {
  foodData,
  periods,
  slides
} from '@/constants/dashboard-data';

export default function Dashboard() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = React.useState('week');
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [imageErrors, setImageErrors] = React.useState<Record<number | string, boolean>>({});
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = React.useState(false);

  // Use dashboard hook for API data
  const { 
    weeklyData,
    dailyFoodHistory,
    dailyFoodSummary,
    loading, 
    error, 
    isEmpty,
    dailyFoodLoading,
    dailyFoodError,
    refreshDashboard,
    weeklyBenchmark
  } = useDashboard();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleImageError = (foodId: number | string) => {
    setImageErrors(prev => ({ ...prev, [foodId]: true }));
  };

  const handleConfettiTriggered = () => {
    setHasTriggeredConfetti(true);
  };

  const handleViewHistory = () => {
    router.push('/history');
  };

  const handleFoodClick = (food: DailyFood) => {
    router.push(`/history/${food.id}`);
  };

  // Loading State - show if either weekly data or daily food is loading
  if (loading && dailyFoodLoading) {
    return (
      <ProtectedPageContent>
        <MenuBarTop />
        <div className="bg-background pt-16">
          <DashboardLoading />
        </div>
        <div className="flex justify-center mt-36">
          <MenuBar />
        </div>
      </ProtectedPageContent>
    );
  }

  // Error State - prioritize weekly data error, then daily food error
  const mainError = error || dailyFoodError;
  if (mainError && loading) {
    return (
      <ProtectedPageContent>
        <MenuBarTop />
        <div className="bg-background pt-16">
          <DashboardError error={mainError} onRetry={refreshDashboard} />
        </div>
        <div className="flex justify-center mt-36">
          <MenuBar />
        </div>
      </ProtectedPageContent>
    );
  }

  return (
    <ProtectedPageContent>
      <MenuBarTop />
      <div className="bg-background pt-16">
        <div className="max-w-md mx-auto px-4">
          <ProfileSection />
          
          <DailyCalorieCharts weeklyData={weeklyData} />
          
          <HorizontalSlider
            foodData={foodData}
            periods={periods}
            slides={slides}
            currentSlide={currentSlide}
            selectedPeriod={selectedPeriod}
            onSlideChange={setCurrentSlide}
            onPeriodChange={setSelectedPeriod}
            onPrevSlide={prevSlide}
            onNextSlide={nextSlide}
          />
          
          <DailyFoodHistory
            dailyFoodHistory={dailyFoodHistory}
            dailyFoodSummary={dailyFoodSummary}
            imageErrors={imageErrors}
            onImageError={handleImageError}
            onViewHistory={handleViewHistory}
            onFoodClick={handleFoodClick}
            loading={dailyFoodLoading}
          />
          
          {weeklyBenchmark && (
            <WeeklyCalorieBenchmark
              weeklyData={weeklyBenchmark}
              hasTriggeredConfetti={hasTriggeredConfetti}
              onConfettiTriggered={handleConfettiTriggered}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center mt-36">
        <MenuBar />
      </div>
    </ProtectedPageContent>
  )
}
