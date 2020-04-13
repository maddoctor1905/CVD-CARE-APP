import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {PatientMedication} from '../@Models/medication.model';
import {RequestService} from './request.service';

@Injectable()
export class PatientMedicationService {
  medications: PatientMedication[] = [];

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService) {
    this.patientService.patient$.subscribe((item) => {
      if (item) {
        this.init();
      }
    });
  }

  init() {
    this.requestService.getPatientMedications(this.patientService.patient.id.toString()).subscribe((medications => {
      this.medications = medications;
      console.log('Medications', medications);
    }));
  }

}
