import React, { useState } from 'react';
import { testApiIntegration, createTestImageBlob } from '@/utils/apiTestUtils';

export const ApiTestButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleTestApi = async () => {
    setIsLoading(true);
    setResult('Testing API...');
    
    try {
      console.log('🧪 Starting API test...');
      const testBlob = await createTestImageBlob();
      console.log('🖼️ Test image created:', { size: testBlob.size, type: testBlob.type });
      
      const success = await testApiIntegration(testBlob);
      
      if (success) {
        setResult('✅ API test berhasil! Cek console untuk detail.');
      } else {
        setResult('❌ API test gagal! Cek console untuk error.');
      }
    } catch (error) {
      console.error('💥 Test error:', error);
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border rounded-lg p-4 shadow-lg max-w-xs">
      <h3 className="font-semibold mb-2">API Debug</h3>
      <button
        onClick={handleTestApi}
        disabled={isLoading}
        className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test API'}
      </button>
      {result && (
        <p className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">
          {result}
        </p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        API URL: {process.env.NEXT_PUBLIC_API_ML_URL || 'https://16.176.215.12'}
      </p>
    </div>
  );
}; 