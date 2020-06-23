import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmergencyPageComponent} from './emergency-page.component';


const routes: Routes = [
  {
    path: '',
    component: EmergencyPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyPageRoutingModule { }
