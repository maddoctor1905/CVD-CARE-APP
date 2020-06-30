import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadDialogComponent} from './preload-dialog.component';
import {PreloadSubpageModule} from '../../../@SubPages/preload-subpage/preload-subpage.module';


@NgModule({
  declarations: [
    PreloadDialogComponent,
  ],
  imports: [
    CommonModule,
    PreloadSubpageModule,
  ],
  exports: [
    PreloadDialogComponent,
  ],
})
export class PreloadDialogModule {
}
