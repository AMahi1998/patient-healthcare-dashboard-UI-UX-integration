export default function DiagnosticList({ patientData }) {
  const defaultDiagnostics = [
    {
      problem: 'Hypertension',
      description: 'Chronic high blood pressure',
      status: 'Under Observation'
    },
    {
      problem: 'Type 2 Diabetes',
      description: 'Insulin resistance and elevated blood sugar',
      status: 'Cured'
    },
    {
      problem: 'Asthma',
      description: 'Recurrent episodes of bronchial constriction',
      status: 'Inactive'
    }
  ];

  // Use API diagnostic_list if available, otherwise use default
  const diagnostics = patientData?.diagnostic_list && Array.isArray(patientData.diagnostic_list)
    ? patientData.diagnostic_list.map(item => ({
        problem: item.name || item.problem || '',
        description: item.description || '',
        status: item.status || 'Unknown'
      }))
    : defaultDiagnostics;

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 0
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: '16px'
      }}>Diagnostic List</h3>
      <div style={{
        overflowX: 'auto',
        overflowY: 'auto',
        flex: 1,
        minHeight: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: '#D1D5DB #F3F4F6'
      }}
      className="custom-scrollbar">
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px'
        }}>
          <thead>
            <tr style={{
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB'
            }}>
              <th style={{
                textAlign: 'left',
                padding: '8px',
                fontWeight: '600',
                color: '#6B7280',
                fontSize: '11px'
              }}>Problem/Diagnosis</th>
              <th style={{
                textAlign: 'left',
                padding: '8px',
                fontWeight: '600',
                color: '#6B7280',
                fontSize: '11px'
              }}>Description</th>
              <th style={{
                textAlign: 'left',
                padding: '8px',
                fontWeight: '600',
                color: '#6B7280',
                fontSize: '11px'
              }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnostics.map((diagnostic, index) => (
              <tr 
                key={index} 
                style={{
                  borderBottom: '1px solid #E5E7EB',
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0FDFA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#FFFFFF' : '#F9FAFB';
                }}
              >
                <td style={{
                  padding: '8px',
                  color: '#1F2937',
                  fontWeight: '500',
                  fontSize: '12px'
                }}>{typeof diagnostic.problem === 'string' ? diagnostic.problem : JSON.stringify(diagnostic.problem)}</td>
                <td style={{
                  padding: '8px',
                  color: '#6B7280',
                  fontSize: '11px'
                }}>{typeof diagnostic.description === 'string' ? diagnostic.description : JSON.stringify(diagnostic.description)}</td>
                <td style={{
                  padding: '8px',
                  color: diagnostic.status === 'Under Observation' ? '#B45309' :
                         diagnostic.status === 'Cured' ? '#059669' : '#6B7280',
                  fontWeight: '500',
                  fontSize: '11px'
                }}>
                  {typeof diagnostic.status === 'string' ? diagnostic.status : JSON.stringify(diagnostic.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
