import PropTypes from 'prop-types';
import { CSSProperties } from 'react';
import { COLORS, SPACING } from '../constants/theme';

const DEFAULT_DIAGNOSTICS = [
  { problem: 'Hypertension', description: 'Chronic high blood pressure', status: 'Under Observation' },
  { problem: 'Type 2 Diabetes', description: 'Insulin resistance and elevated blood sugar', status: 'Cured' },
  { problem: 'Asthma', description: 'Recurrent episodes of bronchial constriction', status: 'Inactive' },
  { problem: 'Arthritis', description: 'Inflammation of joints causing pain and stiffness', status: 'Under Observation' },
  { problem: 'Migraine', description: 'Severe headaches often accompanied by nausea', status: 'Cured' },
  { problem: 'Allergies', description: 'Immune system reactions to external substances', status: 'Inactive' },
  { problem: 'GERD', description: 'Gastroesophageal reflux disease', status: 'Under Observation' },
  { problem: 'Osteoarthritis', description: 'Degenerative joint disease affecting cartilage', status: 'Untreated' },
  { problem: 'Sinusitis', description: 'Inflammation of the sinus cavities', status: 'Cured' },
  { problem: 'Hyperlipidemia', description: 'High levels of lipids in the blood', status: 'Under Observation' },
  { problem: 'Heart Murmur', description: 'Sounds during heartbeat cycle made by turbulent blood', status: 'Untreated' },
  { problem: 'Type 1 Diabetes', description: 'Pancreas produces little or no insulin', status: 'Actively being treated' },
  { problem: 'Thyroid Disorder', description: 'Abnormal thyroid hormone production', status: 'Untreated' },
  { problem: 'Ulcers', description: 'Open sores in the stomach lining', status: 'Cured' }
];

function DiagnosticList({ patientData }) {
  const diagnostics = getDiagnosticsList(patientData);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Diagnostic List</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Problem/Diagnosis</th>
              <th style={styles.headerCell}>Description</th>
              <th style={styles.headerCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnostics.map((diagnostic, index) => (
              <DiagnosticRow
                key={index}
                diagnostic={diagnostic}
                isAlternate={index % 2 === 0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * DiagnosticRow - Individual diagnostic table row
 */
function DiagnosticRow({ diagnostic, isAlternate }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Observation':
        return '#B45309';
      case 'Cured':
        return '#059669';
      default:
        return COLORS.text.secondary;
    }
  };

  return (
    <tr
      style={{
        ...styles.bodyRow,
        backgroundColor: isAlternate ? '#FFFFFF' : '#F9FAFB'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F0FDFA';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isAlternate ? '#FFFFFF' : '#F9FAFB';
      }}
    >
      <td style={styles.cell}>
        {typeof diagnostic.problem === 'string' ? diagnostic.problem : JSON.stringify(diagnostic.problem)}
      </td>
      <td style={{ ...styles.cell, ...styles.descriptionCell }}>
        {typeof diagnostic.description === 'string' ? diagnostic.description : JSON.stringify(diagnostic.description)}
      </td>
      <td style={{ ...styles.cell, color: getStatusColor(diagnostic.status) }}>
        {typeof diagnostic.status === 'string' ? diagnostic.status : JSON.stringify(diagnostic.status)}
      </td>
    </tr>
  );
}

/**
 * Extract diagnostic list from patient data
 */
function getDiagnosticsList(patientData) {
  if (patientData?.diagnostic_list && Array.isArray(patientData.diagnostic_list)) {
    return patientData.diagnostic_list.map(item => ({
      problem: item.name || item.problem || '',
      description: item.description || '',
      status: item.status || 'Unknown'
    }));
  }
  return DEFAULT_DIAGNOSTICS;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: COLORS.background.white,
    borderRadius: '8px',
    padding: SPACING.lg,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: `1px solid ${COLORS.border.light}`,
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    height: '100%'
  },
  title: {
    fontFamily: 'Manrope, sans-serif',
    fontSize: '14px',
    fontWeight: '800',
    lineHeight: '33px',
    color: COLORS.primary.dark,
    marginBottom: SPACING.sm,
    flexShrink: 0,
    width: '207px',
    height: '33px',
    display: 'flex',
    alignItems: 'center',
    margin: 0
  },
  tableContainer: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    paddingRight: '2px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#072635 #E3E4E6'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '8px',
    minWidth: '100%'
  },
  headerRow: {
    borderBottom: `1px solid ${COLORS.border.light}`,
    backgroundColor: '#F9FAFB'
  },
  headerCell: {
    textAlign: 'left',
    padding: `${SPACING.sm} ${SPACING.md}`,
    fontWeight: '600',
    color: COLORS.text.secondary,
    fontSize: '8px'
  },
  bodyRow: {
    borderBottom: `1px solid ${COLORS.border.light}`,
    transition: 'background-color 0.15s',
    height: '36px'
  },
  cell: {
    padding: SPACING.md,
    color: COLORS.text.primary,
    fontWeight: '500',
    fontSize: '8px'
  },
  descriptionCell: {
    fontSize: '7px',
    color: COLORS.text.secondary,
    fontWeight: '400'
  }
};

DiagnosticList.propTypes = {
  patientData: PropTypes.shape({
    diagnostic_list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        problem: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string
      })
    )
  })
};

DiagnosticRow.propTypes = {
  diagnostic: PropTypes.shape({
    problem: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired,
  isAlternate: PropTypes.bool.isRequired
};

export default DiagnosticList;
