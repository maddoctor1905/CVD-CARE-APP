import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {RequestService} from './request.service';
import {LocalNotificationService} from './local-notification.service';
import {ServiceWorkerService} from './service-worker.service';
import {TranslateService} from '@ngx-translate/core';
import {mergeMap, tap} from 'rxjs/operators';
import {PatientRecruitment} from '../@Models/recruitment.model';
import {Observable, of, Subject} from 'rxjs';
import {InvestigationFrequency, PatientInvestigation} from '../@Models/investigation.model';
import {CalendarEvent} from '../@Models/calendar.model';
import {NotificationElement} from '../@Models/notification.model';

export interface FrequencyMatcher {
  matcher: string;
  decision: (calendarDate: Date, eventDate: Date, ...args: any[]) => boolean;
  args?: any[];
}

@Injectable()
export class PatientRecruitmentService {
  recruitments: PatientRecruitment[] = [];
  ready$ = new Subject<boolean>();
  private frequency: FrequencyMatcher[] = [];
  public notificationElement: NotificationElement = {
    body: '',
    icon: 'assets/icons/doctor.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore', title: 'Yes',
        icon: 'assets/icons/like.png'
      },
      {
        action: 'close', title: 'No',
        icon: 'assets/icons/dislike.png'
      },
    ],
  };

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService,
              private readonly localNotificationService: LocalNotificationService,
              private readonly swService: ServiceWorkerService,
              private readonly translateService: TranslateService) {
    this.frequency = [{
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
    return this.requestService.getPatientRecruitment(this.patientService.patient.id.toString()).pipe(tap((medications => {
      console.log(medications);
      this.recruitments = medications;
      localStorage.setItem('recruitments', JSON.stringify(medications));
      this.ready$.next();
      this.syncWithSW();
    })));
  }

  findInvestigationsForDate(date: Date): Observable<CalendarEvent> {
    const result: PatientRecruitment[] = [];
    date.setHours(8, 0, 0, 0);
    for (const item of this.recruitments) {
      const dateToCheck = (item.LastDVisitDate) ? new Date(item.LastDVisitDate) : new Date(item.SurveyDate);
      const frequencyDecision = this.frequency.find((decisionItem) => {
        return decisionItem.matcher === item.DVisitFrequency;
      });
      if (frequencyDecision && frequencyDecision.decision(date, dateToCheck, frequencyDecision.args)) {
        if (this.needNotification(date)) {
          this.sendNotification(item);
        }
        result.push(item);
      }
    }
    return this.translateService.get('event.recruitment.title').pipe(mergeMap((key) => {
      return of((result.length) ? {
        emoji: '🩺',
        from: new Date(Date.now()),
        to: new Date(Date.now()),
        text: result.map((item) => {
          return item.Doctor.DName;
        }),
        title: `${this.patientService.patient.PatName} - ` + key,
        typeName: 'type',
        urgent: false
      } : null);
    }));
  }

  needNotification(date: Date): boolean {
    const notifDate = new Date();
    notifDate.setDate(notifDate.getDate() + 1);
    notifDate.setHours(8, 0, 0, 0);
    return notifDate.getTime() === date.getTime();
  }


  private sendNotification(investigation: PatientRecruitment) {
    this.translateService.get('event.recruitment.title').subscribe((key: string) => {
      const body = `${this.patientService.patient.PatName} - ${key}`;
      this.localNotificationService.send('Recruitment tomorrow',
        {...this.notificationElement, body});
    });

  }

  private yearlyDecision(calendarDate: Date, eventFirstDate: Date): boolean {
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setFullYear(calendarDate.getFullYear());
    return calendarDate.getDate() === eventFirstDate.getDate() && calendarDate.getMonth() === eventFirstDate.getMonth();
  }

  private NbMonthsDecision(calendarDate: Date, eventFirstDate: Date, ...args: any[]): boolean {
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setMonth(calendarDate.getMonth());
    return ((calendarDate.getMonth() + eventFirstDate.getMonth()) % args[0] === 0) && calendarDate.getDate() === eventFirstDate.getDate();
  }

  private weeklyDecision(date: Date, eventFirstDate: Date, ...args: any[]): boolean {
    eventFirstDate.setHours(8, 0, 0, 0);
    return date.getDay() === eventFirstDate.getDay();
  }

  private syncWithSW() {
    this.swService.backgroundSyncReady$.subscribe((ready: boolean) => {
      if (ready) {
        navigator.serviceWorker.controller.postMessage({
          command: 'recruitmentsSync',
          message: this.recruitments
        });
      }
    });
  }
}
