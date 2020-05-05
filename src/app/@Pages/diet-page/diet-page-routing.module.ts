import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DietPageComponent} from './diet-page.component';


const routes: Routes = [
  {
    path: '',
    component: DietPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietPageRoutingModule { }
