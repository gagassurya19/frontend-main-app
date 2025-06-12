import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import Loading from '@/components/ui/Loading';
import { Utensils } from 'lucide-react';

// Simple skeleton for initial loading
export const HistoryLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Card Skeleton */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Skeletons */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>

      {/* History Items Skeleton */}
      {[1, 2, 3].map((index) => (
        <div key={index} className="space-y-3">
          {/* Date Header Skeleton */}
          <div className="py-3 px-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="w-1 h-1 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>

          {/* Food Items Skeleton */}
          <div className="space-y-3 ml-2">
            {[1, 2].map((foodIndex) => (
              <Card key={foodIndex} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Skeleton className="w-4 h-4" />
                          <Skeleton className="h-4 w-8" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Skeleton className="w-3 h-3" />
                            <Skeleton className="h-3 w-12" />
                          </div>
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                        <div className="flex items-center gap-1">
                          <Skeleton className="w-3 h-3" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Full page loading for initial page load
export const HistoryPageLoading: React.FC = () => {
  return (
    <Loading 
      size="lg" 
      text="Memuat riwayat makanan..." 
      className="min-h-[50vh] -mt-16"
    />
  );
};

// Empty state component
export const HistoryEmptyState: React.FC<{ 
  hasFilters?: boolean; 
  onReset?: () => void 
}> = ({ hasFilters = false, onReset }) => {
  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
        <Utensils className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg mb-2">
        {hasFilters ? 'Tidak ada makanan ditemukan' : 'Belum ada riwayat makanan'}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        {hasFilters 
          ? 'Coba ubah filter pencarian atau hapus filter yang aktif'
          : 'Mulai scan makanan untuk melihat riwayat makanan kamu di sini'
        }
      </p>
      {hasFilters && onReset && (
        <button 
          onClick={onReset}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          Reset Filter
        </button>
      )}
    </Card>
  );
}; 