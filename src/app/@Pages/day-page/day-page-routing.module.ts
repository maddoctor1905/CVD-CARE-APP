import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DayPageComponent} from './day-page.component';


const routes: Routes = [
  {
    path: '',
    component: DayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayPageRoutingModule { }
