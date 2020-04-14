import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {RequestService} from './request.service';
import {PatientInvestigation} from '../@Models/investigation.model';

@Injectable()
export class PatientInvestigationService {
  private _investigations: PatientInvestigation[] = [];

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService) {
    this.patientService.patient$.subscribe((patient) => {
      if (patient) {
        this.init();
      }
    });
  }

  private init() {
    this.requestService.getPatientInvestigations(this.patientService.patient.id.toString()).subscribe((patientInvestigations) => {
      this._investigations = patientInvestigations;
      console.log('Investigations', patientInvestigations);
    });
  }
}
