import { useState, useEffect, useCallback, FC, CSSProperties } from "react";
import Sidebar from "../components/Sidebar";
import PatientList from "../components/PatientList";
import DiagnosisChart from "../components/DiagnosisChart";
import DiagnosticList from "../components/DiagnosticList";
import LabResults from "../components/LabResults";
import { getPatientByName } from "../services/patientService";
import { ASSETS } from "../constants/assets";
import { COLORS, SPACING, FLEX_RATIOS } from "../constants/theme";
import { componentLogger, apiLogger } from "../utils/logger";
import PatientProfile from "../components/PatientProfile";

const JESSICA_DEFAULT_DATA = {
  name: 'Jessica Taylor',
  profile_picture: null,
  date_of_birth: 'Aug 23, 1996',
  gender: 'Female',
  phone_number: '(415) 555-1234',
  emergency_contact: '(415) 555-5678',
  insurance_type: 'Sunrise Health Assurance',
  age: 28,
  diagnosis_history: [
    {
      month: 'October',
      year: 2023,
      blood_pressure: { systolic: { value: 120 }, diastolic: { value: 80 } },
      respiratory_rate: { value: 16 },
      temperature: { value: 98.6 },
      heart_rate: { value: 78 }
    },
    {
      month: 'November',
      year: 2023,
      blood_pressure: { systolic: { value: 115 }, diastolic: { value: 65 } },
      respiratory_rate: { value: 15 },
      temperature: { value: 98.5 },
      heart_rate: { value: 76 }
    },
    {
      month: 'December',
      year: 2023,
      blood_pressure: { systolic: { value: 155 }, diastolic: { value: 95 } },
      respiratory_rate: { value: 18 },
      temperature: { value: 99.2 },
      heart_rate: { value: 85 }
    },
    {
      month: 'January',
      year: 2024,
      blood_pressure: { systolic: { value: 110 }, diastolic: { value: 85 } },
      respiratory_rate: { value: 14 },
      temperature: { value: 98.4 },
      heart_rate: { value: 72 }
    },
    {
      month: 'February',
      year: 2024,
      blood_pressure: { systolic: { value: 145 }, diastolic: { value: 70 } },
      respiratory_rate: { value: 17 },
      temperature: { value: 98.7 },
      heart_rate: { value: 80 }
    },
    {
      month: 'March',
      year: 2024,
      blood_pressure: { systolic: { value: 160 }, diastolic: { value: 78 } },
      respiratory_rate: { value: 16 },
      temperature: { value: 98.6 },
      heart_rate: { value: 78 }
    }
  ],
  lab_results: ['Blood Tests', 'CT Scans', 'Radiology Reports', 'X-Rays', 'Urine Test']
};

interface PatientData {
  name: string;
  age: number;
  gender: string;
  date_of_birth?: string;
  phone_number?: string;
  emergency_contact?: string;
  insurance_type?: string;
  profile_picture?: string;
}

const DEFAULT_PATIENT_NAME = "Jessica Taylor";

function formatDate(dateString: string): string {
  if (!dateString) return 'April 23, 1996';
  
  try {
    let date: Date;

    if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else if (dateString.includes('/')) {
      date = new Date(dateString);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    componentLogger.warn('Failed to format date', { dateString, error });
    return dateString;
  }
}

const Dashboard: FC = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatientName, setSelectedPatientName] = useState<string>(DEFAULT_PATIENT_NAME);

  const handleSelectPatient = useCallback((patientName: string) => {
    setSelectedPatientName(patientName);
  }, []);

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        setLoading(true);
        const data = await getPatientByName(selectedPatientName);
        apiLogger.info('Patient data loaded', { patient: selectedPatientName });
        setPatientData(data);
        setError(null);
      } catch (err) {
        componentLogger.error('Failed to load patient data, using Jessica as fallback', { error: err });
        setPatientData(JESSICA_DEFAULT_DATA);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    loadPatientData();
  }, [selectedPatientName]);

  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: '100%',
      height: '100vh',
      backgroundColor: '#F6F7F8',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden'
    },
    mainContent: {
      display: 'flex',
      flex: 1,
      gap: SPACING.md,
      padding: SPACING.md,
      overflow: 'hidden'
    },
    section: {
      backgroundColor: COLORS.white,
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      overflow: 'auto'
    },
    patientListSection: {
      flex: FLEX_RATIOS.list,
    },
    mainSection: {
      flex: FLEX_RATIOS.main,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: SPACING.md,
    },
    rightSection: {
      flex: FLEX_RATIOS.profile,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: SPACING.md,
      overflow: 'hidden',
      minHeight: 0
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100vh'
    },
    loadingMessage: {
      display: 'flex',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      flex: 1
    },
    errorMessage: {
      display: 'flex',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      flex: 1,
      color: COLORS.error || '#dc2626'
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Sidebar />
        <div style={styles.loadingMessage}>
          <p>Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.mainContent}>
        {/* Patient List Section */}
        <div style={{ ...styles.section, ...styles.patientListSection }}>
          <PatientList
            onSelectPatient={handleSelectPatient}
            selectedPatient={selectedPatientName}
          />
        </div>

        {/* Main Content Section */}
        <div style={{ ...styles.mainSection }}>
          <div style={{ ...styles.section, flex: '0 1 auto', overflow: 'visible' }}>
            <DiagnosisChart patientData={patientData} />
          </div>
          <div style={{ ...styles.section, flex: '1', overflow: 'auto' }}>
            <DiagnosticList patientData={patientData} />
          </div>
        </div>

        {/* Right Sidebar - Patient Profile */}
        <div style={styles.rightSection}>
          <div style={{ ...styles.section, flex: FLEX_RATIOS.profileTop, overflow: 'hidden' }}>
            <PatientProfile patientData={patientData} />
          </div>

          <div style={{ ...styles.section, flex: FLEX_RATIOS.profileBottom, overflow: 'hidden' }}>
            <LabResults patientData={patientData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
