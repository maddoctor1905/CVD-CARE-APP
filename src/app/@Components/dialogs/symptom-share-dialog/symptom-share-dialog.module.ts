import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymptomShareDialogComponent } from './symptom-share-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SymptomShareDialogComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [SymptomShareDialogComponent],
})
export class SymptomShareDialogModule { }
