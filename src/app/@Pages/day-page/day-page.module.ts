import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DayPageRoutingModule} from './day-page-routing.module';
import {DayPageComponent} from './day-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CardCollapsileModule} from '../../@Components/card-collapsile/card-collapsile.module';
import {IconBarModule} from '../../@Components/icon-bar/icon-bar.module';
import {WeekScrollerModule} from '../../@Components/week-scroller/week-scroller.module';
import {DayScrollerModule} from '../../@Components/day-scroller/day-scroller.module';
import {TranslateModule} from '@ngx-translate/core';
import {WhatsappService} from '../../@Services/whatsapp.service';


@NgModule({
  declarations: [DayPageComponent],
    imports: [
        CommonModule,
        DayPageRoutingModule,
        FontAwesomeModule,
        CardCollapsileModule,
        IconBarModule,
        WeekScrollerModule,
        DayScrollerModule,
        TranslateModule,
    ],
  providers: [WhatsappService]
})
export class DayPageModule {
}
