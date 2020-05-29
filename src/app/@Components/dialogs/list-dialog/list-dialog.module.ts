import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListDialogComponent} from './list-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListDialogComponent,
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    FormsModule,
  ],
  exports: [
    ListDialogComponent,
  ],
})
export class ListDialogModule {
}
