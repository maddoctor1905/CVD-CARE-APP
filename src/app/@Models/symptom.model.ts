import {Patient} from './patient';

export interface Symptom {
  id: number;
  CondName: string;
  KCondName: string;
  ICDCode: string;
  Type: string;
  ICDDescription: string;
  KICDDescription: string;
}

export interface PatientSymptom {
  id: number;
  Patient: Patient;
  MedicationCondition: Symptom;
  STDate: string;
  STDescription: string;
  KSTDescription: string;
}
