import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YesOrNoDialogComponent} from './yes-or-no-dialog.component';


@NgModule({
  declarations: [
    YesOrNoDialogComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    YesOrNoDialogComponent,
  ],
})
export class YesOrNoDialogModule {
}
