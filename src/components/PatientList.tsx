import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useMemo, CSSProperties } from 'react';
import { ASSETS } from '../constants/assets';
import { COLORS, SPACING } from '../constants/theme';
import { fetchPatientData } from '../services/patientService';

const DEFAULT_PATIENTS = [
  { name: 'Emily Williams', age: 18, gender: 'Female' },
  { name: 'Ryan Johnson', age: 45, gender: 'Male' },
  { name: 'Jessica Taylor', age: 28, gender: 'Female' },
  { name: 'Brandon Mitchell', age: 54, gender: 'Male' },
  { name: 'Samantha Johnson', age: 56, gender: 'Female' },
  { name: 'Ashley Martinez', age: 54, gender: 'Female' },
  { name: 'Olivia Brown', age: 32, gender: 'Female' },
  { name: 'Tyler Davis', age: 19, gender: 'Male' },
  { name: 'Kevin Anderson', age: 30, gender: 'Male' },
  { name: 'Dylan Thompson', age: 56, gender: 'Male' },
  { name: 'Nathan Evans', age: 58, gender: 'Male' },
  { name: 'Mike Nolan', age: 31, gender: 'Male' }
];

function PatientList({ onSelectPatient, selectedPatient }) {
  const [allPatients, setAllPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatientData();
        if (Array.isArray(data) && data.length > 0) {
          setAllPatients(data.map(p => ({
            name: p.name,
            age: p.age,
            gender: p.gender,
            profile_picture: p.profile_picture
          })));
        } else {
          setAllPatients(DEFAULT_PATIENTS);
        }
      } catch {
        setAllPatients(DEFAULT_PATIENTS);
      }
    };
    loadPatients();
  }, []);

  const filteredPatients = useMemo(() => 
    allPatients.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [allPatients, search]
  );

  const handleSelectPatient = useCallback((patientName) => {
    if (onSelectPatient) {
      onSelectPatient(patientName);
    }
  }, [onSelectPatient]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Patients</h2>

      <div style={styles.searchContainer}>
        <img src={ASSETS.actions.search} alt="Search" style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.listContainer}>
        {filteredPatients.map((patient) => (
          <PatientItem
            key={patient.name}
            patient={patient}
            isSelected={selectedPatient === patient.name}
            onSelect={() => handleSelectPatient(patient.name)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * PatientItem - Individual patient list item
 */
function PatientItem({ patient, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        ...styles.patientItem,
        backgroundColor: isSelected ? '#E0F7F4' : '#FFFFFF',
        borderLeft: isSelected ? '4px solid #14B8A6' : '4px solid transparent'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = '#F9FAFB';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = '#FFFFFF';
        }
      }}
    >
      <img
        src={patient.profile_picture || ASSETS.profiles.jessica}
        alt={patient.name}
        style={styles.patientImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = ASSETS.profiles.jessica;
        }}
      />
      <div style={styles.patientInfo}>
        <p style={styles.patientName}>{patient.name}</p>
        <p style={styles.patientMeta}>{patient.gender}, {patient.age}</p>
      </div>
      <img
        src={ASSETS.navigation.horizontalSelect}
        alt="More"
        style={styles.moreIcon}
      />
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: COLORS.background.white,
    borderRadius: '8px',
    padding: SPACING.lg,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: `1px solid ${COLORS.border.light}`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: 0
  },
  title: {
    fontFamily: 'Manrope, sans-serif',
    fontSize: '14px',
    fontWeight: '800',
    lineHeight: '33px',
    color: COLORS.primary.dark,
    marginBottom: SPACING.lg,
    width: '207px',
    height: '33px',
    display: 'flex',
    alignItems: 'center',
    margin: 0
  },
  searchContainer: {
    marginBottom: SPACING.lg,
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: SPACING.md,
    color: COLORS.text.secondary,
    flexShrink: 0
  },
  searchInput: {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    border: `1px solid ${COLORS.border.light}`,
    borderRadius: '8px',
    backgroundColor: '#F9FAFB',
    fontSize: '14px',
    outline: 'none'
  },
  listContainer: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: SPACING.md,
    scrollbarWidth: 'thin',
    scrollbarColor: '#072635 #E3E4E6'
  },
  patientItem: {
    padding: SPACING.lg,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.lg
  },
  patientImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    flexShrink: 0
  },
  patientInfo: {
    flex: 1
  },
  patientName: {
    fontWeight: '500',
    color: COLORS.text.primary,
    margin: 0,
    fontSize: '10px',
    height: '19px',
    display: 'flex',
    alignItems: 'center'
  },
  patientMeta: {
    fontSize: '9px',
    color: COLORS.text.secondary,
    margin: '2px 0 0 0'
  },
  moreIcon: {
    width: '18px',
    height: '4px',
    cursor: 'pointer'
  }
};

PatientList.propTypes = {
  onSelectPatient: PropTypes.func.isRequired,
  selectedPatient: PropTypes.string
};

PatientItem.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    profile_picture: PropTypes.string
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default PatientList;
