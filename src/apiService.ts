/**
 * API Service for Coalition Technologies Patient Data API
 * 
 * Base URL: https://fedskillstest.coalitiontechnologies.workers.dev
 * Authentication: Basic Auth
 * Username: coalition
 * Password: skills-test
 */

import { PatientData } from './api';

const API_BASE = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const API_USERNAME = 'coalition';
const API_PASSWORD = 'skills-test';

/**
 * Get the Basic Auth header value
 */
function getAuthHeader(): string {
  const credentials = `${API_USERNAME}:${API_PASSWORD}`;
  return `Basic ${btoa(credentials)}`;
}

/**
 * Make an authenticated API request
 */
async function makeApiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': getAuthHeader(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`API Request failed for ${endpoint}:`, message);
    throw error;
  }
}

/**
 * API Service methods
 */
export const apiService = {
  /**
   * Fetch all patients
   * GET /patients
   */
  async getPatients(): Promise<PatientData[]> {
    try {
      const data = await makeApiRequest<PatientData[]>('/patients');
      console.log('✓ Successfully fetched patients from API');
      return data;
    } catch (error) {
      console.error('✗ Failed to fetch patients:', error);
      throw error;
    }
  },

  /**
   * Fetch a specific patient by ID
   * GET /patients/{id}
   */
  async getPatient(patientId: string | number): Promise<PatientData> {
    try {
      const data = await makeApiRequest<PatientData>(`/patients/${patientId}`);
      console.log(`✓ Successfully fetched patient ${patientId} from API`);
      return data;
    } catch (error) {
      console.error(`✗ Failed to fetch patient ${patientId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch patient medical history
   * GET /patients/{id}/medical-history
   */
  async getPatientMedicalHistory(patientId: string | number) {
    try {
      const data = await makeApiRequest(`/patients/${patientId}/medical-history`);
      console.log(`✓ Successfully fetched medical history for patient ${patientId}`);
      return data;
    } catch (error) {
      console.error(`✗ Failed to fetch medical history for patient ${patientId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch patient lab results
   * GET /patients/{id}/lab-results
   */
  async getPatientLabResults(patientId: string | number) {
    try {
      const data = await makeApiRequest(`/patients/${patientId}/lab-results`);
      console.log(`✓ Successfully fetched lab results for patient ${patientId}`);
      return data;
    } catch (error) {
      console.error(`✗ Failed to fetch lab results for patient ${patientId}:`, error);
      throw error;
    }
  },

  /**
   * Test API connectivity and authentication
   */
  async testConnection(): Promise<boolean> {
    try {
      await makeApiRequest('/patients');
      console.log('✓ API connection successful');
      return true;
    } catch (error) {
      console.error('✗ API connection failed:', error);
      return false;
    }
  },
};

export default apiService;
