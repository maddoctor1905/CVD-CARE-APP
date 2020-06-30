import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Otp} from '../@Models/otp.model';
import {Patient, PatientDemographic} from '../@Models/patient';
import {map, mergeMap, tap} from 'rxjs/operators';
import {PatientMedication} from '../@Models/medication.model';
import {PatientInvestigation} from '../@Models/investigation.model';
import {PatientRecruitment} from '../@Models/recruitment.model';
import {PatientSymptom, Symptom} from '../@Models/symptom.model';
import {SwUpdate} from '@angular/service-worker';
import {ServiceWorkerService} from './service-worker.service';
import {IndexDbService} from './indexDb.service';

@Injectable()
export class RequestService {
  constructor(private readonly http: HttpClient,
              private serviceWorkerService: ServiceWorkerService, private indexDbService: IndexDbService) {
  }

  generateOtp(phoneNumber: string): Observable<Otp> {
    return this.http.post<Otp>(`${environment.apiRootUrl}/otps/`, {phoneNumber});
  }

  confirmOtp(phoneNumber: string, code: string): Observable<Otp> {
    return this.http.put<Otp>(`${environment.apiRootUrl}/otps/${code}/confirm`, {phoneNumber});
  }

  getPatientByPhone(phoneNumber: string): Observable<Patient> {
    return this.http.get<Patient[]>(`${environment.apiRootUrl}/patients/?MobileNo=${phoneNumber}`).pipe(map((patients: Patient[]) => {
      return patients[0];
    }));
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${environment.apiRootUrl}/patients/${id}`);
  }

  getPatientMedications(id: string): Observable<PatientMedication[]> {
    return this.http.get<PatientMedication[]>(`${environment.apiRootUrl}/patients/${id}/medications`);
  }

  getPatientRecruitment(id: string): Observable<PatientRecruitment[]> {
    return this.http.get<PatientRecruitment[]>(`${environment.apiRootUrl}/patients/${id}/recruitments`);
  }

  getPatientInvestigations(id: string): Observable<PatientInvestigation[]> {
    return this.http.get<PatientInvestigation[]>(`${environment.apiRootUrl}/patients/${id}/investigations`);
  }

  updatePatient(body: Partial<Patient>, id: number): Observable<Patient> {
    return this.serviceWorkerService.offline$.pipe(mergeMap((offline: boolean) => {
      if (offline) {
        this.indexDbService.insertOperation('PUT', `${environment.apiRootUrl}/patients/${id}`, body);
        return of(null);
      } else {
        return this.http.put<Patient>(`${environment.apiRootUrl}/patients/${id}`, body).pipe(tap((data) => {
          this.updateCache(data.id);
        }));
      }
    }));
  }

  updateCache(patientID: number) {
    console.info('[CVDCare] Requesting all for Updating Cache.');
    this.getPatient(String(patientID)).subscribe();
    this.getPatientDemographic(String(patientID)).subscribe();
    this.getPatientInvestigations(String(patientID)).subscribe();
    this.getPatientRecruitment(String(patientID)).subscribe();
    this.getPatientRecruitment(String(patientID)).subscribe();
    this.getPatientSymptoms(String(patientID)).subscribe();
    return of(true);
  }

  getSymptoms(): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(`${environment.apiRootUrl}/symptoms`);
  }

  getPatientSymptoms(id: string): Observable<PatientSymptom[]> {
    return this.http.get<PatientSymptom[]>(`${environment.apiRootUrl}/patients/${id}/symptoms`);
  }

  createSymptom(patientId: number, symptomId: number, date: string, description: string): Observable<PatientSymptom> {
    return this.serviceWorkerService.offline$.pipe(mergeMap((offline: boolean) => {
      if (offline) {
        this.indexDbService.insertOperation('POST', `${environment.apiRootUrl}/patients/${patientId}/symptoms`, {
          symptomId,
          date,
          description,
        });
        return of(null);
      } else {
        return this.http.post<PatientSymptom>(`${environment.apiRootUrl}/patients/${patientId}/symptoms`, {
          symptomId,
          date,
          description,
        }).pipe(tap((data) => {
          this.updateCache(data.id);
        }));
      }
    }));

  }

  getPatientDemographic(id: string) {
    return this.http.get<PatientDemographic>(`${environment.apiRootUrl}/patients/${id}/demographics`);

  }

  updatePatientDemographic(body: any, id: number) {
    return this.serviceWorkerService.offline$.pipe(mergeMap((offline: boolean) => {
      if (offline) {
        this.indexDbService.insertOperation('PUT', `${environment.apiRootUrl}/patients/${id}/demographics`, body);
        return of(null);
      } else {
        return this.http.put<PatientDemographic>(`${environment.apiRootUrl}/patients/${id}/demographics`, body);
      }
    }));
  }
}
