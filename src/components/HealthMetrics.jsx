import respiratoryIcon from '../images/respiratory rate (1).svg';

export default function HealthMetrics({ patientData }) {
  // Get the latest vital signs from diagnosis history
  const latestRecord = patientData?.diagnosis_history?.[patientData.diagnosis_history.length - 1];
  
  // Extract vital signs with fallbacks
  const respiratoryRate = latestRecord?.respiratory_rate?.value || latestRecord?.respiratory_rate || 0;
  const temperature = latestRecord?.temperature?.value || latestRecord?.temperature || 0;
  const heartRate = latestRecord?.heart_rate?.value || latestRecord?.heart_rate || 0;

  const getStatus = (value, type) => {
    if (type === 'respiratory') {
      return value > 20 ? 'Higher than Average' : value < 12 ? 'Lower than Average' : 'Normal';
    } else if (type === 'temperature') {
      return value > 99 ? 'Higher than Average' : value < 97 ? 'Lower than Average' : 'Normal';
    } else if (type === 'heart') {
      return value > 100 ? 'Higher than Average' : value < 60 ? 'Lower than Average' : 'Normal';
    }
    return 'Normal';
  };

  const metrics = [
    {
      label: 'Respiratory Rate',
      value: respiratoryRate,
      unit: 'bpm',
      icon: respiratoryIcon,
      status: getStatus(respiratoryRate, 'respiratory'),
      bgColor: '#E0F3FA'
    },
    {
      label: 'Temperature',
      value: temperature,
      unit: '°F',
      icon: '/temperature.svg',
      status: getStatus(temperature, 'temperature'),
      bgColor: '#FFE0E6'
    },
    {
      label: 'Heart Rate',
      value: heartRate,
      unit: 'bpm',
      icon: '/HeartBPM.svg',
      status: getStatus(heartRate, 'heart'),
      bgColor: '#FFE0E6'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      marginTop: '12px',
      width: '100%'
    }}>
      {metrics.map((metric) => (
        <div 
          key={metric.label}
          style={{
            backgroundColor: metric.bgColor,
            padding: '16px 12px',
            borderRadius: '12px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '130px'
          }}
        >
          <img 
            src={metric.icon} 
            alt={metric.label}
            onError={(e) => {
              console.error('Icon failed to load:', metric.icon);
              e.target.style.display = 'none';
            }}
            style={{
              width: '40px',
              height: '40px',
              marginBottom: '8px',
              display: 'block',
              objectFit: 'contain'
            }}
          />
          <p style={{
            fontSize: '10px',
            color: '#6B7280',
            margin: '4px 0',
            fontWeight: '500',
            lineHeight: '1.2'
          }}>
            {metric.label}
          </p>
          <p style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#072635',
            margin: '4px 0'
          }}>
            {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
            <span style={{
              fontSize: '10px',
              color: '#6B7280',
              marginLeft: '2px'
            }}>
              {metric.unit}
            </span>
          </p>
          <p style={{
            fontSize: '9px',
            color: '#6B7280',
            margin: '4px 0 0 0',
            fontWeight: '500',
            lineHeight: '1.2'
          }}>
            {metric.status}
          </p>
        </div>
      ))}
    </div>
  );
}
