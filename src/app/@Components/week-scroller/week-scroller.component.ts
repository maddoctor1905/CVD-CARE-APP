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

  addLeadingZero(date: number) {
    const str = date.toString();
    if (str.length === 1) {
      return ('0' + str);
    }
    return (str);
  }

  onScroll(event: Event) {
    const scrollerElement = event.target as HTMLElement;
    const element = (document.elementFromPoint(window.innerWidth / 2, (scrollerElement.getBoundingClientRect().y) +
      scrollerElement.getBoundingClientRect().height / 2))
    const index = Number(element.getAttribute('index'));
    const scrolledMonth = (this.monthNames[this.weekElements[index].days[0].date.getMonth()]);
    this.itemClicked(this.weekElements[index]);
  }
}
