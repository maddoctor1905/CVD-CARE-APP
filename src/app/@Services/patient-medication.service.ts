import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {PatientMedication} from '../@Models/medication.model';
import {RequestService} from './request.service';
import {CalendarEvent} from '../@Models/calendar.model';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Reminder {
  targetDate: string;
}

@Injectable()
export class PatientMedicationService {
  medications: PatientMedication[] = [];
  reminder: Reminder[] = [];
  ready$: Subject<void> = new Subject<void>();

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService) {
  }

  init() {
    return this.requestService.getPatientMedications(this.patientService.patient.id.toString()).pipe(tap((medications => {
      this.medications = medications;
      this.ready$.next();
    })));
  }

  findMedicationsForDate(date: Date): CalendarEvent[] {
    const firstRunDate = new Date(+localStorage.getItem('firstInstallTime'));
    firstRunDate.setHours(8, 0, 0, 0);
    date.setHours(8, 0, 0, 0);
    if ((date.getTime() - firstRunDate.getTime()) % 7 === 0) {
      return this.medications.map((item) => {
        return {
          emoji: '💊',
          from: new Date(Date.now()),
          to: new Date(Date.now()),
          text: 'You have to take your medication',
          title: item.Medication.BrandName,
          typeName: 'type',
          urgent: false
        };
      });
    }
    return [];
  }


}
