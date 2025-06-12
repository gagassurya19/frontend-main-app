import ApiService from '@/services/api';
import { transformApiResponseToSnapResult } from './transformers';

/**
 * Test utility to validate API integration
 * This can be used during development to test the API connection
 */
export const testApiIntegration = async (testImageBlob: Blob): Promise<boolean> => {
  try {
    console.log('Testing API integration...');
    
    // Call the API
    const response = await ApiService.getRecommendations({ image: testImageBlob });
    
    console.log('API Response:', response);
    
    // Validate response structure
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid API response structure: missing data array');
      return false;
    }
    
    if (!response.ingredients_detected || !Array.isArray(response.ingredients_detected)) {
      console.error('Invalid API response structure: missing ingredients_detected array');
      return false;
    }
    
    if (response.status !== 'success') {
      console.error('API returned non-success status:', response.status);
      return false;
    }
    
    // Test transformation
    const snapResult = transformApiResponseToSnapResult(response, 'test-image-url');
    
    console.log('Transformed SnapResult:', snapResult);
    
    // Validate transformed result
    if (!snapResult.receipts || !Array.isArray(snapResult.receipts)) {
      console.error('Invalid transformation: missing receipts array');
      return false;
    }
    
    if (!snapResult.material_detected || !Array.isArray(snapResult.material_detected)) {
      console.error('Invalid transformation: missing material_detected array');
      return false;
    }
    
    console.log('✅ API integration test passed!');
    return true;
    
  } catch (error) {
    console.error('❌ API integration test failed:', error);
    return false;
  }
};

/**
 * Create a simple test image blob for testing
 */
export const createTestImageBlob = (): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple test image with some colors
      ctx.fillStyle = '#FF6B6B';
      ctx.fillRect(0, 0, 150, 150);
      ctx.fillStyle = '#4ECDC4';
      ctx.fillRect(150, 0, 150, 150);
      ctx.fillStyle = '#45B7D1';
      ctx.fillRect(0, 150, 150, 150);
      ctx.fillStyle = '#96CEB4';
      ctx.fillRect(150, 150, 150, 150);
      
      // Add some text
      ctx.fillStyle = '#333';
      ctx.font = '20px Arial';
      ctx.fillText('Test Image', 100, 160);
    }
    
    canvas.toBlob((blob) => {
      resolve(blob || new Blob());
    }, 'image/jpeg', 0.8);
  });
}; 