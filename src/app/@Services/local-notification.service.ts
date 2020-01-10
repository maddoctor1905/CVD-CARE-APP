import {Injectable} from '@angular/core';
import {NotificationElement} from '../@Models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  private hasPermission = false;

  constructor() {
    Notification.requestPermission((status) => {
      console.log('Notification permission status:', status);
      this.hasPermission = true;
    });
  }

  send(title: string, notification: NotificationElement) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then((reg) => {
        reg.showNotification(title, notification);
      });
    }
  }
}
