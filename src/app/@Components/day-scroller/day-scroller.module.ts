import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayScrollerComponent } from './day-scroller.component';



@NgModule({
  declarations: [DayScrollerComponent],
  imports: [
    CommonModule
  ],
  exports: [DayScrollerComponent]
})
export class DayScrollerModule { }
