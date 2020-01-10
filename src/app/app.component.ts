import {Component} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mhealth';

  constructor() {
    if (environment.production && confirm('Reset Application ?')) {
      localStorage.clear();
    }
  }
}
