import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayPageRoutingModule } from './day-page-routing.module';
import { DayPageComponent } from './day-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CardCollapsileModule} from '../../@Components/card-collapsile/card-collapsile.module';
import {IconBarModule} from '../../@Components/icon-bar/icon-bar.module';


@NgModule({
  declarations: [DayPageComponent],
  imports: [
    CommonModule,
    DayPageRoutingModule,
    FontAwesomeModule,
    CardCollapsileModule,
    IconBarModule
  ]
})
export class DayPageModule { }
