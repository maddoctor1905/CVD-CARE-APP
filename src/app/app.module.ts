import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AuthLayoutModule} from './@Layouts/auth-layout/auth-layout.module';
import {DefaultLayoutModule} from './@Layouts/default-layout/default-layout.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
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
    SymptomDialogModule
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
    PatientSymptomService
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
