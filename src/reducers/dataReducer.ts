import { Dispatch, SetStateAction } from 'react';

export interface PatientData {
  name: string;
  age: number;
  gender: string;
  date_of_birth?: string;
  phone_number?: string;
  emergency_contact?: string;
  insurance_type?: string;
  profile_picture?: string;
  diagnosis_history?: any[];
  lab_results?: any[];
  vital_signs?: any;
}

export enum ActionType {
  LOADING_START = 'LOADING_START',
  LOADING_END = 'LOADING_END',

  FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS',
  FETCH_PATIENT_SUCCESS = 'FETCH_PATIENT_SUCCESS',
  FETCH_MEDICAL_HISTORY_SUCCESS = 'FETCH_MEDICAL_HISTORY_SUCCESS',
  FETCH_LAB_RESULTS_SUCCESS = 'FETCH_LAB_RESULTS_SUCCESS',

  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',

  UPDATE_PATIENT = 'UPDATE_PATIENT',
  CLEAR_DATA = 'CLEAR_DATA',
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export interface DataState {
  patients: PatientData[];
  currentPatient: PatientData | null;
  
  loading: boolean;
  error: string | null;
  
  medicalHistory: any[] | null;
  labResults: any[] | null;
  
  lastUpdated: Date | null;
}

export const initialState: DataState = {
  patients: [],
  currentPatient: null,
  loading: false,
  error: null,
  medicalHistory: null,
  labResults: null,
  lastUpdated: null,
};

export const dataReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
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

    case ActionType.FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.payload || [],
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    case ActionType.FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        currentPatient: action.payload || null,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    case ActionType.FETCH_MEDICAL_HISTORY_SUCCESS:
      return {
        ...state,
        medicalHistory: action.payload || null,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    case ActionType.FETCH_LAB_RESULTS_SUCCESS:
      return {
        ...state,
        labResults: action.payload || null,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error occurred',
        loading: false,
      };

    case ActionType.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ActionType.UPDATE_PATIENT:
      return {
        ...state,
        currentPatient: action.payload || null,
        lastUpdated: new Date(),
      };

    case ActionType.CLEAR_DATA:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};


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
