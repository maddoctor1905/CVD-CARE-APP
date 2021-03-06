import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [TopBarComponent],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
