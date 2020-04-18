import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {RequestService} from './request.service';
import {InvestigationFrequency, PatientInvestigation} from '../@Models/investigation.model';
import {Subject} from 'rxjs';
import {CalendarEvent} from '../@Models/calendar.model';
import {tap} from 'rxjs/operators';


export interface FrequencyMatcher {
  matcher: string;
  decision: (date: Date, investigation: PatientInvestigation, ...args: any[]) => boolean;
  args?: any[];
}

@Injectable()
export class PatientInvestigationService {
  private _investigations: PatientInvestigation[] = [];
  ready$: Subject<void> = new Subject<void>();
  private _frequency: FrequencyMatcher[] = [];

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService) {
    this._frequency = [{
      matcher: InvestigationFrequency.Monthly,
      decision: this.NbMonthsDecision,
      args: [1]
    }, {
      matcher: InvestigationFrequency['2 Months'],
      decision: this.NbMonthsDecision,
      args: [2]
    }, {
      matcher: InvestigationFrequency['3 Months'],
      decision: this.NbMonthsDecision,
      args: [3]
    }, {
      matcher: InvestigationFrequency['6 Months'],
      decision: this.NbMonthsDecision,
      args: [6]
    }, {
      matcher: InvestigationFrequency.Yearly,
      decision: this.yearlyDecision,
    }, {
      matcher: InvestigationFrequency.Weekly,
      decision: this.weeklyDecision,
      args: [7],
    }, {
      matcher: InvestigationFrequency.Daily,
      decision: () => true,
      args: [1],
    }];
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
    date.setHours(8, 0, 0, 0);
    for (const item of this._investigations) {
      const frequencyDecision = this._frequency.find((decisionItem) => {
        return decisionItem.matcher === item.Frequency;
      });
      if (frequencyDecision && frequencyDecision.decision(date, item, frequencyDecision.args)) {
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

  private yearlyDecision(date: Date, investigation: PatientInvestigation): boolean {
    const eventFirstDate = new Date(investigation.STDate);
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setFullYear(date.getFullYear());
    return date.getDate() === eventFirstDate.getDate() && date.getMonth() === eventFirstDate.getMonth();
  }

  private NbMonthsDecision(date: Date, investigation: PatientInvestigation, ...args: any[]): boolean {
    const eventFirstDate = new Date(investigation.STDate);
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setMonth(date.getMonth());
    return ((date.getMonth() + eventFirstDate.getMonth()) % args[0] === 0) && date.getDate() === eventFirstDate.getDate();
  }

  private weeklyDecision(date: Date, investigation: PatientInvestigation, ...args: any[]): boolean {
    const eventFirstDate = new Date(investigation.STDate);
    eventFirstDate.setHours(8, 0, 0, 0);
    return date.getDay() === eventFirstDate.getDay();
  }

}
