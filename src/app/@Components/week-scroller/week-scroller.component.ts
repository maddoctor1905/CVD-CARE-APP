import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeekElement} from '../../@Models/calendar.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-week-scroller',
  templateUrl: './week-scroller.component.html',
  styleUrls: ['./week-scroller.component.scss']
})
export class WeekScrollerComponent implements OnInit {

  @Input() weekElements: WeekElement[] = [];
  @Output() weekElementClicked = new EventEmitter<WeekElement>();
  monthNames = [];
  currentWeek: WeekElement;

  constructor(
    private translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    this.translateService.onLangChange.subscribe(() => {
      this.loadLocaleMonths();
    })
    this.loadLocaleMonths();
    this.currentWeek = this.getActiveWeek();
  }

  itemClicked(item: WeekElement) {
    this.weekElements.forEach(e => e.active = false);
    item.active = true;
    this.weekElementClicked.emit(item);
  }

  getMonth(): string {
    for (const item of this.weekElements) {
      if (item.active) {
        return this.monthNames[item.days[0].date.getMonth()];
      }
    }
  }

  private loadLocaleMonths() {
    this.monthNames = Array.from({length: 12}, (e, i) => {
      return new Date(null, i + 1, null).toLocaleDateString(this.translateService.currentLang, {month: 'long'});
    })
  }

  isCurrentWeek(item: WeekElement) {
    return item === this.currentWeek;
  }

  private getActiveWeek() {
    for (const item of this.weekElements) {
      if (item.active) {
        return item;
      }
    }
  }
}
