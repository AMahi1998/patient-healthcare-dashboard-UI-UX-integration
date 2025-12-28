

/**
 * Validate email address
 * @param {String} email - Email to validate
 * @returns {Boolean} True if valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {String} phone - Phone number to validate
 * @returns {Boolean} True if valid phone
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate date format
 * @param {String} date - Date to validate (YYYY-MM-DD)
 * @returns {Boolean} True if valid date
 */
export const validateDate = (date: any) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
};

/**
 * Validate patient data
 * @param {Object} patient - Patient object to validate
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
export const validatePatient = (patient) => {
  const errors = [];

  if (!patient.name || patient.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (patient.dateOfBirth && !validateDate(patient.dateOfBirth)) {
    errors.push('Invalid date of birth format');
  }

  if (patient.email && !validateEmail(patient.email)) {
    errors.push('Invalid email format');
  }

  if (patient.phone && !validatePhone(patient.phone)) {
    errors.push('Invalid phone format');
  }

  if (patient.gender && !['Male', 'Female', 'Other'].includes(patient.gender)) {
    errors.push('Invalid gender value');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate diagnosis data
 * @param {Object} diagnosis - Diagnosis object to validate
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
export const validateDiagnosis = (diagnosis) => {
  const errors = [];

  if (!diagnosis.name || diagnosis.name.trim().length < 3) {
    errors.push('Diagnosis name must be at least 3 characters');
  }

  if (diagnosis.description && diagnosis.description.length > 500) {
    errors.push('Description cannot exceed 500 characters');
  }

  if (diagnosis.date && !validateDate(diagnosis.date)) {
    errors.push('Invalid diagnosis date format');
  }

  const validStatuses = ['Active', 'Inactive', 'Resolved'];
  if (diagnosis.status && !validStatuses.includes(diagnosis.status)) {
    errors.push('Invalid status value');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate health metrics
 * @param {Object} metrics - Health metrics object to validate
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
export const validateHealthMetrics = (metrics) => {
  const errors = [];

  if (metrics.systolic !== undefined && (metrics.systolic < 30 || metrics.systolic > 300)) {
    errors.push('Systolic pressure must be between 30 and 300');
  }

  if (metrics.diastolic !== undefined && (metrics.diastolic < 20 || metrics.diastolic > 200)) {
    errors.push('Diastolic pressure must be between 20 and 200');
  }

  if (metrics.temperature !== undefined && (metrics.temperature < 80 || metrics.temperature > 110)) {
    errors.push('Temperature must be between 80 and 110 Fahrenheit');
  }

  if (metrics.heartRate !== undefined && (metrics.heartRate < 30 || metrics.heartRate > 200)) {
    errors.push('Heart rate must be between 30 and 200 bpm');
  }

  if (metrics.respiratoryRate !== undefined && (metrics.respiratoryRate < 8 || metrics.respiratoryRate > 60)) {
    errors.push('Respiratory rate must be between 8 and 60');
  }

  if (metrics.oxygenSaturation !== undefined && (metrics.oxygenSaturation < 50 || metrics.oxygenSaturation > 100)) {
    errors.push('Oxygen saturation must be between 50 and 100%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize string input
 * @param {String} input - String to sanitize
 * @returns {String} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .slice(0, 1000); // Limit length
};

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
export const validateFileUpload = (file: any, options: any = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
  } = options;

  const errors: string[] = [];

  if (!file) {
    errors.push('No file selected');
    return { isValid: false, errors };
  }

  if (file.size > maxSize) {
    errors.push(`File size must not exceed ${maxSize / 1024 / 1024}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not allowed. Accepted types: ${allowedTypes.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
export const validateRequiredFields = (data, requiredFields = []) => {
  const errors = [];

  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors.push(`${field} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate API response structure
 * @param {Object} response - API response to validate
 * @param {Object} schema - Expected schema
 * @returns {Object} { isValid: Boolean, errors: Array }
 */
export const validateResponseSchema = (response, schema) => {
  const errors = [];

  if (!response) {
    errors.push('Response is null or undefined');
    return { isValid: false, errors };
  }

  Object.entries(schema).forEach(([key, type]) => {
    if (!(key in response)) {
      errors.push(`Missing required field: ${key}`);
    } else if (typeof response[key] !== type && response[key] !== null) {
      errors.push(`Field ${key} should be of type ${type}, got ${typeof response[key]}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};
