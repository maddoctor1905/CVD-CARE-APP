import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterPhonenumberSubpageComponent } from './enter-phonenumber-subpage.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [EnterPhonenumberSubpageComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule
    ],
  exports: [EnterPhonenumberSubpageComponent]
})
export class EnterPhonenumberSubpageModule { }
