import downloadIcon from "../images/download-icon.svg";

export default function LabResults({ patientData }) {
  const defaultLabTests = [
    { name: 'Blood Tests', icon: downloadIcon },
    { name: 'CT Scans', icon: downloadIcon },
    { name: 'Radiology Reports', icon: downloadIcon },
    { name: 'X-Rays', icon: downloadIcon },
    { name: 'Urine Test', icon: downloadIcon }
  ];

  // Handle API lab_results 
  let labTests = defaultLabTests;
  if (patientData?.lab_results) {
    try {
      if (typeof patientData.lab_results === 'object' && !Array.isArray(patientData.lab_results)) {
        // If it's an object with test names as keys
        const labResultsObj = patientData.lab_results;
        labTests = Object.entries(labResultsObj).map(([testName, testValue]) => ({
          name: testName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: testValue?.value || testValue,
          icon: downloadIcon
        }));
      } else if (Array.isArray(patientData.lab_results)) {
        // If it's already an array of test names
        labTests = patientData.lab_results.map((testName) => ({
          name: typeof testName === 'string' 
            ? testName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            : 'Lab Test',
          icon: downloadIcon
        }));
      }
    } catch (err) {
      console.error('Error processing lab results:', err);
      labTests = defaultLabTests;
    }
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      minHeight: '150px',
      overflow: 'hidden'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: '16px',
        flexShrink: 0
      }}>Lab Results</h3>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
        minHeight: 0,
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#D1D5DB #F3F4F6',
        paddingRight: '4px'
      }}
      className="custom-scrollbar">
        {labTests.map((test, index) => (
          <div 
            key={index} 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              transition: 'all 0.15s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F0FDFA';
              e.currentTarget.style.borderColor = '#14B8A6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            <span style={{
              color: '#1F2937',
              fontWeight: '500',
              fontSize: '12px'
            }}>{test.name}</span>
            <img 
              src={test.icon} 
              alt="Download"
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                color: '#14B8A6'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
