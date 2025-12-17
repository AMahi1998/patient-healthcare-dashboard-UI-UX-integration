const API_USERNAME = 'coalition';
const API_PASSWORD = 'skills-test';
const API_BASE = 'https://fedskillstest.coalitiontechnologies.workers.dev';

export interface BloodPressure {
  systolic: { value: number; levels: string };
  diastolic: { value: number; levels: string };
}

export interface VitalSigns {
  value: number;
  levels: string;
}

export interface DiagnosisRecord {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
  heart_rate: VitalSigns;
  respiratory_rate: VitalSigns;
  temperature: VitalSigns;
}

export interface Diagnostic {
  name: string;
  description: string;
  status: string;
}

export interface PatientData {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisRecord[];
  diagnostic_list: Diagnostic[];
  lab_results: string[];
}

// Fallback sample data if API fails
const SAMPLE_DATA: PatientData[] = [
  {
    name: 'Jessica Taylor',
    gender: 'Female',
    age: 28,
    profile_picture: 'https://fedskillstest.ct.digital/4.png',
    date_of_birth: '1996-08-23',
    phone_number: '(415) 555-1234',
    emergency_contact: '(415) 555-5678',
    insurance_type: 'Sunrise Health Assurance',
    diagnosis_history: [
      {
        month: 'March',
        year: 2024,
        blood_pressure: {
          systolic: { value: 160, levels: 'Higher than Average' },
          diastolic: { value: 78, levels: 'Lower than Average' }
        },
        heart_rate: { value: 78, levels: 'Lower than Average' },
        respiratory_rate: { value: 20, levels: 'Normal' },
        temperature: { value: 98.6, levels: 'Normal' }
      },
      {
        month: 'April',
        year: 2024,
        blood_pressure: {
          systolic: { value: 155, levels: 'Higher than Average' },
          diastolic: { value: 76, levels: 'Lower than Average' }
        },
        heart_rate: { value: 76, levels: 'Lower than Average' },
        respiratory_rate: { value: 18, levels: 'Normal' },
        temperature: { value: 98.4, levels: 'Normal' }
      },
      {
        month: 'May',
        year: 2024,
        blood_pressure: {
          systolic: { value: 150, levels: 'Higher than Average' },
          diastolic: { value: 74, levels: 'Normal' }
        },
        heart_rate: { value: 72, levels: 'Normal' },
        respiratory_rate: { value: 16, levels: 'Normal' },
        temperature: { value: 98.5, levels: 'Normal' }
      }
    ],
    diagnostic_list: [
      { name: 'Hypertension', description: 'Elevated blood pressure condition', status: 'Active' },
      { name: 'Type 2 Diabetes', description: 'Metabolic disorder affecting blood sugar', status: 'Active' },
      { name: 'Asthma', description: 'Chronic respiratory condition', status: 'Controlled' }
    ],
    lab_results: ['Blood Tests', 'CT Scans', 'MRI Results']
  }
];

export async function fetchPatients(): Promise<PatientData[]> {
  if (API_BASE) {
    try {
      const auth = btoa(`${API_USERNAME}:${API_PASSWORD}`);
      const response = await fetch(`${API_BASE}/patients`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched patients from API:', data);
        return Array.isArray(data) ? data : [data];
      } else {
        console.error(`API Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error('API fetch failed:', err);
    }
  }
  
  console.log('Using fallback sample data');
  return SAMPLE_DATA;
}

export async function fetchPatientDetails(patientId: string | number): Promise<PatientData | null> {
  if (API_BASE) {
    try {
      const auth = btoa(`${API_USERNAME}:${API_PASSWORD}`);
      const response = await fetch(`${API_BASE}/patients/${patientId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched patient details from API:', data);
        return data;
      } else {
        console.error(`API Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error('API fetch failed:', err);
    }
  }
  
  return null;
}

export function findJessica(patients: PatientData[]): PatientData {
  return patients.find(p => p.name === 'Jessica Taylor') || patients[0];
}
