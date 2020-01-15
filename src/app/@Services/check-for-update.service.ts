import {ApplicationRef, Injectable} from '@angular/core';
import {concat, interval} from 'rxjs';
import {first} from 'rxjs/operators';
import {SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    console.log('loaded');
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    console.log('test');

    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
  }
}
