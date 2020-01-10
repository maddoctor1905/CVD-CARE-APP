import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BottomBarComponent} from './bottom-bar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    BottomBarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BottomBarComponent
  ]
})
export class BottomBarModule { }
