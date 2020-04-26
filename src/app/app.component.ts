import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {CheckForUpdateService} from './@Services/check-for-update.service';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeENUS from '@angular/common/locales/en';
import localeKNIN from '@angular/common/locales/en-IN';
import localeFR from '@angular/common/locales/fr';
import {ServiceWorkerService} from './@Services/service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mhealth';

  constructor(private updates: SwUpdate,
              private checkForUpdateService: CheckForUpdateService,
              private translateService: TranslateService,
              private readonly swService: ServiceWorkerService) {

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

  public ngOnInit(): void {
    this.swService.registerBackgroundSync().then(() => {
    }, err => {
      console.error(err);
    });
  }
}
