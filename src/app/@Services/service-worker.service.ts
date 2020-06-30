import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OverlayService} from './overlay.service';
import {AlertDialogComponent} from '../@Components/dialogs/alert-dialog/alert-dialog.component';

@Injectable()
export class ServiceWorkerService {
  backgroundSyncReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  offline$: BehaviorSubject<boolean> = new BehaviorSubject(!navigator.onLine);

  constructor(private overlayService: OverlayService) {
    window.addEventListener('online', () => {
      this.offline$.next(false);
    });
    window.addEventListener('offline', () => {
      this.offline$.next(true);
    });
  }

  async registerBackgroundSync() {
    const status = await navigator.permissions.query({
      // @ts-ignore
      name: 'periodic-background-sync',
    });
    if (status.state === 'granted') {
      let registration;
      try {
        registration = await navigator.serviceWorker.ready;
      } catch (e) {
        console.error(e);
        this.showError('Service worker ready', 'Fail to get registration from service worker');
      }
      if ('periodicSync' in registration) {
        try {
          // @ts-ignore
          await (registration).periodicSync.register('medication-sync', {
            // An interval of one day.
            minInterval: 24 * 60 * 60 * 1000,
          });
          // @ts-ignore
          await (registration).periodicSync.register('investigation-sync', {
            // An interval of one day.
            minInterval: 24 * 60 * 60 * 1000,
          });
          // @ts-ignore
          await (registration).periodicSync.register('recruitment-sync', {
            // An interval of one day.
            minInterval: 24 * 60 * 60 * 1000,
          });
          this.backgroundSyncReady$.next(true);
          console.info('[SW] ready');
        } catch (error) {
          console.error(error);
          this.showError('Register', 'Fail to register periodic sync event');

        }
      }
    } else {
      this.showError('Authorization', 'Periodic background sync is not authorized by user');
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
