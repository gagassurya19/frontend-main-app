import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const DashboardLoading: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4">
      {/* Profile Section Loading */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Weekly Charts Loading */}
      <div className="mt-8 mb-8">
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="w-16 h-16 rounded-full mb-2" />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Slider Loading */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <Skeleton className="w-full h-64 mb-4" />
          <div className="flex justify-center gap-2 mb-4">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-56" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Food History Loading */}
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary Loading */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="w-full h-12 rounded-lg" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Benchmark Loading */}
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-56 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          {/* Stats Grid Loading */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </div>
            ))}
          </div>

          {/* Character Animation Loading */}
          <Skeleton className="w-full h-32 rounded-xl mb-6" />

          {/* Progress Bars Loading */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 mb-3" />
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30">
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="w-full h-2 rounded-full" />
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 