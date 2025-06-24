import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found.');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw error;
  }
);

// API methods
export const pdfAPI = {
  // Upload PDF file
  uploadPDF: async (file) => {
    const formData = new FormData();
    formData.append('pdfFile', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  // Get all uploaded PDFs
  getAllPDFs: async () => {
    const response = await api.get('/files');
    return response.data;
  },

  // Get PDF file for viewing
  getPDFFile: (filename) => {
    return `${API_CONFIG.BASE_URL}/files/${filename}`;
  },

  // Extract pages from PDF
  extractPages: async (filename, pages) => {
    const response = await api.post(`/extract/${filename}`, { pages });
    return response.data;
  },

  // Get extracted PDFs
  getExtractedPDFs: async () => {
    const response = await api.get('/extracted');
    return response.data;
  },

  // Download extracted PDF
  downloadExtractedPDF: (filename) => {
    return `${API_CONFIG.BASE_URL}/extracted/${filename}`;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;
