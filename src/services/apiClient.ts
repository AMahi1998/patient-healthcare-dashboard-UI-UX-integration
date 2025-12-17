/**
 * Axios API Client Configuration
 * Handles all HTTP requests to Coalition Technologies Patient Data API
 * with proper authentication, error handling, and interceptors
 */

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

// API Configuration from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fedskillstest.coalitiontechnologies.workers.dev';
const API_USERNAME = process.env.REACT_APP_API_USERNAME || 'coalition';
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD || 'skills-test';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10);

console.log('API Configuration:');
console.log('  Base URL:', API_BASE_URL);
console.log('  Username:', API_USERNAME);
console.log('  Environment:', process.env.NODE_ENV);

/**
 * Create and configure axios instance with basic auth
 */
function createApiClient(): AxiosInstance {
  // Generate Basic Auth header
  const credentials = `${API_USERNAME}:${API_PASSWORD}`;
  const encodedCredentials = btoa(credentials);

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encodedCredentials}`,
    },
  });

  /**
   * Request Interceptor
   * Logs outgoing requests for debugging
   */
  instance.interceptors.request.use(
    (config) => {
      console.log(`📤 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ [Request Error]', error);
      return Promise.reject(error);
    }
  );

  /**
   * Response Interceptor
   * Handles successful responses and errors
   */
  instance.interceptors.response.use(
    (response) => {
      console.log(`✅ [API Response] ${response.status} ${response.config.url}`);
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        // Server responded with error status
        console.error(`❌ [API Error] ${error.response.status}:`, error.response.data);
      } else if (error.request) {
        // Request was made but no response
        console.error('❌ [Network Error] No response from server:', error.request);
      } else {
        // Error in request setup
        console.error('❌ [Setup Error]', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// Create singleton instance
const apiClient = createApiClient();

/**
 * API Endpoints
 */
export const endpoints = {
  patients: '/patients',
  patientById: (id: string | number) => `/patients/${id}`,
  patientMedicalHistory: (id: string | number) => `/patients/${id}/medical-history`,
  patientLabResults: (id: string | number) => `/patients/${id}/lab-results`,
};

/**
 * API Service Methods
 */
export const patientAPI = {
  /**
   * Get all patients
   * GET /patients
   */
  getAllPatients: () => apiClient.get(endpoints.patients),

  /**
   * Get specific patient by ID
   * GET /patients/{id}
   */
  getPatient: (id: string | number) => apiClient.get(endpoints.patientById(id)),

  /**
   * Get patient medical history
   * GET /patients/{id}/medical-history
   */
  getMedicalHistory: (id: string | number) => apiClient.get(endpoints.patientMedicalHistory(id)),

  /**
   * Get patient lab results
   * GET /patients/{id}/lab-results
   */
  getLabResults: (id: string | number) => apiClient.get(endpoints.patientLabResults(id)),
};

export default apiClient;
