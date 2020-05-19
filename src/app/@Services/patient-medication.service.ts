import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {PatientMedication} from '../@Models/medication.model';
import {RequestService} from './request.service';
import {CalendarEvent} from '../@Models/calendar.model';
import {Observable, of, Subject} from 'rxjs';
import {mergeMap, tap} from 'rxjs/operators';
import {LocalNotificationService} from './local-notification.service';
import {NotificationElement} from '../@Models/notification.model';
import {ServiceWorkerService} from './service-worker.service';
import {TranslateService} from '@ngx-translate/core';

export interface Reminder {
  targetDate: string;
}

@Injectable()
export class PatientMedicationService {
  medications: PatientMedication[] = [];
  reminder: Reminder[] = [];
  ready$: Subject<void> = new Subject<void>();
  public notificationElement: NotificationElement = {
    body: 'Today medications',
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
    ]
  };

  constructor(private readonly patientService: PatientService, private readonly requestService: RequestService,
              private readonly localNotificationService: LocalNotificationService,
              private readonly swService: ServiceWorkerService,
              private readonly translateService: TranslateService) {
  }

  init() {
    return this.requestService.getPatientMedications(this.patientService.patient.id.toString()).pipe(tap((medications => {
      this.medications = medications;
      localStorage.setItem('medications', JSON.stringify(medications));
      this.ready$.next();
      this.syncWithSW();
    })));
  }

  findMedicationsForDate(date: Date): Observable<CalendarEvent> {
    const firstRunDate = new Date(+localStorage.getItem('firstInstallTime'));
    firstRunDate.setHours(8, 0, 0, 0);
    date.setHours(8, 0, 0, 0);
    if (date.getDay() === firstRunDate.getDay()) {
      if (this.needNotification(date)) {
        this.sendNotification();
      }
      return this.translateService.get('event.medication.title').pipe(mergeMap((key) => {
        return of({
          emoji: '💊',
          from: new Date(Date.now()),
          to: new Date(Date.now()),
          text: this.medications.map((item) => {
            return item.Medication.BrandName;
          }),
          title: `${this.patientService.patient.PatName} - ${key}`,
          typeName: 'type',
          urgent: false
        });
      }));
    }
    return of(null);
  }

  needNotification(date: Date): boolean {
    const notifDate = new Date();
    notifDate.setDate(notifDate.getDate() + 1);
    notifDate.setHours(8, 0, 0, 0);
    return notifDate.getTime() === date.getTime();
  }


  private sendNotification() {
    this.translateService.get('event.medication.title').subscribe((key: string) => {
      this.localNotificationService.send('Medication tomorrow',
        {...this.notificationElement, body: `${this.patientService.patient.PatName} - ${key}`});
    });

  }

  private syncWithSW() {
    this.swService.backgroundSyncReady$.subscribe((ready: boolean) => {
      if (ready) {
        navigator.serviceWorker.controller.postMessage({
          command: 'medicationsSync',
          message: this.medications
        });
      }
    });
  }

}
