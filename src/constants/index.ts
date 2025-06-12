// Navigation routes
export const ROUTES = {
  HOME: '/',
  SNAP: '/snap',
  SNAP_RESULT: '/snap/result', 
  HISTORY: '/history',
  BMI: '/bmi',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  RECIPE_DETAIL: '/recipe-detail',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  LATEST_SNAP_RESULT: 'latest_snap_result',
  LATEST_COMPLETE_API_RESULT: 'latest_complete_api_result',
  SELECTED_RECIPE: 'selected_recipe',
  BMI_HISTORY: 'bmi_history',
  USER_PROFILE: 'user_profile',
} as const;

// Default values
export const DEFAULTS = {
  CAPTURE_TIMEOUT: 10000,
  CANCEL_TIMEOUT: 5000,
  BRIGHTNESS_THRESHOLD: 50,
} as const; 