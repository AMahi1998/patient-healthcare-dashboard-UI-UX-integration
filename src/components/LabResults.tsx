import { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { ASSETS } from '../constants/assets';
import { COLORS, SPACING } from '../constants/theme';

const DEFAULT_LAB_TESTS = [
  { name: 'Blood Tests', icon: ASSETS.actions.download },
  { name: 'CT Scans', icon: ASSETS.actions.download },
  { name: 'Radiology Reports', icon: ASSETS.actions.download },
  { name: 'X-Rays', icon: ASSETS.actions.download },
  { name: 'Urine Test', icon: ASSETS.actions.download }
];

function LabResults({ patientData }) {
  const labTests = getLabTests(patientData);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Lab Results</h3>
      <div style={styles.listContainer}>
        {labTests.map((test, index) => (
          <LabTestItem key={index} test={test} />
        ))}
      </div>
    </div>
  );
}


function LabTestItem({ test }) {
  return (
    <div
      style={styles.testItem}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F0FDFA';
        e.currentTarget.style.borderColor = '#14B8A6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#FFFFFF';
        e.currentTarget.style.borderColor = COLORS.border.light;
      }}
    >
      <span style={styles.testName}>{test.name}</span>
      <img src={test.icon} alt="Download" style={styles.downloadIcon} />
    </div>
  );
}


function getLabTests(patientData) {
  if (!patientData?.lab_results) {
    return DEFAULT_LAB_TESTS;
  }

  try {
    if (typeof patientData.lab_results === 'object' && !Array.isArray(patientData.lab_results)) {
      return Object.entries(patientData.lab_results).map(([testName, testValue]: [string, any]) => ({
        name: testName.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        value: (testValue as any)?.value || testValue,
        icon: ASSETS.actions.download
      }));
    }

    if (Array.isArray(patientData.lab_results)) {
      return patientData.lab_results.map((testName) => ({
        name: typeof testName === 'string'
          ? testName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : 'Lab Test',
        icon: ASSETS.actions.download
      }));
    }
  } catch {
    return DEFAULT_LAB_TESTS;
  }

  return DEFAULT_LAB_TESTS;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: 'transparent',
    borderRadius: '0px',
    padding: SPACING.lg,
    display: 'flex',
    flexDirection: 'column' as const,
    flex: '1',
    minHeight: 0,
    overflow: 'hidden',
    height: '100%',
    boxShadow: 'none',
    border: 'none'
  },
  title: {
    fontFamily: 'Manrope, sans-serif',
    fontSize: '14px',
    fontWeight: '800',
    lineHeight: '33px',
    color: COLORS.primary.dark,
    marginBottom: SPACING.xs,
    flexShrink: 0,
    width: '207px',
    height: '33px',
    display: 'flex',
    alignItems: 'center',
    margin: 0
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: SPACING.xs,
    flex: 1,
    minHeight: 0,
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingRight: '2px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#072635 #E3E4E6'
  },
  testItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${SPACING.md} ${SPACING.lg}`,
    border: `1px solid ${COLORS.border.light}`,
    borderRadius: '8px',
    backgroundColor: COLORS.background.white,
    transition: 'all 0.15s',
    cursor: 'pointer'
  },
  testName: {
    color: COLORS.text.primary,
    fontWeight: '500',
    fontSize: '10px',
    height: '19px',
    display: 'flex',
    alignItems: 'center'
  },
  downloadIcon: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    color: '#14B8A6'
  }
};

LabResults.propTypes = {
  patientData: PropTypes.shape({
    lab_results: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  })
};

LabTestItem.propTypes = {
  test: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    value: PropTypes.any
  }).isRequired
};

export default LabResults;
