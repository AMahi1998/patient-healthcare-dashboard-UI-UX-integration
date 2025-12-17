const API_USERNAME = 'coalition';
const API_PASSWORD = 'skills-test';
const API_BASE = null;

const SAMPLE_DATA = [
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

export async function fetchPatients() {
  if (API_BASE) {
    try {
      const auth = btoa(`${API_USERNAME}:${API_PASSWORD}`);
      const response = await fetch(`${API_BASE}/patients`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.log('API fetch failed, using sample data:', err);
    }
  }
  return SAMPLE_DATA;
}

export function findJessica(patients) {
  return patients.find(p => p.name === 'Jessica Taylor') || patients[0];
}
