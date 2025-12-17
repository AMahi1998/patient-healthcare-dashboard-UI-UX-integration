import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import HorizontalSelectIcon from "../images/Horizontal select.svg";
import { fetchPatientData } from "../services/patientService";

const localPatients = [
  { name: "Emily Williams", age: 18, gender: "Female" },
  { name: "Ryan Johnson", age: 45, gender: "Male" },
  { name: "Jessica Taylor", age: 28, gender: "Female" },
  { name: "Brandon Mitchell", age: 54, gender: "Male" },
  { name: "Samantha Johnson", age: 56, gender: "Female" },
  { name: "Ashley Martinez", age: 54, gender: "Female" },
  { name: "Olivia Brown", age: 32, gender: "Female" },
  { name: "Tyler Davis", age: 19, gender: "Male" },
  { name: "Kevin Anderson", age: 30, gender: "Male" },
  { name: "Dylan Thompson", age: 56, gender: "Male" },
  { name: "Nathan Evans", age: 58, gender: "Male" },
  { name: "Mike Nolan", age: 31, gender: "Male" },
];

export default function PatientList({ onSelectPatient, selectedPatient }) {
  const [allPatients, setAllPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const data = await fetchPatientData();
        console.log('Fetched patients from API:', data);
        if (Array.isArray(data) && data.length > 0) {
          const formattedPatients = data.map(p => ({
            name: p.name,
            age: p.age,
            gender: p.gender,
            profile_picture: p.profile_picture
          }));
          setAllPatients(formattedPatients);
        } else {
          console.log('No API data, using local patients');
          setAllPatients(localPatients);
        }
      } catch (err) {
        console.error('Failed to load all patients:', err);
        setAllPatients(localPatients);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const filtered = allPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectPatient = (patient) => {
    console.log('Selected patient clicked:', patient.name);
    if (onSelectPatient) {
      console.log('Calling onSelectPatient callback with:', patient.name);
      onSelectPatient(patient.name);
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E5E7EB',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '16px',
        color: '#1F2937'
      }}>Patients</h2>

      <div style={{
        marginBottom: '16px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', color: '#9CA3AF', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            paddingLeft: '40px',
            paddingRight: '16px',
            paddingTop: '8px',
            paddingBottom: '8px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            backgroundColor: '#F9FAFB',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#D1D5DB #F3F4F6'
      }}
      className="custom-scrollbar">
        {filtered.map((p) => (
          <div
            key={p.name}
            onClick={() => handleSelectPatient(p)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              backgroundColor: selectedPatient === p.name ? '#E0F7F4' : '#FFFFFF',
              borderLeft: selectedPatient === p.name ? '4px solid #14B8A6' : '4px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              if (selectedPatient !== p.name) {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPatient !== p.name) {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }
            }}
          >
            <img 
              src={p.profile_picture || 'https://via.placeholder.com/40'}
              alt={p.name} 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%'
              }} 
            />
            <div style={{ flex: 1 }}>
              <p style={{
                fontWeight: '500',
                color: '#1F2937',
                margin: '0',
                fontSize: '14px'
              }}>{p.name}</p>
              <p style={{
                fontSize: '12px',
                color: '#6B7280',
                margin: '4px 0 0 0'
              }}>{p.gender}, {p.age}</p>
            </div>
            <img 
              src={HorizontalSelectIcon}
              alt="More options"
              style={{
                width: '18px',
                height: '4px',
                cursor: 'pointer'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
