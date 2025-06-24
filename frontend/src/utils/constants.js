// API Configuration
// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
// const isProduction = process.env.NODE_ENV === 'production';

export const API_CONFIG = {
  // Development URL
  DEV_BASE_URL: 'http://localhost:5000/api/pdf',
  
  // Production URL (replace with your actual Render deployment URL)
  PROD_BASE_URL: 'https://your-app-name.onrender.com/api/pdf',
  
  // Current environment base URL
  BASE_URL: 'http://localhost:5000/api/pdf'
};

export const FILE_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: ['application/pdf'],
  ACCEPTED_EXTENSIONS: ['.pdf']
};

export const UI_CONFIG = {
  TOAST_DURATION: 3000,
  LOADING_TIMEOUT: 30000
};
