import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PinCodeTyperComponent} from './pin-code-typer.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    PinCodeTyperComponent
  ],
    imports: [
        CommonModule,
        TranslateModule
    ],
  exports: [
    PinCodeTyperComponent
  ]
})
export class PinCodeTyperModule {
}
