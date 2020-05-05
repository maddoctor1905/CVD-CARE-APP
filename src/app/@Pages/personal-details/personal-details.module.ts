import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalDetailsRoutingModule } from './personal-details-routing.module';
import { PersonalDetailsComponent } from './personal-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [PersonalDetailsComponent],
  imports: [
    CommonModule,
    PersonalDetailsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule
  ]
})
export class PersonalDetailsModule { }
