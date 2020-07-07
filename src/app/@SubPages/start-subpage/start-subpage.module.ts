import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartSubpageComponent } from './start-subpage.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [StartSubpageComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    FormsModule
  ],
  exports: [StartSubpageComponent]
})
export class StartSubpageModule { }
