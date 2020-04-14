import {Patient} from './patient';

export interface InvestigationMaster {
  id: number;
  InvMName: string;
  KInvMName: string;
  LOINCCode: string;
  Description: string;
  KDescription: string;
}

export interface PatientInvestigation {
  id: number;
  Patient: Patient;
  PrescId: number;
  STDate: string;
  Investigation: InvestigationMaster;
  Frequency: string;
  KFrequency: string;
}
