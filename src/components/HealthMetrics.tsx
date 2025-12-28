import { useMemo, CSSProperties } from "react";
import PropTypes from "prop-types";
import { ASSETS } from "../constants/assets";
import { COLORS, SPACING } from "../constants/theme";
import { componentLogger } from "../utils/logger";

const DEFAULT_HEALTH_DATA = {
  respiratory_rate: { value: 16 },
  temperature: { value: 98.6 },
  heart_rate: { value: 78 }
};

/** Health Metrics Configuration with normal ranges */
const METRICS_CONFIG = {
  respiratory: {
    label: 'Respiratory Rate',
    unit: 'bpm',
    icon: ASSETS.health.respiratory,
    bgColor: '#E0F3FA',
    minNormal: 12,
    maxNormal: 20,
  },
  temperature: {
    label: 'Temperature',
    unit: '°F',
    icon: ASSETS.health.temperature,
    bgColor: '#FFE0E6',
    minNormal: 97,
    maxNormal: 99,
  },
  heart: {
    label: 'Heart Rate',
    unit: 'bpm',
    icon: ASSETS.health.heartRate,
    bgColor: '#FFE0E6',
    minNormal: 60,
    maxNormal: 100,
  }
};

/**
 * Gets the status of a health metric based on its value
 * @param {number} value - The metric value
 * @param {Object} config - Metric configuration with min/max normal values
 * @returns {Object} Status information with isHigher, isLower, and status text
 */
function getMetricStatus(value, config) {
  if (!config) return { status: 'Normal', isHigher: false, isLower: false };

  const isHigher = value > config.maxNormal;
  const isLower = value < config.minNormal;

  return {
    status: isHigher ? 'Higher than Average' : isLower ? 'Lower than Average' : 'Normal',
    isHigher,
    isLower
  };
}

/**
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.patientData - Patient data containing diagnosis history
 * @returns {JSX.Element} Grid of health metrics
 */
export default function HealthMetrics({ patientData }) {
  const latestRecord = patientData?.diagnosis_history?.[patientData.diagnosis_history.length - 1] || DEFAULT_HEALTH_DATA;

  const vitalSigns = useMemo(() => ({
    respiratory: latestRecord?.respiratory_rate?.value || latestRecord?.respiratory_rate || 0,
    temperature: latestRecord?.temperature?.value || latestRecord?.temperature || 0,
    heart: latestRecord?.heart_rate?.value || latestRecord?.heart_rate || 0,
  }), [latestRecord]);

  const metrics = useMemo(() => [
    {
      key: 'respiratory',
      ...METRICS_CONFIG.respiratory,
      value: vitalSigns.respiratory,
      ...getMetricStatus(vitalSigns.respiratory, METRICS_CONFIG.respiratory)
    },
    {
      key: 'temperature',
      ...METRICS_CONFIG.temperature,
      value: vitalSigns.temperature,
      ...getMetricStatus(vitalSigns.temperature, METRICS_CONFIG.temperature)
    },
    {
      key: 'heart',
      ...METRICS_CONFIG.heart,
      value: vitalSigns.heart,
      ...getMetricStatus(vitalSigns.heart, METRICS_CONFIG.heart)
    }
  ], [vitalSigns]);

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: SPACING.xs,
      marginTop: '0px',
      width: '100%',
      padding: '0px',
      flexShrink: 0
    }
  };

  return (
    <div style={styles.container}>
      {metrics.map((metric) => (
        <HealthMetricCard key={metric.key} metric={metric} />
      ))}
    </div>
  );
}

/**
 * HealthMetricCard Component - Individual metric display card
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.metric - Metric data object
 * @returns {JSX.Element} Rendered metric card
 */
function HealthMetricCard({ metric }) {
  const styles: { [key: string]: CSSProperties } = {
    card: {
      backgroundColor: metric.bgColor,
      padding: '6px 4px',
      borderRadius: '8px',
      textAlign: 'center' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70px'
    },
    iconContainer: {
      width: '50px',
      height: '50px',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '4px'
    },
    icon: {
      width: '32px',
      height: '32px',
      display: 'block',
      objectFit: 'contain'
    },
    label: {
      fontSize: '7px',
      color: COLORS.textMuted,
      margin: '1px 0',
      fontWeight: '500',
      lineHeight: '1'
    },
    value: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: COLORS.textDark,
      margin: '1px 0'
    },
    unit: {
      fontSize: '7px',
      color: COLORS.textMuted,
      marginLeft: '1px'
    },
    status: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px',
      fontSize: '6px',
      color: COLORS.textMuted,
      margin: '1px 0 0 0',
      fontWeight: '500',
      lineHeight: '1'
    },
    statusIcon: {
      width: '10px',
      height: '10px'
    }
  };

  const handleIconError = (e: any) => {
    componentLogger.warn(`Icon failed to load: ${metric.icon}`);
    (e.target as HTMLImageElement).style.display = 'none';
  };

  return (
    <div style={styles.card}>
      <div style={styles.iconContainer}>
        <img
          src={metric.icon}
          alt={metric.label}
          onError={handleIconError}
          style={styles.icon}
        />
      </div>
      <p style={styles.label}>{metric.label}</p>
      <p style={styles.value}>
        {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
        <span style={styles.unit}>{metric.unit}</span>
      </p>
      <div style={styles.status}>
        {metric.isHigher && (
          <img
            src={ASSETS.actions.arrowUp}
            alt="up"
            style={styles.statusIcon}
          />
        )}
        {metric.isLower && (
          <img
            src={ASSETS.actions.arrowDown}
            alt="down"
            style={styles.statusIcon}
          />
        )}
        <span>{metric.status}</span>
      </div>
    </div>
  );
}

HealthMetricCard.propTypes = {
  metric: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    isHigher: PropTypes.bool.isRequired,
    isLower: PropTypes.bool.isRequired
  }).isRequired
};

HealthMetrics.propTypes = {
  patientData: PropTypes.shape({
    diagnosis_history: PropTypes.array
  }).isRequired
};
