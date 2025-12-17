/**
 * Debug utility to check API configuration and connectivity
 */

export const debugAPI = {
  // Check environment variables
  checkEnvironment: () => {
    console.group('🔧 Environment Configuration');
    console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('API Username:', process.env.REACT_APP_API_USERNAME);
    console.log('API Password:', process.env.REACT_APP_API_PASSWORD);
    console.log('API Timeout:', process.env.REACT_APP_API_TIMEOUT);
    console.log('Node Env:', process.env.NODE_ENV);
    console.groupEnd();
  },

  // Test API connectivity
  testConnection: async () => {
    console.group('🌐 Testing API Connection');
    try {
      const credentials = `coalition:skills-test`;
      const encodedCredentials = btoa(credentials);
      
      const response = await fetch(
        'https://fedskillstest.coalitiontechnologies.workers.dev/patients',
        {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API Connection Successful!');
        console.log('Data received:', data);
        return data;
      } else {
        console.error(`❌ API Error: ${response.status} ${response.statusText}`);
        const errorData = await response.text();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('❌ Connection Error:', error);
    }
    console.groupEnd();
  },

  // Log all info
  logAll: async () => {
    debugAPI.checkEnvironment();
    await debugAPI.testConnection();
  },
};

// Auto-log on import (remove in production)
if (process.env.NODE_ENV === 'development') {
  console.log('💡 Debug API available: window.debugAPI or import { debugAPI } from "./debug"');
  (window as any).debugAPI = debugAPI;
}

export default debugAPI;
