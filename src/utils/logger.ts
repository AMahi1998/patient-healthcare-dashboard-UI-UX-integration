/**
 * Logger Utility
 * Centralized logging system with different log levels
 */

const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

const LOG_COLORS = {
  debug: '\x1b[36m', 
  info: '\x1b[32m',  
  warn: '\x1b[33m',  
  error: '\x1b[31m', 
  reset: '\x1b[0m'
};


class Logger {
  namespace: string;
  isDevelopment: boolean;

  constructor(namespace = 'APP') {
    this.namespace = namespace;
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

 
  formatMessage = (level: string, message: string, data: any = null): string => {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${this.namespace}] [${level.toUpperCase()}]`;
    
    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data)}`;
    }
    return `${prefix} ${message}`;
  };

  /**
   * Debug level logging (development only)
   */
  debug = (message, data = null) => {
    if (this.isDevelopment) {
      const formatted = this.formatMessage('DEBUG', message);
      if (data) {
        console.log(`${LOG_COLORS.debug}${formatted}${LOG_COLORS.reset}`, data);
      } else {
        console.log(`${LOG_COLORS.debug}${formatted}${LOG_COLORS.reset}`);
      }
    }
  };

  /**
   * Info level logging
   */
  info = (message, data = null) => {
    const formatted = this.formatMessage('INFO', message);
    if (data) {
      console.info(`${LOG_COLORS.info}${formatted}${LOG_COLORS.reset}`, data);
    } else {
      console.info(`${LOG_COLORS.info}${formatted}${LOG_COLORS.reset}`);
    }
  };

  /**
   * Warning level logging
   */
  warn = (message, data = null) => {
    const formatted = this.formatMessage('WARN', message);
    if (data) {
      console.warn(`${LOG_COLORS.warn}${formatted}${LOG_COLORS.reset}`, data);
    } else {
      console.warn(`${LOG_COLORS.warn}${formatted}${LOG_COLORS.reset}`);
    }
  };

  /**
   * Error level logging
   */
  error = (message, error = null) => {
    const formatted = this.formatMessage('ERROR', message);
    if (error) {
      console.error(`${LOG_COLORS.error}${formatted}${LOG_COLORS.reset}`, error);
      this.reportError(formatted, error);
    } else {
      console.error(`${LOG_COLORS.error}${formatted}${LOG_COLORS.reset}`);
    }
  };

  /**
   * Report error to external service
   */
  reportError = (message: string, error: any) => {
    // TODO: Send to error tracking service (e.g., Sentry)
    if ((window as any).errorTracker) {
      (window as any).errorTracker.captureException(error, {
        message,
        level: 'error'
      });
    }
  };

  /**
   * Log API request
   */
  logRequest = (method, url, config = {}) => {
    if (this.isDevelopment) {
      this.debug(`API Request: ${method} ${url}`, config);
    }
  };

  /**
   * Log API response
   */
  logResponse = (method, url, status, data = null) => {
    if (this.isDevelopment) {
      this.debug(`API Response: ${method} ${url} (${status})`, data);
    }
  };

  /**
   * Group logs together
   */
  group = (label) => {
    if (this.isDevelopment) {
      console.group(`📦 ${label}`);
    }
  };

  /**
   * End log group
   */
  groupEnd = () => {
    if (this.isDevelopment) {
      console.groupEnd();
    }
  };

  /**
   * Measure performance
   */
  time = (label) => {
    if (this.isDevelopment) {
      console.time(label);
    }
  };

  /**
   * End performance measurement
   */
  timeEnd = (label) => {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  };
}

// Export singleton instances
export const createLogger = (namespace) => new Logger(namespace);
export const mainLogger = new Logger('APP');
export const apiLogger = new Logger('API');
export const componentLogger = new Logger('COMPONENT');

export default Logger;
