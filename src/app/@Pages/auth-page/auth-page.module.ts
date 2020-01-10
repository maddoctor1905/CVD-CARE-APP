import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthPageRoutingModule} from './auth-page-routing.module';
import {AuthPageComponent} from './auth-page.component';
import {PinCodeTyperModule} from '../../@Components/pin-code-typer/pin-code-typer.module';


@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    PinCodeTyperModule,
    CommonModule,
    AuthPageRoutingModule
  ]
})
export class AuthPageModule {
}
