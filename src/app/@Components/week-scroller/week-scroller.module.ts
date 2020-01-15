import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeekScrollerComponent} from './week-scroller.component';



@NgModule({
  declarations: [WeekScrollerComponent],
  imports: [
    CommonModule
  ],
  exports: [WeekScrollerComponent]
})
export class WeekScrollerModule { }
