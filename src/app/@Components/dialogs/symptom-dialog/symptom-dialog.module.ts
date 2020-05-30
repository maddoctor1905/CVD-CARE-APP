import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymptomDialogComponent } from './symptom-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [SymptomDialogComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [SymptomDialogComponent]

})
export class SymptomDialogModule { }
