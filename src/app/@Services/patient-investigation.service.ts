import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {RequestService} from './request.service';
import {PatientInvestigation} from '../@Models/investigation.model';
import {Subject} from 'rxjs';
import {CalendarEvent} from '../@Models/calendar.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class PatientInvestigationService {
  private _investigations: PatientInvestigation[] = [];
  ready$: Subject<void> = new Subject<void>();

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService) {
  }

  init() {
    return this.requestService.getPatientInvestigations(this.patientService.patient.id.toString()).pipe(tap((patientInvestigations) => {
      this._investigations = patientInvestigations;
      this.ready$.next();
      console.log('Investigations', patientInvestigations);
    }));
  }

  findInvestigationsForDate(date: Date): CalendarEvent[] {
    const result: CalendarEvent[] = [];
    for (const item of this._investigations) {
      const eventFirstDate = new Date(item.STDate);
      eventFirstDate.setHours(8, 0, 0, 0);
      date.setHours(8, 0, 0, 0);
      eventFirstDate.setMinutes(date.getMonth());
      if (date.getDate() === eventFirstDate.getDate()) {
        result.push({
          emoji: '👔',
          from: new Date(Date.now()),
          to: new Date(Date.now()),
          text: 'You have to visit your doctor',
          title: item.Investigation.InvMName,
          typeName: 'type',
          urgent: false
        });
      }
    }
    return result;
  }
}
