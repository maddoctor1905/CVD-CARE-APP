import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {RequestService} from './request.service';
import {InvestigationFrequency, PatientInvestigation} from '../@Models/investigation.model';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {CalendarEvent} from '../@Models/calendar.model';
import {map, mergeMap, tap} from 'rxjs/operators';
import {LocalNotificationService} from './local-notification.service';
import {NotificationElement} from '../@Models/notification.model';
import {ServiceWorkerService} from './service-worker.service';
import {TranslateService} from '@ngx-translate/core';


export interface FrequencyMatcher {
  matcher: string;
  decision: (date: Date, investigation: PatientInvestigation, ...args: any[]) => boolean;
  args?: any[];
}

@Injectable()
export class PatientInvestigationService {
  private _investigations: PatientInvestigation[] = [];
  ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _frequency: FrequencyMatcher[] = [];

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService,
              private readonly localNotificationService: LocalNotificationService,
              private readonly swService: ServiceWorkerService,
              private readonly translateService: TranslateService) {
    this._frequency = [{
      matcher: InvestigationFrequency.Monthly,
      decision: this.NbMonthsDecision,
      args: [1],
    }, {
      matcher: InvestigationFrequency['2 Months'],
      decision: this.NbMonthsDecision,
      args: [2],
    }, {
      matcher: InvestigationFrequency['3 Months'],
      decision: this.NbMonthsDecision,
      args: [3],
    }, {
      matcher: InvestigationFrequency['6 Months'],
      decision: this.NbMonthsDecision,
      args: [6],
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

  public notificationElement: NotificationElement = {
    body: '',
    icon: 'assets/icons/doctor.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore', title: 'Yes',
        icon: 'assets/icons/like.png',
      },
      {
        action: 'close', title: 'No',
        icon: 'assets/icons/dislike.png',
      },
    ],
  };

  init() {
    return this.requestService.getPatientInvestigations(this.patientService.patient.id.toString()).pipe(tap((patientInvestigations) => {
      this._investigations = patientInvestigations;
      this.ready$.next(true);
      this.syncWithSW();
      console.log('Investigations', patientInvestigations);
    }));
  }

  findInvestigationsForDate(date: Date): Observable<CalendarEvent[]> {
    const result: PatientInvestigation[] = [];
    date.setHours(8, 0, 0, 0);
    for (const item of this._investigations) {
      const frequencyDecision = this._frequency.find((decisionItem) => {
        return decisionItem.matcher === item.Frequency;
      });
      if (frequencyDecision && frequencyDecision.decision(date, item, frequencyDecision.args)) {
        if (this.needNotification(date)) {
          this.sendNotification(item);
        }
        result.push(item);
      }
    }
    return this.translateService.get('event.investigation.title').pipe(map<string, CalendarEvent[]>((key: string) => {
      return result.map((item) => {
        return (result.length) ? {
          emoji: '🧪',
          from: new Date(Date.now()),
          to: new Date(Date.now()),
          text: [item.Investigation.Description],
          title: `${this.patientService.patient.PatName} - ${item.Investigation.InvMName} ${key}`,
          typeName: 'type',
          urgent: false,
        } : null;
      });
    }));
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

  needNotification(date: Date): boolean {
    const notifDate = new Date();
    notifDate.setDate(notifDate.getDate() + 1);
    notifDate.setHours(8, 0, 0, 0);
    return notifDate.getTime() === date.getTime();
  }


  private sendNotification(investigation: PatientInvestigation) {
    this.translateService.get('event.investigation.title').subscribe((key: string) => {
      const body = `${this.patientService.patient.PatName} - ${investigation.Investigation.InvMName} ${key}`;
      this.localNotificationService.send('Investigation tomorrow',
        {...this.notificationElement, body});
    });

  }

  private syncWithSW() {
    this.swService.backgroundSyncReady$.subscribe((ready: boolean) => {
      if (ready) {
        navigator.serviceWorker.controller.postMessage({
          command: 'investigationsSync',
          message: this._investigations,
        });
      }
    });
  }

}
