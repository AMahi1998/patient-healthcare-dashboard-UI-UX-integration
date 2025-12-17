/**
 * Data Reducer and Action Types
 * Manages patient data state and API operations
 */

import { PatientData } from '../api';

/**
 * Action Types
 */
export enum ActionType {
  // Loading states
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END',

  // Success states
  FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS',
  FETCH_PATIENT_SUCCESS = 'FETCH_PATIENT_SUCCESS',
  FETCH_MEDICAL_HISTORY_SUCCESS = 'FETCH_MEDICAL_HISTORY_SUCCESS',
  FETCH_LAB_RESULTS_SUCCESS = 'FETCH_LAB_RESULTS_SUCCESS',

  // Error states
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',

  // Data updates
  UPDATE_PATIENT = 'UPDATE_PATIENT',
  CLEAR_DATA = 'CLEAR_DATA',
}

/**
 * Action Interface
 */
export interface Action {
  type: ActionType;
  payload?: any;
}

/**
 * State Interface
 */
export interface DataState {
  // Patient data
  patients: PatientData[];
  currentPatient: PatientData | null;
  
  // Loading and error states
  loading: boolean;
  error: string | null;
  
  // Additional data
  medicalHistory: any[] | null;
  labResults: any[] | null;
  
  // Meta information
  lastUpdated: Date | null;
}

/**
 * Initial State
 */
export const initialState: DataState = {
  patients: [],
  currentPatient: null,
  loading: false,
  error: null,
  medicalHistory: null,
  labResults: null,
  lastUpdated: null,
};

/**
 * Reducer Function
 * Handles all state changes based on actions
 */
export const dataReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    // Loading
    case ActionType.LOADING_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ActionType.LOADING_END:
      return {
        ...state,
        loading: false,
      };

    // Fetch patients success
    case ActionType.FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.payload || [],
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    // Fetch single patient success
    case ActionType.FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        currentPatient: action.payload || null,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    // Fetch medical history success
    case ActionType.FETCH_MEDICAL_HISTORY_SUCCESS:
      return {
        ...state,
        medicalHistory: action.payload || null,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    // Fetch lab results success
    case ActionType.FETCH_LAB_RESULTS_SUCCESS:
      return {
        ...state,
        labResults: action.payload || null,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    // Set error
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error occurred',
        loading: false,
      };

    // Clear error
    case ActionType.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // Update patient
    case ActionType.UPDATE_PATIENT:
      return {
        ...state,
        currentPatient: action.payload || null,
        lastUpdated: new Date(),
      };

    // Clear all data
    case ActionType.CLEAR_DATA:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 * Helper functions to create actions
 */
export const actionCreators = {
  startLoading: (): Action => ({
    type: ActionType.LOADING_START,
  }),

  endLoading: (): Action => ({
    type: ActionType.LOADING_END,
  }),

  fetchPatientsSuccess: (patients: PatientData[]): Action => ({
    type: ActionType.FETCH_PATIENTS_SUCCESS,
    payload: patients,
  }),

  fetchPatientSuccess: (patient: PatientData): Action => ({
    type: ActionType.FETCH_PATIENT_SUCCESS,
    payload: patient,
  }),

  fetchMedicalHistorySuccess: (history: any): Action => ({
    type: ActionType.FETCH_MEDICAL_HISTORY_SUCCESS,
    payload: history,
  }),

  fetchLabResultsSuccess: (results: any): Action => ({
    type: ActionType.FETCH_LAB_RESULTS_SUCCESS,
    payload: results,
  }),

  setError: (error: string): Action => ({
    type: ActionType.SET_ERROR,
    payload: error,
  }),

  clearError: (): Action => ({
    type: ActionType.CLEAR_ERROR,
  }),

  updatePatient: (patient: PatientData): Action => ({
    type: ActionType.UPDATE_PATIENT,
    payload: patient,
  }),

  clearData: (): Action => ({
    type: ActionType.CLEAR_DATA,
  }),
};
