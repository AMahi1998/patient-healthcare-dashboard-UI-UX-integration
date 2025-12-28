import { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { ASSETS, getGenderIcon } from '../constants/assets';
import { COLORS, SPACING, DIMENSIONS } from '../constants/theme';

const DEFAULT_PATIENT = {
  name: 'Jessica Taylor',
  profile_picture: null,
  date_of_birth: 'Aug 23, 1996',
  gender: 'Female',
  phone_number: '(415) 555-1234',
  emergency_contact: '(415) 555-5678',
  insurance_type: 'Sunrise Health Assurance',
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

const PATIENT_INFO_FIELDS = [
  { key: 'date_of_birth', label: 'Date Of Birth', icon: ASSETS.health.birth },
  { key: 'gender', label: 'Gender', icon: null, isIcon: true },
  { key: 'phone_number', label: 'Contact Info.', icon: ASSETS.health.phone },
  { key: 'emergency_contact', label: 'Emergency Contacts', icon: ASSETS.health.phone },
  { key: 'insurance_type', label: 'Insurance Provider', icon: ASSETS.health.insurance }
];

function PatientProfile({ patientData }) {
  const patient = patientData || DEFAULT_PATIENT;
  const genderIcon = getGenderIcon(patient.gender);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src={patient.profile_picture || ASSETS.profiles.jessica}
          alt={patient.name}
          style={styles.profileImage}
          onError={(e) => {
            (e.target as HTMLImageElement).src = ASSETS.profiles.jessica;
          }}
        />
        <h3 style={styles.patientName}>{patient.name}</h3>
      </div>

      <div style={styles.detailsContainer}>
        {PATIENT_INFO_FIELDS.map((field) => (
          <PatientDetailRow
            key={field.key}
            label={field.label}
            value={patient[field.key]}
            icon={field.isIcon ? genderIcon : field.icon}
          />
        ))}
      </div>

      <button style={styles.showAllButton}>
        Show All Information
      </button>
    </div>
  );
}

function PatientDetailRow({ label, value, icon }) {
  return (
    <div style={styles.detailRow}>
      {icon && <img src={icon} alt={label} style={styles.icon} />}
      <div style={styles.detailContent}>
        <p style={styles.detailLabel}>{label}</p>
        <p style={styles.detailValue}>{value}</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: 'transparent',
    borderRadius: '0px',
    boxShadow: 'none',
    border: 'none',
    flexShrink: 1,
    padding: SPACING.lg,
    minHeight: 0
  },
  header: {
    textAlign: 'center',
    marginBottom: SPACING.md,
    flexShrink: 0
  },
  profileImage: {
    width: DIMENSIONS.profilePhoto.medium,
    height: DIMENSIONS.profilePhoto.medium,
    borderRadius: '50%',
    margin: `0 auto ${SPACING.sm}`,
    border: `3px solid ${COLORS.border.light}`,
    objectFit: 'cover',
    display: 'block'
  },
  patientName: {
    fontFamily: 'Manrope, sans-serif',
    fontWeight: '800',
    color: COLORS.primary.dark,
    fontSize: '12px',
    lineHeight: '33px',
    letterSpacing: '0px',
    margin: 0,
    textAlign: 'center'
  },
  detailsContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: SPACING.sm,
    paddingRight: '2px'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingBottom: SPACING.xs,
    borderBottom: `1px solid ${COLORS.border.light}`
  },
  icon: {
    width: '22px',
    height: '22px',
    flexShrink: 0
  },
  detailContent: {
    minWidth: 0,
    flex: 1
  },
  detailLabel: {
    color: COLORS.text.secondary,
    fontSize: '8px',
    fontWeight: '500',
    margin: 0,
    fontFamily: 'Manrope, sans-serif'
  },
  detailValue: {
    fontWeight: '700',
    fontSize: '10px',
    margin: '2px 0 0 0',
    color: COLORS.primary.dark,
    fontFamily: 'Manrope, sans-serif'
  },
  showAllButton: {
    marginTop: SPACING.md,
    padding: `${SPACING.sm} ${SPACING.md}`,
    backgroundColor: '#01F0D0',
    border: 'none',
    borderRadius: '24px',
    color: '#000000',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    textAlign: 'center',
    flexShrink: 0
  }
};

PatientProfile.propTypes = {
  patientData: PropTypes.shape({
    name: PropTypes.string,
    profile_picture: PropTypes.string,
    date_of_birth: PropTypes.string,
    gender: PropTypes.string,
    phone_number: PropTypes.string,
    emergency_contact: PropTypes.string,
    insurance_type: PropTypes.string
  })
};

PatientDetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default PatientProfile;
