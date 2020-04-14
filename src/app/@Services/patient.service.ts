import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Patient} from '../@Models/patient';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class PatientService {
  private _patient: Patient;
  public patient$: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(null);

  constructor(private readonly requestService: RequestService) {
    this.initFromStorage();
  }

  initFromStorage() {
    const id = localStorage.getItem('CLIENT_UNIQUE_ID');
    if (!id) {
      return;
    }
    this.requestService.getPatient(id).subscribe((patient: Patient) => {
      this._patient = patient;
      this.patient$.next(patient);
    });
  }

  initFromPhone(phoneNumber: string): Observable<Patient> {
    return this.requestService.getPatientByPhone(phoneNumber).pipe(tap((patient: Patient) => {
      this._patient = patient;
      this.patient$.next(patient);
    }));
  }

  public get patient(): Patient {
    return this._patient;
  }

  public set patient(value: Patient) {
    this._patient = value;
  }
}
