import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { COLORS } from '../constants/theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCount: number;
}

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Send to error tracking service (e.g., Sentry)
    this.logErrorToService(error, errorInfo);
  }

  /**
   * Send error to external service
   */
  logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    // TODO: Integrate with error tracking service
    if ((window as any).errorTracker) {
      (window as any).errorTracker.captureException(error, { extra: errorInfo });
    }
  };

  /**
   * Reset error state
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>⚠️ Something went wrong</h1>
            
            <p style={styles.message}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details (Development Only)</summary>
                <pre style={styles.errorStack}>
                  {this.state.error && this.state.error.toString()}
                </pre>
                <pre style={styles.errorStack}>
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div style={styles.actions}>
              <button 
                onClick={this.handleReset}
                style={styles.button}
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                style={{ ...styles.button, ...styles.secondaryButton }}
              >
                Go Home
              </button>
            </div>

            {this.state.errorCount > 3 && (
              <p style={styles.warningText}>
                Multiple errors detected. Please refresh the page completely.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: COLORS.background.default,
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${COLORS.border.light}`
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: '16px'
  },
  message: {
    fontSize: '14px',
    color: COLORS.text.secondary,
    lineHeight: '1.6',
    marginBottom: '24px'
  },
  details: {
    marginBottom: '24px',
    padding: '12px',
    backgroundColor: '#F5F5F5',
    borderRadius: '4px'
  },
  summary: {
    cursor: 'pointer' as const,
    fontSize: '13px',
    fontWeight: '500',
    color: COLORS.status.warning,
    userSelect: 'none' as const
  },
  errorStack: {
    marginTop: '12px',
    padding: '12px',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${COLORS.border.light}`,
    borderRadius: '4px',
    fontSize: '12px',
    overflow: 'auto' as const,
    maxHeight: '200px',
    color: COLORS.text.primary,
    fontFamily: 'monospace'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-start'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: COLORS.primary.dark,
    color: '#FFFFFF',
    border: 'none' as const,
    borderRadius: '6px',
    cursor: 'pointer' as const,
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  secondaryButton: {
    backgroundColor: COLORS.border.light,
    color: COLORS.text.primary
  },
  warningText: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#FEF3C7',
    border: `1px solid #FCD34D`,
    borderRadius: '4px',
    fontSize: '13px',
    color: '#92400E'
  }
};

export default ErrorBoundary;
