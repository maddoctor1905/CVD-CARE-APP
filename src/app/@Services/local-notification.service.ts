import {Injectable} from '@angular/core';
import {NotificationElement} from '../@Models/notification.model';
import {AlertDialogComponent} from '../@Components/dialogs/alert-dialog/alert-dialog.component';
import {OverlayService} from './overlay.service';

@Injectable({
  providedIn: 'root',
})
export class LocalNotificationService {

  private hasPermission = false;

  constructor(private overlayService: OverlayService) {
    if (!Notification) {
      this.showError('Notifications', 'Push notifications are not available in your content');
    }
    Notification.requestPermission().then((status) => {
      console.log('Notification permission status:', status);
      this.hasPermission = true;
    }, (err) => {
      this.showError('Notifications', 'Push notification rejected');
    });
  }

  send(title: string, notification: NotificationElement) {
    if (this.hasPermission && Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.showNotification(title, notification);
        }
      });
    }
  }

  showError(title: string, message) {
    this.overlayService.open(AlertDialogComponent, {
      title,
      message,
      emoji: '⚠️',
    });
  }
}
