import {Patient} from './patient';

export interface Doctor {
  id: number;

  DName: string;

  KDName: string;

  MobileNo: number;

  AltMobileNo: number;

  Email: string;

  Gender: string;

  Department: string;

  KDepartment: string;

  Specialization: string;

  KSpecialization: string;

  HospitalNameAdd: string;

  KHospitalNameAdd: string;
}

export interface Diet {
  id: number;
  DSPlanName: string;
  KDSPlanName: string;
  DSPlanDescription: string;
  KDSPlanDescription: string;
}

export interface Exercise {
  id: number;
  ELPlanName: string;

  KELPlanName: string;
  ELPlanDescription: string;
  KELPlanDescription;
}

export interface PatientRecruitment {
  id: number;

  Patient: Patient;


  SurveyDate: string;


  LastDVisitDate: string;


  Doctor: Doctor;


  PhyDiagnosis: string;


  PhyComplianceAdvice: string;


  PhyMedicationAdvice: string;

  DVisitFrequency: string;

  KDVisitFrequency: string;

  Weight: number;

  WUnitID: string;

  Height: number;

  HUnitID: string;

  WaistCircum: number;

  WCUnitID: number;

  WaistHipRatio: string;

  HeartRate: number;

  RespiratoryRate: number;

  BPSystolic: number;

  BPDiastolic: number;

  PhysicalActivity: string;

  KPhysicalActivity: string;

  MenstrualStatus: string;

  KMenstrualStatus: string;

  SurgicalHistory: string;

  KSurgicalHistory: string;

  SurgeryDate: string;

  Diet: Diet;

  Exercise: Exercise;
}
