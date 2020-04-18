import {Injectable} from '@angular/core';
import {PatientService} from './patient.service';
import {PatientMedication} from '../@Models/medication.model';
import {RequestService} from './request.service';
import {CalendarEvent} from '../@Models/calendar.model';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocalNotificationService} from './local-notification.service';
import {NotificationElement} from '../@Models/notification.model';

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
              private readonly localNotificationService: LocalNotificationService) {
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
    if (date.getDay() === firstRunDate.getDay()) {
      if (this.needNotification(date)) {
        this.sendNotifiaction();
      }
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

  needNotification(date: Date): boolean {
    const notifDate = new Date();
    notifDate.setDate(notifDate.getDate() + 1);
    notifDate.setHours(8, 0, 0, 0);
    return notifDate.getTime() === date.getTime();
  }


  private sendNotifiaction() {
    let body = '';
    for (const med of this.medications) {
      body += '\n ' + med.Medication.BrandName;
    }
    this.localNotificationService.send('Medication',
      {...this.notificationElement, body: this.notificationElement.body + ' ' + body});
  }
}
