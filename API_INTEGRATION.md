# API Integration Documentation

## Overview
This document describes the integration of the food recommendation API (`https://16.176.215.12/api/recommend`) with the KASEP application.

## What Has Been Implemented

### 1. API Service (`src/services/api.ts`)
- Created `ApiService` class to handle communication with the recommendation API
- Handles multipart/form-data requests for image uploads
- Includes proper error handling and response validation

### 2. Type Definitions (`src/types/api.ts`)
- `ApiRecipe`: Structure for individual recipe data from the API
- `ApiRecipeStep`: Structure for recipe cooking steps
- `ApiRecommendationResponse`: Complete API response structure
- `RecommendationRequest`: Request payload structure

### 3. Data Transformation (`src/utils/transformers.ts`)
- `transformApiResponseToSnapResult()`: Converts API response format to internal SnapResult format
- Handles JSON string parsing for ingredients and cooking methods
- Maps recipe steps from object format to array format
- Provides default values for missing nutritional information

### 4. Enhanced Capture Process (`src/hooks/useCaptureProcess.ts`)
- Integrated real API calls instead of mock processing
- Added comprehensive error handling with user-friendly messages
- Implements image validation (size limits, format checks)
- Handles network errors, timeouts, and server issues
- Includes cancellation support during API calls

### 5. User Interface Updates (`src/app/snap/page.tsx`)
- Added error state management and display
- Improved user feedback for different error scenarios
- Enhanced retry functionality

## API Integration Flow

1. **Image Capture/Upload**: User captures image or uploads from gallery
2. **Image Processing**: Convert image to Blob format with size validation
3. **API Request**: Send multipart/form-data request to recommendation endpoint
4. **Response Processing**: Validate and transform API response
5. **Data Storage**: Store transformed result in localStorage
6. **Navigation**: Redirect to results page to display recommendations

## Configuration

The API endpoint is configured in `src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_ML_URL || 'https://16.176.215.12';
```

Make sure to set the environment variable in your `.env` file:
```bash
NEXT_PUBLIC_API_ML_URL=https://16.176.215.12
```

## Debugging API Issues

If the API is not being called, follow these debugging steps:

### 1. Check Environment Variables
Ensure your `.env` file contains:
```bash
NEXT_PUBLIC_API_ML_URL=https://16.176.215.12
```

### 2. Check Console Logs
The integration includes extensive logging. Open browser dev tools and check for:

**When capturing/uploading images:**
- 📷 `handleCapture called` or 📤 `handleImageUpload triggered`
- 🚀 `Starting processImageWithAPI...`
- 🌍 `API Base URL: https://16.176.215.12`
- 📦 `Blob created: {size: ..., type: ...}`
- 🍽️ `Getting recommendations for image:`
- 🌐 `Making API request to: https://16.176.215.12/api/recommend`

### 3. Use Debug Test Button
In development mode, a debug button appears on the snap page:
- Click "Test API" to test the API connection directly
- Check console for detailed request/response logs
- Verify if the API server is accessible

### 4. Common Issues and Solutions

**Issue: API Base URL shows undefined or localhost**
- Solution: Restart development server after adding environment variables
- Run: `npm run dev` again

**Issue: Network/CORS errors**
- Check if the API server (`https://16.176.215.12`) is accessible
- Test direct access in browser: `https://16.176.215.12`
- Ensure the server allows CORS for your domain

**Issue: Image processing fails**
- Check image size (max 10MB)
- Verify image format (JPEG/PNG)
- Check console for blob creation logs

**Issue: Button clicks not working**
- Ensure camera permissions are granted
- Check if video/canvas refs are available
- Look for JavaScript errors in console

### 5. Manual API Testing

You can test the API manually using curl:
```bash
curl -X POST "https://16.176.215.12/api/recommend" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@your-test-image.jpg"
```

### 6. Restart Steps

If API still not working:
1. Stop development server (`Ctrl+C`)
2. Clear browser cache
3. Restart server: `npm run dev`
4. Check console logs again

## Error Handling

The integration includes robust error handling for:

- **Network Issues**: Connection problems, timeouts
- **Server Errors**: Invalid responses, server downtime
- **Data Validation**: Empty results, malformed data
- **File Size**: Images exceeding 10MB limit
- **User Cancellation**: Support for canceling ongoing requests

## Testing Utilities (`src/utils/apiTestUtils.ts`)

Includes test utilities for development:
- `testApiIntegration()`: Validates complete API integration flow
- `createTestImageBlob()`: Creates test images for development testing

## Usage

The API integration is automatically used when users:
1. Capture images using the camera
2. Upload images from their device gallery

Results are displayed on the `/snap/result` page with:
- Detected ingredients
- Recipe recommendations
- Nutritional information
- Cooking steps with images

## Error Messages

User-friendly error messages in Indonesian:
- Network issues: "Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi."
- Timeout: "Permintaan timeout. Silakan coba lagi."
- Server errors: "Server sedang bermasalah. Silakan coba lagi dalam beberapa menit."
- No results: "No recipes found for the detected ingredients. Please try with a different image."
- File too large: "Image too large. Please try with a smaller image."

## Technical Notes

- Images are converted to JPEG format with 80% quality to optimize file size
- Maximum image size limit: 10MB
- API timeout handling is included
- Response validation ensures data integrity
- Graceful fallback to error states when API is unavailable
- Extensive logging for debugging purposes in development mode 