// API credentials from env only - never hardcoded
const API_URL = process.env.REACT_APP_API_BASE_URL;
const USERNAME = process.env.REACT_APP_API_USERNAME;
const PASSWORD = process.env.REACT_APP_API_PASSWORD;

if (!API_URL || !USERNAME || !PASSWORD) {
  throw new Error('Missing API credentials in .env');
}

const createAuthHeader = () => {
  const credentials = `${USERNAME}:${PASSWORD}`;
  const encodedCredentials = btoa(credentials);
  return `Basic ${encodedCredentials}`;
};

// Get all patients
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

// Get patient by name
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

// Get Jessica's data (default patient)
export const getJessicaTaylorData = async () => {
  return getPatientByName('Jessica Taylor');
};
