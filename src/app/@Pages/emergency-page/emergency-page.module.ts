import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmergencyPageRoutingModule } from './emergency-page-routing.module';
import { EmergencyPageComponent } from './emergency-page.component';


@NgModule({
  declarations: [EmergencyPageComponent],
  imports: [
    CommonModule,
    EmergencyPageRoutingModule
  ]
})
export class EmergencyPageModule { }
