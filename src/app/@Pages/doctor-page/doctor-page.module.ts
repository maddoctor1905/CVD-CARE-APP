import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DoctorRoutingModule} from './doctor-page-routing.module';
import {DoctorPageComponent} from './doctor-page.component';



@NgModule({
  declarations: [DoctorPageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DoctorRoutingModule
  ]
})
export class DoctorPageModule { }
