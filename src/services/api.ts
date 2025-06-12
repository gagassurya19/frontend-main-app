import { ApiRecommendationResponse, RecommendationRequest } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ML_URL || 'https://16.176.215.12';

export class ApiService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🌐 Making API request to:', url);
    console.log('📝 Request options:', {
      method: options.method,
      headers: options.headers,
      bodyType: options.body ? (options.body instanceof FormData ? 'FormData' : typeof options.body) : 'none'
    });
    
    if (options.body instanceof FormData) {
      console.log('📋 FormData contents:');
      for (const [key, value] of options.body.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'accept': 'application/json',
          ...options.headers,
        },
      });

      console.log('📊 Response status:', response.status, response.statusText);
      console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API request failed with response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ API response JSON:', result);
      return result;
    } catch (error) {
      console.error('💥 API request error:', error);
      throw error;
    }
  }

  static async getRecommendations(request: RecommendationRequest): Promise<ApiRecommendationResponse> {
    console.log('🍽️ Getting recommendations for image:', {
      imageSize: request.image.size,
      imageType: request.image.type
    });

    const formData = new FormData();
    formData.append('image', request.image);

    return this.makeRequest<ApiRecommendationResponse>('/api/recommend', {
      method: 'POST',
      body: formData,
    });
  }
}

export default ApiService; 