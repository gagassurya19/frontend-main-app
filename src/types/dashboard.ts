import { RecipeStep } from './recipe';

export interface DayData {
  day: string;
  calories: number;
  target: number;
  date?: string;
  isToday?: boolean;
}

// New interface specifically for weekly benchmark data
export interface WeeklyBenchmarkDayData {
  day: string;
  totalCalories: number;
  targetCalories: number;
  percentage: number;
  date: string;
  isToday: boolean;
}

export interface WeeklyCaloriesResponse {
  status: string;
  data: {
    weeklyData: DayData[];
    weekSummary: {
      totalCalories: number;
      totalTarget: number;
      achievementPercentage: number;
      averageCalories: number;
      achievedDays: number;
    };
  };
}

export interface DailyFoodSummary {
  totalCalories: number;
  targetCalories: number;
  remainingCalories: number;
  foodCount: number;
  date: string;
}

export interface DailyFoodHistoryResponse {
  status: string;
  data: {
    dailyFoodHistory: DailyFood[];
    summary: DailyFoodSummary;
  };
}

export interface FoodData {
  bahan: string;
  konsumsi: number;
}

export interface DailyFood {
  id: number | string;
  name: string;
  calories: number;
  time: string;
  date: string; // Format: YYYY-MM-DD
  category: string;
  image: string;
  // Extended recipe data
  description?: string;
  usedMaterial?: string[];
  unusedMaterial?: string[];
  missingMaterial?: string[];
  material?: string[];
  step?: RecipeStep[];
  mainImage?: string;
  capturedImage?: string; // Image that was snapped/captured
}

export interface HistoryData {
  day?: string;
  week?: string;
  month?: string;
  year?: string;
  calories: number;
}

export interface PeriodData {
  id: string;
  label: string;
  data: HistoryData[];
  dataKey: string;
}

export interface Slide {
  id: string;
  title: string;
  description: string;
} 

export interface WeeklyBenchmarkResponse {
  status: string;
  data: {
    data: WeeklyBenchmarkDayData[];
    summary: WeeklyBenchmarkSummary;
  };
}

export interface WeeklyBenchmarkSummary {
  totalCalories: number;
  targetCalories: number;
  achievement: number;
}