import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadSubpageComponent } from './preload-subpage.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [PreloadSubpageComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    FormsModule
  ],
  exports: [PreloadSubpageComponent]
})
export class PreloadSubpageModule { }
