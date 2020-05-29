import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Patient} from '../@Models/patient';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ServiceWorkerService} from './service-worker.service';

@Injectable()
export class PatientService {
  private _patient: Patient;
  public patient$: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(null);

  constructor(private readonly requestService: RequestService,
              private readonly swService: ServiceWorkerService) {
    this.initFromStorage();
  }

  initFromStorage() {
    const id = localStorage.getItem('CLIENT_UNIQUE_ID');
    if (!id) {
      return;
    }
    this.requestService.getPatient(id).subscribe((patient: Patient) => {
      this._patient = patient;
      this.syncWithSW(+localStorage.getItem('firstInstallTime'));
      this.patient$.next(patient);
    });
  }

  initFromPhone(phoneNumber: string): Observable<Patient> {
    return this.requestService.getPatientByPhone(phoneNumber).pipe(tap((patient: Patient) => {
      this._patient = patient;
      this.syncWithSW();
      this.patient$.next(patient);
    }));
  }
  public get patient(): Patient {
    return this._patient;
  }

  public set patient(value: Patient) {
    this._patient = value;
  }

  private syncWithSW(time: number = Date.now()) {
    this.swService.backgroundSyncReady$.subscribe((ready) => {
      if (ready) {
        navigator.serviceWorker.controller.postMessage({
          command: 'patientSync',
          message: {
            installTime: time,
            patient: this._patient.id,
            name: this._patient.PatName
          }
        });
      }
    });
  }
  public update(body: Partial<Patient>): Observable<Patient> {
    return this.requestService.updatePatient(body, this.patient.id);
  }

}
