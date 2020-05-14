import {Injectable} from '@angular/core';
import {ServiceWorkerService} from './service-worker.service';
import {filter, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private readonly swService: ServiceWorkerService) {
  }

  reset() {
    // This function remove every type of data
    localStorage.clear();
    window.location.reload();
  }

  logout() {
    // This function doesn't remove the cached data (like blood pressure)
    localStorage.clear();
    this.clearCache().subscribe(() => {
      window.location.reload();
    });
  }

  clearCache(): Observable<void> {
    return this.swService.backgroundSyncReady$.pipe(filter(s => !!s), mergeMap(() => {
      navigator.serviceWorker.controller.postMessage({
        command: 'clear',
        message: ''
      });
      return new Observable<void>(sub => {
        navigator.serviceWorker.addEventListener('message', function handler(event) {
          navigator.serviceWorker.removeEventListener('message', handler);
          sub.complete();
        });
      });
    }));
  }
}
