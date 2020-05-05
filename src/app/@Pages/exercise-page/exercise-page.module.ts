import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisePageRoutingModule } from './exercise-page-routing.module';
import { ExercisePageComponent } from './exercise-page.component';


@NgModule({
  declarations: [ExercisePageComponent],
  imports: [
    CommonModule,
    ExercisePageRoutingModule
  ]
})
export class ExercisePageModule { }
