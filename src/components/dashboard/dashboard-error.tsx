import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Wifi, LogIn } from 'lucide-react';

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
}

export const DashboardError: React.FC<DashboardErrorProps> = ({ error, onRetry }) => {
  const isAuthError = error.includes('Authentication') || error.includes('Session expired');
  const isNetworkError = error.includes('fetch') || error.includes('network');

  const getErrorIcon = () => {
    if (isAuthError) return <LogIn className="w-8 h-8 text-red-600" />;
    if (isNetworkError) return <Wifi className="w-8 h-8 text-red-600" />;
    return <AlertCircle className="w-8 h-8 text-red-600" />;
  };

  const getErrorTitle = () => {
    if (isAuthError) return 'Session Expired';
    if (isNetworkError) return 'Connection Error';
    return 'Something Went Wrong';
  };

  const getErrorMessage = () => {
    if (isAuthError) return 'Please login again to continue';
    if (isNetworkError) return 'Please check your internet connection and try again';
    return error;
  };

  const handleAction = () => {
    if (isAuthError) {
      // Redirect to login page
      window.location.href = '/login';
    } else {
      onRetry();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-20">
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            {getErrorIcon()}
          </div>
          <CardTitle className="text-red-800">{getErrorTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-red-600 text-sm mb-6">
            {getErrorMessage()}
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={handleAction}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isAuthError ? (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login Again
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </>
              )}
            </Button>
            
            {!isAuthError && (
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Refresh Page
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 