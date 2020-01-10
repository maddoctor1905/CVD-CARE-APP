import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PinCodeTyperComponent} from './pin-code-typer.component';


@NgModule({
  declarations: [
    PinCodeTyperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PinCodeTyperComponent
  ]
})
export class PinCodeTyperModule {
}
