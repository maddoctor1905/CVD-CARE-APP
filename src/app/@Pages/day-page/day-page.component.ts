import {Component, OnInit} from '@angular/core';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {IconBarElement} from '../../@Components/icon-bar/icon-bar.model';
import {DayElement, WeekElement} from '../../@Models/calendar.model';
import {CalendarService} from '../../@Services/calendar.service';

@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})
export class DayPageComponent implements OnInit {
  get weekElements(): WeekElement[] {
    return this._weekElements;
  }

  set weekElements(value: WeekElement[]) {
    this._weekElements = value;
  }

  moreDetailsIcon = faArrowRight;
  iconsForFilterBar: IconBarElement[] = [
    {
      char: '🚨',
      active: true
    },
    {
      char: '👔',
      active: true
    },
    {
      char: '💊',
      active: true
    },
    {
      char: '📅',
      active: false
    },
  ];

  private _weekElements: WeekElement[] = [];

  constructor(
    private calendarService: CalendarService
  ) {
  }

  ngOnInit() {
    this.weekElements = this.calendarService.getCalendarWeeksForMock(new Date(Date.now()));
  }

  calendarChangeDayEvent($event: DayElement) {

  }

  calendarChangeWeekEvent($event: WeekElement) {

  }

  getActiveWeek() {
    for (const i of this.weekElements) {
      if (i.active) {
        return (i);
      }
    }
  }
}
