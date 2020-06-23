import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AuthLayoutModule} from './@Layouts/auth-layout/auth-layout.module';
import {DefaultLayoutModule} from './@Layouts/default-layout/default-layout.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {FirstInstallLayoutModule} from './@Layouts/first-install-layout/first-install-layout.module';
import {CheckForUpdateService} from './@Services/check-for-update.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RequestService} from './@Services/request.service';
import {PatientService} from './@Services/patient.service';
import {PatientMedicationService} from './@Services/patient-medication.service';
import {PatientInvestigationService} from './@Services/patient-investigation.service';
import {ServiceWorkerService} from './@Services/service-worker.service';
import {PatientRecruitmentService} from './@Services/patient-recruitment.service';
import {OverlayModule} from './@Components/overlay/overlay.module';
import {YesOrNoDialogModule} from './@Components/dialogs/yes-or-no-dialog/yes-or-no-dialog.module';
import {Overlay} from '@angular/cdk/overlay';
import {ListDialogModule} from './@Components/dialogs/list-dialog/list-dialog.module';
import {SymptomDialogModule} from './@Components/dialogs/symptom-dialog/symptom-dialog.module';
import {PatientSymptomService} from './@Services/patient-symptom.service';
import {WhatsappService} from './@Services/whatsapp.service';
import {SymptomShareDialogModule} from './@Components/dialogs/symptom-share-dialog/symptom-share-dialog.module';
import * as Sentry from '@sentry/browser';
import {environment} from '../environments/environment';

Sentry.init({
  dsn: 'https://f37b4f699fcd4f158312e2a0562a1544@sentry.enoviah.fr/17',
  // TryCatch has to be configured to disable XMLHttpRequest wrapping, as we are going to handle
  // http module exceptions manually in Angular's ErrorHandler and we don't want it to capture the same error twice.
  // Please note that TryCatch configuration requires at least @sentry/browser v5.16.0.
  integrations: [new Sentry.Integrations.TryCatch({
    XMLHttpRequest: false,
  })],
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
  }

  extractError(error) {
    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    // We can handle messages and Error objects directly.
    if (typeof error === 'string' || error instanceof Error) {
      return error;
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
      // The `error` property of http exception can be either an `Error` object, which we can use directly...
      if (error.error instanceof Error) {
        return error.error;
      }

      // ... or an`ErrorEvent`, which can provide us with the message but no stack...
      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }

      // ...or the request body itself, which we can use as a message instead.
      if (typeof error.error === 'string') {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      // If we don't have any detailed information, fallback to the request message itself.
      return error.message;
    }

    // Skip if there's no error, and let user decide what to do with it.
    return null;
  }

  handleError(error) {
    const extractedError = this.extractError(error) || 'Handled unknown error';

    // Capture handled exception and send it to Sentry.
    const eventId = Sentry.captureException(extractedError);

    // When in development mode, log the error to console for immediate feedback.
    if (!environment.production) {
      console.error(extractedError);
    }

    // Optionally show user dialog to provide details on what happened.
    Sentry.showReportDialog({eventId});
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AuthLayoutModule,
    HttpClientModule,
    DefaultLayoutModule,
    FirstInstallLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('sw-master.js', {enabled: true}),
    // Add for DialogService System
    OverlayModule,
    YesOrNoDialogModule,
    ListDialogModule,
    SymptomDialogModule,
    SymptomShareDialogModule
  ],
  providers: [
    CheckForUpdateService,
    RequestService,
    PatientService,
    Overlay,
    PatientMedicationService,
    PatientInvestigationService,
    ServiceWorkerService,
    PatientRecruitmentService,
    PatientSymptomService,
    WhatsappService,
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
