// Patient Service for API calls
const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const USERNAME = 'coalition';
const PASSWORD = 'skills-test';

// Create Basic Auth header
const createAuthHeader = () => {
  const credentials = `${USERNAME}:${PASSWORD}`;
  const encodedCredentials = btoa(credentials);
  return `Basic ${encodedCredentials}`;
};

export const fetchPatientData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': createAuthHeader(),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching patient data:', error);
    throw error;
  }
};

// Get specific patient by name
export const getPatientByName = async (patientName: string) => {
  try {
    const allPatients = await fetchPatientData();
    const patient = allPatients.find((p: any) => p.name.toLowerCase() === patientName.toLowerCase());
    return patient;
  } catch (error) {
    console.error('Error getting patient:', error);
    throw error;
  }
};

// Get Jessica Taylor's data (default patient for the dashboard)
export const getJessicaTaylorData = async () => {
  return getPatientByName('Jessica Taylor');
};
