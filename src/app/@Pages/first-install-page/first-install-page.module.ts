import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FirstInstallPageRoutingModule} from './first-install-page-routing.module';
import {FirstInstallPageComponent} from './first-install-page.component';
import {StepperModule} from '../../@Components/stepper/stepper.module';
import {ChooseLangSubpageModule} from '../../@SubPages/choose-lang-subpage/choose-lang-subpage.module';
import {EnterPhonenumberSubpageModule} from '../../@SubPages/enter-phonenumber-subpage/enter-phonenumber-subpage.module';
import {OtpSubpageModule} from '../../@SubPages/otp-subpage/otp-subpage.module';
import {PreloadSubpageModule} from '../../@SubPages/preload-subpage/preload-subpage.module';


@NgModule({
  declarations: [
    FirstInstallPageComponent,
  ],
  imports: [
    CommonModule,
    FirstInstallPageRoutingModule,
    StepperModule,
    ChooseLangSubpageModule,
    EnterPhonenumberSubpageModule,
    OtpSubpageModule,
    PreloadSubpageModule
  ]
})
export class FirstInstallPageModule {
}
