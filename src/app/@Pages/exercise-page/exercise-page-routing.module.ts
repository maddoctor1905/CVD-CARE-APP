import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExercisePageComponent} from './exercise-page.component';


const routes: Routes = [
  {
    path: '',
    component: ExercisePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisePageRoutingModule { }
