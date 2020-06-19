import { Caregiver } from './caregiver';

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
