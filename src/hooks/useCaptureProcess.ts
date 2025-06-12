import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, DEFAULTS, STORAGE_KEYS } from '@/constants';
import ApiService from '@/services/api';
import { transformApiResponseToSnapResult } from '@/utils/transformers';

export const useCaptureProcess = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  isFrontCamera: boolean,
  stopCamera: () => void,
  startCamera: () => void
) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isCancelled = useRef(false);

  useEffect(() => {
    let cancelTimer: NodeJS.Timeout;
    
    if (isCapturing) {
      cancelTimer = setTimeout(() => {
        setShowCancel(true);
      }, DEFAULTS.CANCEL_TIMEOUT);
    } else {
      setShowCancel(false);
    }

    return () => {
      if (cancelTimer) {
        clearTimeout(cancelTimer);
      }
    };
  }, [isCapturing]);

  const processImageWithAPI = async (imageUrl: string) => {
    console.log('🚀 Starting processImageWithAPI...');
    console.log('📸 Image URL length:', imageUrl.length);
    console.log('🌍 API Base URL:', process.env.NEXT_PUBLIC_API_ML_URL || 'https://16.176.215.12');
    
    try {
      setError(null);
      
      console.log('🔄 Converting image URL to Blob...');
      // Convert image URL to Blob
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error('Failed to process image data');
      }
      
      const blob = await response.blob();
      console.log('📦 Blob created:', { size: blob.size, type: blob.type });
      
      // Validate blob size (max 10MB)
      if (blob.size > 10 * 1024 * 1024) {
        throw new Error('Image too large. Please try with a smaller image.');
      }
      
      console.log('📡 Calling recommendation API...');
      // Call the recommendation API
      const apiResponse = await ApiService.getRecommendations({ image: blob });
      console.log('✅ API Response received:', apiResponse);
      
      // Check if request was cancelled during API call
      if (isCancelled.current) {
        console.log('❌ Request was cancelled');
        return;
      }
      
      // Validate API response
      if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
        throw new Error('Invalid response from server. Please try again.');
      }
      
      if (apiResponse.data.length === 0) {
        throw new Error('No recipes found for the detected ingredients. Please try with a different image.');
      }
      
      console.log('🔄 Transforming API response...');
      // Transform API response to SnapResult format
      const snapResult = transformApiResponseToSnapResult(apiResponse, imageUrl);
      console.log('✅ SnapResult transformed:', snapResult);
      
      // Store the result in localStorage
      localStorage.setItem(STORAGE_KEYS.LATEST_SNAP_RESULT, JSON.stringify(snapResult));
      console.log('💾 Result stored in localStorage');
      
      // Navigate to results page
      console.log('🧭 Navigating to results page...');
      router.push(ROUTES.SNAP_RESULT);
      
    } catch (error) {
      console.error('❌ Error in processImageWithAPI:', error);
      
      // Check if request was cancelled
      if (isCancelled.current) {
        console.log('❌ Request was cancelled during error handling');
        return;
      }
      
      let errorMessage = 'Terjadi kesalahan saat memproses gambar. Silakan coba lagi.';
      
      if (error instanceof Error) {
        console.error('📝 Error details:', error.message);
        // Handle specific error types
        if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          errorMessage = 'Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Permintaan timeout. Silakan coba lagi.';
        } else if (error.message.includes('Invalid response')) {
          errorMessage = 'Server sedang bermasalah. Silakan coba lagi dalam beberapa menit.';
        } else if (error.message.includes('too large')) {
          errorMessage = error.message;
        } else if (error.message.includes('No recipes found')) {
          errorMessage = error.message;
        }
      }
      
      console.error('📢 Setting error message:', errorMessage);
      setError(errorMessage);
      
      // Restart camera to allow retry
      startCamera();
    }
  };

  const handleCapture = async () => {
    console.log('📷 handleCapture called');
    
    if (!videoRef.current || !canvasRef.current) {
      console.error('❌ Missing video or canvas ref');
      return;
    }
    
    console.log('🎥 Video and canvas refs available');
    
    // Capture the current frame
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.error('❌ Cannot get canvas context');
      return;
    }
    
    console.log('🖼️ Canvas context obtained');
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log(`📐 Canvas size set to: ${canvas.width}x${canvas.height}`);
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log('🎨 Video frame drawn to canvas');
    
    // Convert canvas to image URL
    const imageUrl = canvas.toDataURL('image/jpeg', 0.8); // Reduce quality to decrease size
    setCapturedImage(imageUrl);
    console.log('🖼️ Image URL created, length:', imageUrl.length);
    
    // Stop the camera
    stopCamera();
    console.log('📹 Camera stopped');
    
    setIsCapturing(true);
    isCancelled.current = false;
    console.log('⏳ Starting capture process...');
    
    // Process image with API
    await processImageWithAPI(imageUrl);
    
    setIsCapturing(false);
    console.log('✅ Capture process completed');
  };

  const handleUpload = async (imageUrl: string) => {
    console.log('📤 handleUpload called with image URL length:', imageUrl.length);
    
    // Set the uploaded image as captured image
    setCapturedImage(imageUrl);
    
    // Stop the camera
    stopCamera();
    
    setIsCapturing(true);
    isCancelled.current = false;
    console.log('⏳ Starting upload process...');
    
    // Process image with API
    await processImageWithAPI(imageUrl);
    
    setIsCapturing(false);
    console.log('✅ Upload process completed');
  };

  const handleCancelCapture = () => {
    console.log('❌ Capture cancelled');
    isCancelled.current = true;
    setIsCapturing(false);
    setShowCancel(false);
    setError(null);
    startCamera();
  };

  const clearError = () => {
    console.log('🧹 Clearing error');
    setError(null);
  };

  return {
    isCapturing,
    showCancel,
    capturedImage,
    error,
    handleCapture,
    handleUpload,
    handleCancelCapture,
    clearError,
  };
}; 