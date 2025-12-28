// @ts-nocheck
import { useState, useCallback } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const API_USERNAME = process.env.REACT_APP_API_USERNAME;
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD;

if (!API_BASE || !API_USERNAME || !API_PASSWORD) {
  console.error('Missing API credentials in .env');
}

export const usePatientData = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeader = useCallback(() => {
    const credentials = `${API_USERNAME}:${API_PASSWORD}`;
    return `Basic ${btoa(credentials)}`;
  }, []);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_BASE, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthHeader(),
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setPatients(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch patients';
      setError(errorMsg);
      console.error('Error fetching patients:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  const fetchPatientByName = useCallback(async (patientName) => {
    try {
      setLoading(true);
      setError(null);

      const allPatients = await fetchPatients();
      const patient = allPatients.find(p => p.name.toLowerCase() === patientName.toLowerCase());
      
      if (patient) {
        setCurrentPatient(patient);
        return patient;
      } else {
        throw new Error(`Patient ${patientName} not found`);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch patient';
      setError(errorMsg);
      console.error('Error fetching patient:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchPatients]);

  const clearData = useCallback(() => {
    setPatients([]);
    setCurrentPatient(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    patients,
    currentPatient,
    loading,
    error,
    fetchPatients,
    fetchPatientByName,
    clearData,
    clearError,
  };
};
