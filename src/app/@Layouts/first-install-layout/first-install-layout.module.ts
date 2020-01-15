import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FirstInstallLayoutRoutingModule} from './first-install-layout-routing.module';
import {FirstInstallLayoutComponent} from './first-install-layout.component';


@NgModule({
  declarations: [FirstInstallLayoutComponent],
  imports: [
    CommonModule,
    FirstInstallLayoutRoutingModule,
  ],
  exports: [FirstInstallLayoutComponent]
})
export class FirstInstallLayoutModule {
}
