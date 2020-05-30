import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ServiceWorkerService {
  backgroundSyncReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  async registerBackgroundSync() {
    const status = await navigator.permissions.query({
      // @ts-ignore
      name: 'periodic-background-sync',
    });
    if (status.state === 'granted') {
      const registration = await navigator.serviceWorker.ready;
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
        }
      }
    } else {
    }
  }
}
