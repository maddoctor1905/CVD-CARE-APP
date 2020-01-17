import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLangSubpageComponent } from './choose-lang-subpage.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [ChooseLangSubpageComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TranslateModule
    ],
  exports: [ChooseLangSubpageComponent]
})
export class ChooseLangSubpageModule { }
