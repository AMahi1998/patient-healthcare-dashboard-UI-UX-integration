

// @ts-nocheck
import { useMemo } from 'react';

/**
 * Hook to calculate blood pressure statistics
 * @param {Array} chartData - Array of blood pressure readings
 * @returns {Object} Statistics including averages and comparison values
 */
export const useBloodPressureStats = (chartData) => {
  return useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return {
        systolicAverage: 0,
        diastolicAverage: 0,
        latestReading: { systolic: 0, diastolic: 0 }
      };
    }

    const systolicValues = chartData.map(d => d.systolic);
    const diastolicValues = chartData.map(d => d.diastolic);

    const systolicAverage = systolicValues.reduce((a, b) => a + b, 0) / systolicValues.length;
    const diastolicAverage = diastolicValues.reduce((a, b) => a + b, 0) / diastolicValues.length;
    const latestReading = chartData[chartData.length - 1];

    return {
      systolicAverage,
      diastolicAverage,
      latestReading,
      isSystolicHigher: latestReading.systolic > systolicAverage,
      isDiastolicHigher: latestReading.diastolic > diastolicAverage
    };
  }, [chartData]);
};

/**
 * Hook to format dates consistently
 * @param {String} dateString - Date string to format
 * @returns {String} Formatted date
 */
export const useFormattedDate = (dateString) => {
  return useMemo(() => {
    if (!dateString) return 'N/A';
    
    try {
      let date;
      
      if (dateString.includes('-')) {
        const [year, month, day] = dateString.split('-');
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else if (dateString.includes('/')) {
        date = new Date(dateString);
      } else {
        date = new Date(dateString);
      }
      
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  }, [dateString]);
};

/**
 * Hook for health metric status determination
 * @param {Number} value - The metric value
 * @param {String} type - Type of metric (respiratory, temperature, heart)
 * @returns {Object} Status information
 */
export const useMetricStatus = (value, type) => {
  return useMemo(() => {
    const THRESHOLDS = {
      respiratory: { high: 20, low: 12, normal: 16 },
      temperature: { high: 99, low: 97, normal: 98.6 },
      heart: { high: 100, low: 60, normal: 80 }
    };

    const threshold = THRESHOLDS[type] || { high: 0, low: 0, normal: 0 };
    const isHigher = value > threshold.high;
    const isLower = value < threshold.low;

    return {
      status: isHigher ? 'Higher than Average' : isLower ? 'Lower than Average' : 'Normal',
      isHigher,
      isLower,
      average: threshold.normal
    };
  }, [value, type]);
};
