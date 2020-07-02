import {ApplicationRef, Injectable} from '@angular/core';
import {concat, interval} from 'rxjs';
import {first} from 'rxjs/operators';
import {SwUpdate} from '@angular/service-worker';
import {OverlayService} from './overlay.service';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  checked = false;

  constructor(appRef: ApplicationRef, updates: SwUpdate,
              private overlayService: OverlayService) {
    console.info('[CVDCare] CheckForUpdateService Constructed.');
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(() => this.checkForUpdate(updates));
    updates.available.subscribe(event => {
      console.info('[CVDCare] ServiceWorker une nouvelle version est disponible.');
      this.overlayService.openAlert(
        '💡',
        'info',
        'Internet available !',
        'The application is gonna restart to refresh data and design !'
      ).afterClosed$.subscribe(() => {
        localStorage.setItem('justUpdated', 'true');
        updates.activateUpdate().then(() => document.location.reload());
      })
    });
  }

  private checkForUpdate(updates: SwUpdate) {
    console.info('[CVDCare] Looking for updates...');
    updates.checkForUpdate().then(() => {
      console.info('[CVDCare] Looking for updates DONE.');
      this.checked = true;
    }).catch((err) => {
      console.error('[CVDCare] Failed looking for updates', err);
    })
  }
}
