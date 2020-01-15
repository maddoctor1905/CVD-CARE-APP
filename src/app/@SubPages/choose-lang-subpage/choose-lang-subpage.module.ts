import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLangSubpageComponent } from './choose-lang-subpage.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [ChooseLangSubpageComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [ChooseLangSubpageComponent]
})
export class ChooseLangSubpageModule { }
