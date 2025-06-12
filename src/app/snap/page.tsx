'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCameraControls, useBrightnessDetection, useCaptureProcess } from '@/hooks';
import { ROUTES } from '@/constants';
import { 
  LoadingScreen,
  CameraPreview,
  CaptureLoadingScreen,
  TopControls,
  BottomControls,
  BrightnessAlert
} from '@/components/snap';
import { ApiTestButton } from '@/components/debug/ApiTestButton';
import { ProtectedPageContent } from '@/components/auth/ProtectedPage';

export default function SnapPage() {
  const router = useRouter();
  
  const {
    isFlashOn,
    isFrontCamera,
    isLoading,
    flashSupported,
    videoRef,
    startCamera,
    stopCamera,
    toggleFlash,
    toggleCamera,
  } = useCameraControls();

  const { isTooDark, canvasRef } = useBrightnessDetection(videoRef, isLoading);

  const {
    isCapturing,
    showCancel,
    capturedImage,
    error,
    handleCapture,
    handleUpload,
    handleCancelCapture,
    clearError,
  } = useCaptureProcess(videoRef, canvasRef, isFrontCamera, stopCamera, startCamera);

  const handleImageUpload = async (file: File) => {
    console.log('📤 handleImageUpload triggered with file:', { 
      name: file.name, 
      size: file.size, 
      type: file.type 
    });
    
    // Clear any previous errors
    clearError();
    
    // Convert file to data URL (same format as capture)
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string;
      console.log('🔄 File converted to data URL, length:', imageUrl.length);
      
      // Use the same upload process as capture
      handleUpload(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleCaptureClick = async () => {
    console.log('📷 Capture button clicked');
    await handleCapture();
  };

  const handleBack = () => {
    router.push(ROUTES.HOME);
  };

  // Show error overlay if there's an error
  if (error) {
    return (
      <ProtectedPageContent>
        <div className="min-h-screen bg-background flex flex-col">
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
                <div className="text-destructive text-lg font-semibold mb-2">
                  Oops! Ada yang salah
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {error}
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={clearError}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90"
                >
                  Coba Lagi
                </button>
                
                <button
                  onClick={handleBack}
                  className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium transition-colors hover:bg-secondary/80"
                >
                  Kembali ke Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedPageContent>
    );
  }

  return (
    <ProtectedPageContent>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <LoadingScreen isVisible={isLoading} />
        
        <CameraPreview 
          videoRef={videoRef}
          isFrontCamera={isFrontCamera}
          isLoading={isLoading}
        />
        
        <CaptureLoadingScreen
          isCapturing={isCapturing}
          capturedImage={capturedImage}
          isFrontCamera={isFrontCamera}
          showCancel={showCancel}
          onCancel={handleCancelCapture}
        />
        
        <TopControls
          isLoading={isLoading}
          isFlashOn={isFlashOn}
          flashSupported={flashSupported}
          onToggleFlash={toggleFlash}
          onToggleCamera={toggleCamera}
        />
        
        <BottomControls
          isLoading={isLoading}
          isCapturing={isCapturing}
          isTooDark={isTooDark}
          onImageUpload={handleImageUpload}
          onCapture={handleCaptureClick}
          onBack={handleBack}
        />
        
        <BrightnessAlert 
          isTooDark={isTooDark}
          isLoading={isLoading}
          isCapturing={isCapturing}
        />
        
        <canvas 
          ref={canvasRef} 
          className="hidden" 
          aria-hidden="true"
        />
        
        {/* Debug component - only shows in development */}
        <ApiTestButton />
      </div>
    </ProtectedPageContent>
  );
}