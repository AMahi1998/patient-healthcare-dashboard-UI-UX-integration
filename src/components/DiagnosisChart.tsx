// @ts-nocheck
import { useEffect, useRef, useMemo, CSSProperties } from "react";
import PropTypes from "prop-types";
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { ASSETS } from "../constants/assets";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";
import { componentLogger } from "../utils/logger";
import HealthMetrics from "./HealthMetrics";

ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DEFAULT_DATA = {
  labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  systolic: [120, 115, 155, 110, 145, 160],
  diastolic: [80, 65, 95, 85, 70, 78],
};

const BP_THRESHOLDS = {
  systolicMin: 60,
  systolicMax: 180,
  diastolicMin: 60,
  diastolicMax: 120,
  stepSize: 20,
};

const CHART_COLORS = {
  systolic: '#E66FD2',
  diastolic: '#7E6CAB',
  gridColor: 'rgba(200, 200, 220, 0.4)',
  tooltipBg: '#fff',
  tooltipBorder: '#ec4899',
};


function DiagnosisChart({ patientData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const normalizeChartData = (diagnosisHistory) => {
    if (!Array.isArray(diagnosisHistory) || diagnosisHistory.length === 0) {
      return DEFAULT_DATA;
    }

    try {
      return diagnosisHistory.map(record => ({
        month: new Date(`${record.year}-${record.month}`).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        systolic: record.blood_pressure?.systolic?.value || record.blood_pressure?.systolic || 0,
        diastolic: record.blood_pressure?.diastolic?.value || record.blood_pressure?.diastolic || 0
      }));
    } catch (error) {
      componentLogger.warn('Failed to normalize chart data, using defaults', { error });
      return DEFAULT_DATA;
    }
  };

  const chartData = useMemo(() => normalizeChartData(patientData?.diagnosis_history), [patientData?.diagnosis_history]);

  /**
   * Extracts latest blood pressure reading
   * @returns {Object} Latest systolic and diastolic values
   */
  const getLatestReading = () => {
    if (!Array.isArray(chartData) || chartData.length === 0) {
      return { systolic: 160, diastolic: 78 };
    }
    return chartData[chartData.length - 1] || { systolic: 160, diastolic: 78 };
  };

  /**
   * Calculates average values for dataset
   * @param {Array<number>} values - Array of numeric values
   * @returns {number} Average value
   */
  const calculateAverage = (values) => {
    if (!Array.isArray(values) || values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const latestReading = useMemo(() => getLatestReading(), [chartData]);
  
  const systolicValues = useMemo(() => chartData.map(d => d.systolic), [chartData]);
  const diastolicValues = useMemo(() => chartData.map(d => d.diastolic), [chartData]);
  
  const systolicAverage = useMemo(() => calculateAverage(systolicValues), [systolicValues]);
  const diastolicAverage = useMemo(() => calculateAverage(diastolicValues), [diastolicValues]);

  const isSystolicHigher = latestReading.systolic > systolicAverage;
  const isDiastolicHigher = latestReading.diastolic > diastolicAverage;

  /**
   * Creates Chart.js configuration object with all styling and options
   * @param {Array} labels - Chart x-axis labels
   * @param {Array} systolicData - Systolic pressure data points
   * @param {Array} diastolicData - Diastolic pressure data points
   * @returns {Object} Chart.js configuration
   */
  const createChartConfig = (labels, systolicData, diastolicData) => ({
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolicData,
          borderColor: CHART_COLORS.systolic,
          backgroundColor: 'transparent',
          borderWidth: 3,
          fill: false,
          pointRadius: 6,
          pointBackgroundColor: CHART_COLORS.systolic,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          tension: 0.4,
        },
        {
          label: 'Diastolic',
          data: diastolicData,
          borderColor: CHART_COLORS.diastolic,
          backgroundColor: 'transparent',
          borderWidth: 3,
          fill: false,
          pointRadius: 6,
          pointBackgroundColor: CHART_COLORS.diastolic,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: CHART_COLORS.tooltipBg,
          borderColor: CHART_COLORS.tooltipBorder,
          borderWidth: 1,
          titleColor: '#000',
          bodyColor: '#000',
          padding: 12,
          borderRadius: 8,
          displayColors: true,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          max: BP_THRESHOLDS.systolicMax,
          min: BP_THRESHOLDS.systolicMin,
          ticks: {
            color: '#9CA3AF',
            font: { size: 12, weight: '500' },
            stepSize: BP_THRESHOLDS.stepSize,
          },
          grid: {
            color: CHART_COLORS.gridColor,
            drawBorder: true,
            borderColor: '#E5E7EB',
            lineWidth: 1,
          },
        },
        x: {
          ticks: {
            color: '#6B7280',
            font: { size: 11 },
          },
          grid: {
            display: true,
            color: CHART_COLORS.gridColor,
            drawBorder: true,
            borderColor: '#E5E7EB',
            lineWidth: 1,
          },
        },
      },
    },
  });

  // Initialize and update Chart.js
  useEffect(() => {
    if (!chartRef.current) return;

    try {
      const labels = chartData.map(d => d.month);
      const systolicData = chartData.map(d => d.systolic);
      const diastolicData = chartData.map(d => d.diastolic);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const config = createChartConfig(labels, systolicData, diastolicData);
      chartInstance.current = new ChartJS(ctx, config);
    } catch (error) {
      componentLogger.error('Failed to initialize chart', { error });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  const styles: { [key: string]: CSSProperties } = {
    container: {
      padding: SPACING.md,
      backgroundColor: COLORS.white,
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${COLORS.border}`,
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'visible'
    },
    title: {
      fontFamily: TYPOGRAPHY.family,
      fontSize: TYPOGRAPHY.lg,
      fontWeight: '800',
      lineHeight: '33px',
      letterSpacing: '0px',
      color: COLORS.textDark,
      marginBottom: SPACING.xs,
      textAlign: 'left',
      width: '207px',
      height: '33px',
      display: 'flex',
      alignItems: 'center'
    },
    bpContainer: {
      backgroundColor: '#F4F0FE',
      padding: '2px',
      borderRadius: '8px',
      marginBottom: '2px',
      flexShrink: 0
    },
    bpHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '4px'
    },
    bpTitle: {
      fontSize: '12px',
      color: COLORS.textDark,
      fontWeight: '700',
      margin: '0'
    },
    selector: {
      padding: '4px 6px',
      fontSize: '10px',
      border: 'none',
      backgroundColor: 'transparent',
      color: COLORS.textMuted,
      cursor: 'pointer',
      fontWeight: '500'
    },
    chartWrapper: {
      display: 'flex',
      gap: '2px',
      alignItems: 'flex-start'
    },
    chartContainer: {
      flex: 1,
      position: 'relative',
      height: '220px'
    },
    legendContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1px',
      minWidth: '55px',
      paddingTop: '1px'
    },
    metricsContainer: {
      marginTop: '0px',
      marginBottom: '0px',
      flexShrink: 0
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Diagnosis History</h2>

      <div style={styles.bpContainer}>
        <div style={styles.bpHeader}>
          <h3 style={styles.bpTitle}>Blood Pressure</h3>
          <select style={styles.selector}>
            <option>Last 6 months</option>
          </select>
        </div>

        <div style={styles.chartWrapper}>
          <div style={styles.chartContainer}>
            <canvas ref={chartRef} style={{ display: 'block' }} />
          </div>

          <div style={styles.legendContainer}>
            <BloodPressureLegendItem
              label="Systolic"
              value={latestReading.systolic}
              isHigher={isSystolicHigher}
              color={CHART_COLORS.systolic}
            />
            <BloodPressureLegendItem
              label="Diastolic"
              value={latestReading.diastolic}
              isHigher={isDiastolicHigher}
              color={CHART_COLORS.diastolic}
            />
          </div>
        </div>
      </div>

      <div style={styles.metricsContainer}>
        <HealthMetrics patientData={patientData} />
      </div>
    </div>
  );
}

/**
 * BloodPressureLegendItem Component - Displays a single blood pressure metric in the legend
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the metric (Systolic/Diastolic)
 * @param {number} props.value - Current value
 * @param {boolean} props.isHigher - Whether value is higher than average
 * @param {string} props.color - Color for the metric indicator
 * @returns {JSX.Element} Rendered legend item
 */
function BloodPressureLegendItem({ label, value, isHigher, color }) {
  const itemStyles = {
    container: {
      marginBottom: '2px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
      marginBottom: '2px'
    },
    dot: {
      fontSize: '6px',
      color,
      fontWeight: '700'
    },
    label: {
      fontSize: '10px',
      fontWeight: '600',
      color: COLORS.textDark
    },
    value: {
      fontSize: '14px',
      fontWeight: '700',
      color: COLORS.textDark,
      marginBottom: '1px'
    },
    status: {
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
      fontSize: '8px',
      color: COLORS.textMuted
    },
    icon: {
      width: '8px',
      height: '8px'
    }
  };

  return (
    <div style={itemStyles.container}>
      <div style={itemStyles.header}>
        <span style={itemStyles.dot}>●</span>
        <span style={itemStyles.label}>{label}</span>
      </div>
      <div style={itemStyles.value}>{value}</div>
      <div style={itemStyles.status}>
        <img
          src={isHigher ? ASSETS.actions.arrowUp : ASSETS.actions.arrowDown}
          alt={isHigher ? 'up' : 'down'}
          style={itemStyles.icon}
        />
        <span>{isHigher ? 'Higher than Average' : 'Lower than Average'}</span>
      </div>
    </div>
  );
}

BloodPressureLegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isHigher: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
};

DiagnosisChart.propTypes = {
  patientData: PropTypes.shape({
    diagnosis_history: PropTypes.array
  }).isRequired
};

export default DiagnosisChart;
