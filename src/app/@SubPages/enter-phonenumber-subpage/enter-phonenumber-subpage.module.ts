import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterPhonenumberSubpageComponent } from './enter-phonenumber-subpage.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [EnterPhonenumberSubpageComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [EnterPhonenumberSubpageComponent]
})
export class EnterPhonenumberSubpageModule { }
