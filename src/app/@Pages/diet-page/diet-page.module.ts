import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietPageRoutingModule } from './diet-page-routing.module';
import { DietPageComponent } from './diet-page.component';


@NgModule({
  declarations: [DietPageComponent],
  imports: [
    CommonModule,
    DietPageRoutingModule
  ]
})
export class DietPageModule { }
