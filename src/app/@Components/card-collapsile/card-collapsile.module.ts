import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCollapsileComponent } from './card-collapsile.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [CardCollapsileComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [CardCollapsileComponent]
})
export class CardCollapsileModule { }
