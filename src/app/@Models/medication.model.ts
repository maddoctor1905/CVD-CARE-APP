import {Patient} from './patient';

export interface MedicationMasterModel {
  id: number;
  BrandName: string;
  KBrandName: string;
  GenericDrugName: string;
  KGenericDrugName: string;
  RxNormCode: string;
}

export interface PatientMedication {
  id: number;
  Patient: Patient;
  PrescId: string;
  Medication: MedicationMasterModel;
  MedicatonDate: string;
  ValidFromDate: string;
  ValidToDate: string;
  MedicationTime: string;
  Strength: number;
  Unit: string;
  Route: string;
  KRoute: string;
}
