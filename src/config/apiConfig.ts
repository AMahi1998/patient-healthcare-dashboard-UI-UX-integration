// API endpoints and configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Patient endpoints
  PATIENTS: {
    GET_ALL: `${API_BASE_URL}/patients`,
    GET_BY_ID: (id) => `${API_BASE_URL}/patients/${id}`,
    CREATE: `${API_BASE_URL}/patients`,
    UPDATE: (id) => `${API_BASE_URL}/patients/${id}`,
    DELETE: (id) => `${API_BASE_URL}/patients/${id}`
  },

  // Diagnosis endpoints
  DIAGNOSIS: {
    GET_ALL: `${API_BASE_URL}/diagnosis`,
    GET_BY_PATIENT: (patientId) => `${API_BASE_URL}/patients/${patientId}/diagnosis`,
    CREATE: `${API_BASE_URL}/diagnosis`,
    UPDATE: (id) => `${API_BASE_URL}/diagnosis/${id}`,
    DELETE: (id) => `${API_BASE_URL}/diagnosis/${id}`
  },

  // Lab results endpoints
  LAB_RESULTS: {
    GET_ALL: `${API_BASE_URL}/lab-results`,
    GET_BY_PATIENT: (patientId) => `${API_BASE_URL}/patients/${patientId}/lab-results`,
    DOWNLOAD: (resultId) => `${API_BASE_URL}/lab-results/${resultId}/download`
  },

  // Health metrics endpoints
  HEALTH_METRICS: {
    GET_LATEST: (patientId) => `${API_BASE_URL}/patients/${patientId}/health-metrics`,
    GET_HISTORY: (patientId) => `${API_BASE_URL}/patients/${patientId}/health-metrics/history`,
    CREATE: `${API_BASE_URL}/health-metrics`
  }
};

// Request timeout (ms)
export const REQUEST_TIMEOUT = 30000;

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // ms
  retryableStatus: [408, 429, 500, 502, 503, 504]
};

// Cache duration for different data types (ms)
export const CACHE_DURATION = {
  PATIENTS: 5 * 60 * 1000,      // 5 minutes
  DIAGNOSIS: 5 * 60 * 1000,     // 5 minutes
  LAB_RESULTS: 10 * 60 * 1000,  // 10 minutes
  HEALTH_METRICS: 2 * 60 * 1000 // 2 minutes
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

// Error Messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Invalid data provided.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

/**
 * Get error message for status code
 * @param {Number} status - HTTP status code
 * @returns {String} Error message
 */
export const getErrorMessage = (status) => {
  const statusMap = {
    [HTTP_STATUS.NOT_FOUND]: API_ERROR_MESSAGES.NOT_FOUND,
    [HTTP_STATUS.UNAUTHORIZED]: API_ERROR_MESSAGES.UNAUTHORIZED,
    [HTTP_STATUS.FORBIDDEN]: API_ERROR_MESSAGES.FORBIDDEN,
    [HTTP_STATUS.BAD_REQUEST]: API_ERROR_MESSAGES.VALIDATION_ERROR,
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: API_ERROR_MESSAGES.SERVER_ERROR,
    [HTTP_STATUS.SERVICE_UNAVAILABLE]: API_ERROR_MESSAGES.SERVER_ERROR,
    [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too many requests. Please try again later.'
  };

  return statusMap[status] || API_ERROR_MESSAGES.UNKNOWN_ERROR;
};
