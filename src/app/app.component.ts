import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {CheckForUpdateService} from './@Services/check-for-update.service';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeENUS from '@angular/common/locales/en';
import localeKNIN from '@angular/common/locales/en-IN';
import localeFR from '@angular/common/locales/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mhealth';

  constructor(private updates: SwUpdate,
              private checkForUpdateService: CheckForUpdateService,
              private translateService: TranslateService) {

    registerLocaleData(localeENUS, 'en-US');
    registerLocaleData(localeENUS, 'kn-IN');
    registerLocaleData(localeFR, 'fr-FR');
    if (localStorage.getItem('favoriteLang')) {
      this.translateService.use((localStorage.getItem('favoriteLang')));
      this.translateService.setDefaultLang((localStorage.getItem('favoriteLang')));
    } else {
      this.translateService.setDefaultLang('en-US');
    }
    this.updates.available.subscribe((event) => {
      document.location.reload();
    });
  }
}
