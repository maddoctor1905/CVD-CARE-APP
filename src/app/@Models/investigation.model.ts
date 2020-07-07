import {Patient} from './patient';

export enum InvestigationFrequency {
  'Monthly' = 'Monthly',
  'Weekly' = 'Weekly',
  'Daily' = 'Daily',
  'Fortnightly' = 'Fortnightly',
  '2 Months' = '2 Months',
  '3 Months' = '3 Months',
  '6 Months' = '6 Months',
  'Yearly' = 'Yearly',
}

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
  Frequency: InvestigationFrequency;
  KFrequency: string;
}
