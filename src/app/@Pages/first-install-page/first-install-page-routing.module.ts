import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirstInstallPageComponent} from './first-install-page.component';


const routes: Routes = [
  {
    path: '',
    component: FirstInstallPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstInstallPageRoutingModule { }
