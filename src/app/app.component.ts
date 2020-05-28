import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {CheckForUpdateService} from './@Services/check-for-update.service';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeENUS from '@angular/common/locales/en';
import localeFR from '@angular/common/locales/fr';
import {ServiceWorkerService} from './@Services/service-worker.service';
import {OverlayService} from './@Services/overlay.service';
import {ListDialogComponent} from './@Components/dialogs/list-dialog/list-dialog.component';
import {YesOrNoDialogComponent} from './@Components/dialogs/yes-or-no-dialog/yes-or-no-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mhealth';

  constructor(private updates: SwUpdate,
              private checkForUpdateService: CheckForUpdateService,
              private translateService: TranslateService,
              private readonly swService: ServiceWorkerService,
              private readonly overlayService: OverlayService,
  ) {
    this.overlayService.open(ListDialogComponent, {
      list: [
        {
          value: 'France',
        },
        {
          value: 'Inde',
        },
      ],
      mode: 'checkbox',
    }).afterClosed$.subscribe((res) => {
      console.log(res);
    });
    this.overlayService.open(ListDialogComponent, {
      list: [
        {
          value: 'France',
        },
        {
          value: 'Inde',
        },
      ],
      mode: 'radio',
    }).afterClosed$.subscribe((res) => {
      console.log(res);
    });
    this.overlayService.open(YesOrNoDialogComponent, {} ).afterClosed$.subscribe((res) => {
      console.log(res);
    });
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
