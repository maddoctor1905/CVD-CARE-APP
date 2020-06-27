import {Caregiver} from './caregiver';

export interface PatientDemographic {
  id: number;

  Patient: Patient;

  Gender: string;
  DOB: string;
  STDescription: string;
  Age: number;
  AgeMenarc: number;

  MaritialStatus: string;
  NoOfLivChildren: string;
  Religion: string;
  EducationStatus: string;
  Occupation: string;
  MonthlyIncome: number;
  TypeOfCommunity: string;
  TypeOfDiet: string;
  TypeOfFamily: string;

  LanguageApp: string;
  LanguageProf: string;
}

export interface Patient {
  id: number;

  PatName: string;

  MobileNo: number;

  AltMobileNo?: number;

  Email: string;

  Address: string;
  KAddress?: string;

  City: string;

  KCity: string;

  Pincode: number;

  Location: string;

  KLocation: string;

  FCGName: string;

  KFCGName: string;

  FCGEmail: string;

  FCGMNO1?: number;

  FCGMNO2?: number;

  Relationship: string;

  IsOwnPhone: number;

  IsSmartPhone: number;

  Caregiver: Caregiver;

  PatDesc: string;

  Registered: number;
}
