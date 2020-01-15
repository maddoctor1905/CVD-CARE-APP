import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {CheckForUpdateService} from './@Services/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mhealth';

  constructor(private updates: SwUpdate,
              private checkForUpdateService: CheckForUpdateService) {
    this.updates.available.subscribe((event) => {
      document.location.reload();
    });
  }
}
