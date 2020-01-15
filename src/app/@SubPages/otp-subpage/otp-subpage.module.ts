import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpSubpageComponent } from './otp-subpage.component';
import {PinCodeTyperModule} from '../../@Components/pin-code-typer/pin-code-typer.module';



@NgModule({
  declarations: [OtpSubpageComponent],
  imports: [
    CommonModule,
    PinCodeTyperModule
  ],
  exports: [OtpSubpageComponent]
})
export class OtpSubpageModule { }
