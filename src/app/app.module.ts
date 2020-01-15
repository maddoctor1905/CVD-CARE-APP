import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AuthLayoutModule} from './@Layouts/auth-layout/auth-layout.module';
import {DefaultLayoutModule} from './@Layouts/default-layout/default-layout.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FirstInstallLayoutModule} from './@Layouts/first-install-layout/first-install-layout.module';

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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
