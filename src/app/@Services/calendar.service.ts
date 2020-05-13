import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {WeekElement} from '../@Models/calendar.model';
import {PatientMedicationService} from './patient-medication.service';
import {PatientInvestigationService} from './patient-investigation.service';
import {PatientService} from './patient.service';
import {filter, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient,
    private readonly patientMedicationService: PatientMedicationService,
    private readonly patientInvestigationService: PatientInvestigationService,
    private readonly patientService: PatientService
  ) {
  }

  private _calendar: WeekElement[] = [];
  public calendar$: BehaviorSubject<WeekElement[]> = new BehaviorSubject<WeekElement[]>([]);

  generateCalendarFromDate(date: Date): void {
    let tmpDate = new Date();
    const limiter = {
      from: new Date(tmpDate.setDate(date.getDate() - 15)),
      to: new Date(tmpDate.setDate(date.getDate() + 28)),
    };
    tmpDate = limiter.from;
    const result: WeekElement[] = [];
    for (let i = 0; i < 5; i++) {
      const week: WeekElement = {active: (i === 2), days: []};
      for (let a = 0; a < 7; a++) {
        week.days.push({
          date: new Date(tmpDate.setDate(tmpDate.getDate() + 1)),
          events: [],
          active: (date.getDate() === tmpDate.getDate())
        });
      }
      result.push(week);
    }
    this._calendar = result;
    this.calendar$.next(this._calendar);
  }

  linkPatientData(date: Date) {
    this.patientService.patient$.pipe(filter((p) => !!p), take(1)).subscribe((patient) => {
        this.patientMedicationService.init().subscribe();
        this.patientInvestigationService.init().subscribe();
    });
    this.patientMedicationService.ready$.subscribe(() => {
      this.linkMedicationsToCalendar(date);
    });
    this.patientInvestigationService.ready$.subscribe(() => {
      this.linkInvestigationsToCalendar(date);
    });
  }

  linkMedicationsToCalendar(date: Date) {
    for (const week of this._calendar) {
      for (const day of week.days) {
        this.patientMedicationService.findMedicationsForDate(day.date).subscribe((event) => {
          if (event) {
            day.events.push(event);
          }
        });
      }
    }
    this.calendar$.next(this._calendar);
  }

  linkInvestigationsToCalendar(date: Date) {
    for (const week of this._calendar) {
      for (const day of week.days) {
        this.patientInvestigationService.findInvestigationsForDate(day.date).subscribe((event) => {
          if (event) {
            day.events.push(event);
          }
        });
      }
    }
    this.calendar$.next(this._calendar);
  }

}
