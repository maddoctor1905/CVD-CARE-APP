import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DoctorPageComponent} from './doctor-page.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
