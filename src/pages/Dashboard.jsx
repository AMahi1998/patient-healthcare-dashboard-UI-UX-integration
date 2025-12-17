import Sidebar from "../components/Sidebar";
import PatientList from "../components/PatientList";
import DiagnosisChart from "../components/DiagnosisChart";
import DiagnosticList from "../components/DiagnosticList";
import PatientProfile from "../components/PatientProfile";
import LabResults from "../components/LabResults";
import { getJessicaTaylorData, getPatientByName } from "../services/patientService";
import { useState, useEffect } from "react";
import birthIcon from '../images/BirthIcon.svg';
import femaleIcon from '../images/FemaleIcon.svg';
import maleIcon from '../images/MaleIcon.svg';
import phoneIcon from '../images/PhoneIcon.svg';
import insuranceIcon from '../images/InsuranceIcon.svg';
import emergencyIcon from '../images/emergency-contact-icon.svg';

export default function Dashboard() {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatientName, setSelectedPatientName] = useState("Jessica Taylor");

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        setLoading(true);
        const data = await getPatientByName(selectedPatientName);
        console.log('Loaded patient:', selectedPatientName, data);
        setPatientData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load patient data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPatientData();
  }, [selectedPatientName]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Sidebar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <p>Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Sidebar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Sidebar />

      <div style={{ display: 'flex', flex: 1, gap: '20px', padding: '20px', backgroundColor: '#F5F5F5', overflow: 'hidden' }}>
        {/* Left Column - Patient List */}
        <div style={{ 
          flex: '0 0 20%', 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: 0
        }}>
          <PatientList onSelectPatient={setSelectedPatientName} selectedPatient={selectedPatientName} />
        </div>

        {/* Center Column - Diagnosis & Diagnostic List */}
        <div style={{ 
          flex: '0 0 45%', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          minHeight: 0
        }}>
          <DiagnosisChart patientData={patientData} />
          <DiagnosticList patientData={patientData} />
        </div>

        {/* Right Column - Patient Profile & Lab Results */}
        <div style={{ 
          flex: '0 0 35%', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          minHeight: 0,
          overflow: 'auto',
          backgroundColor: 'transparent'
        }}>
          {/* Patient Profile Box - Fixed height */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E5E7EB',
            flexShrink: 0,
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Profile Picture and Name */}
            <div style={{
              textAlign: 'center',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #E5E7EB'
            }}>
              <img
                src={patientData?.profile_picture || require("../images/Jessica.png")}
                alt={patientData?.name || "Jessica Taylor"}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '2px solid #E5E7EB',
                  marginBottom: '12px'
                }}
              />
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1F2937',
                margin: '0'
              }}>{patientData?.name || 'Jessica Taylor'}</h3>
            </div>

            {/* Profile Details */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              fontSize: '12px',
              color: '#6B7280',
              scrollbarWidth: 'thin',
              scrollbarColor: '#D1D5DB #F3F4F6'
            }} className="custom-scrollbar">
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={birthIcon} alt="DOB" style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500', minWidth: '50px' }}>DOB:</span> 
                <span style={{ flex: 1 }}>{patientData?.date_of_birth || 'Aug 23, 1996'}</span>
              </div>
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={patientData?.gender?.toLowerCase() === 'male' ? maleIcon : femaleIcon} alt="Gender" style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500', minWidth: '50px' }}>Gender:</span> 
                <span style={{ flex: 1 }}>{patientData?.gender || 'Female'}</span>
              </div>
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={phoneIcon} alt="Contact" style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500', minWidth: '50px' }}>Contact:</span> 
                <span style={{ flex: 1 }}>{patientData?.phone_number || '(415) 555-1234'}</span>
              </div>
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={phoneIcon} alt="Emergency" style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500', minWidth: '50px' }}>Emergency:</span> 
                <span style={{ flex: 1 }}>{patientData?.emergency_contact || '(415) 555-5678'}</span>
              </div>
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={insuranceIcon} alt="Insurance" style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500', minWidth: '50px' }}>Insurance:</span> 
                <span style={{ flex: 1 }}>{patientData?.insurance_type || 'Sunrise Health Assurance'}</span>
              </div>
            </div>

            {/* Show All Information Button */}
            <button style={{
              marginTop: '12px',
              padding: '10px 16px',
              backgroundColor: '#14B8A6',
              border: 'none',
              borderRadius: '24px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              width: '100%',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0D9488';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#14B8A6';
              e.target.style.transform = 'translateY(0)';
            }}>
              ⬇ Show All Information
            </button>
          </div>
          
          {/* Lab Results Box */}
          <LabResults patientData={patientData} />
        </div>
      </div>
    </div>
  );
}
