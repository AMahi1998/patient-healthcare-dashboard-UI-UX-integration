/**
 * BloodPressureChart Component
 * Displays blood pressure data with systolic and diastolic readings
 * 
 * @component
 * @example
 * <BloodPressureChart data={chartData} />
 */

import PropTypes from 'prop-types';
import { COLORS, DIMENSIONS, TYPOGRAPHY, SPACING } from '../constants/theme';
import { ASSETS } from '../constants/assets';


const CHART_CONFIG = {
  MAX_Y: 180,
  MIN_Y: 60,
  STEP_SIZE: 20,
  POINT_RADIUS: 6,
  POINT_HOVER_RADIUS: 8,
  BORDER_WIDTH: 3,
  TENSION: 0.4
};

const BloodPressureChart = ({ data, latestReading, isSystolicHigher, isDiastolicHigher }) => {
  const chartConfig = {
    type: 'line',
    data: {
      labels: data.map(d => d.month),
      datasets: [
        {
          label: 'Systolic',
          data: data.map(d => d.systolic),
          borderColor: COLORS.chart.systolic,
          backgroundColor: 'transparent',
          borderWidth: CHART_CONFIG.BORDER_WIDTH,
          fill: false,
          pointRadius: CHART_CONFIG.POINT_RADIUS,
          pointBackgroundColor: COLORS.chart.systolic,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: CHART_CONFIG.POINT_HOVER_RADIUS,
          tension: CHART_CONFIG.TENSION
        },
        {
          label: 'Diastolic',
          data: data.map(d => d.diastolic),
          borderColor: COLORS.chart.diastolic,
          backgroundColor: 'transparent',
          borderWidth: CHART_CONFIG.BORDER_WIDTH,
          fill: false,
          pointRadius: CHART_CONFIG.POINT_RADIUS,
          pointBackgroundColor: COLORS.chart.diastolic,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: CHART_CONFIG.POINT_HOVER_RADIUS,
          tension: CHART_CONFIG.TENSION
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          borderColor: '#ec4899',
          borderWidth: 1,
          titleColor: '#000',
          bodyColor: '#000',
          padding: 12,
          borderRadius: 8,
          displayColors: true
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          max: CHART_CONFIG.MAX_Y,
          min: CHART_CONFIG.MIN_Y,
          ticks: {
            color: '#9CA3AF',
            font: { size: 12, weight: '500' },
            stepSize: CHART_CONFIG.STEP_SIZE
          },
          grid: {
            color: COLORS.chart.gridLight,
            drawBorder: true,
            borderColor: COLORS.border.light,
            lineWidth: 1
          }
        },
        x: {
          ticks: {
            color: '#6B7280',
            font: { size: 11 }
          },
          grid: {
            display: true,
            color: COLORS.chart.gridLight,
            drawBorder: true,
            borderColor: COLORS.border.light,
            lineWidth: 1
          }
        }
      }
    }
  };

  return chartConfig;
};

BloodPressureChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      systolic: PropTypes.number.isRequired,
      diastolic: PropTypes.number.isRequired
    })
  ).isRequired,
  latestReading: PropTypes.shape({
    systolic: PropTypes.number,
    diastolic: PropTypes.number
  }),
  isSystolicHigher: PropTypes.bool,
  isDiastolicHigher: PropTypes.bool
};

BloodPressureChart.defaultProps = {
  latestReading: { systolic: 0, diastolic: 0 },
  isSystolicHigher: false,
  isDiastolicHigher: false
};

export default BloodPressureChart;
