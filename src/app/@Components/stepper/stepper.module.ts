import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [StepperComponent],
    imports: [
        CommonModule,
        TranslateModule,
    ],
  exports: [StepperComponent]
})
export class StepperModule { }
