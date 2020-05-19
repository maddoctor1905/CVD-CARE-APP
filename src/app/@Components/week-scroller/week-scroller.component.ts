import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeekElement} from '../../@Models/calendar.model';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

@Component({
  selector: 'app-week-scroller',
  templateUrl: './week-scroller.component.html',
  styleUrls: ['./week-scroller.component.scss']
})
export class WeekScrollerComponent implements OnInit {

  @Input() weekElements: WeekElement[] = [];
  @Output() weekElementClicked = new EventEmitter<WeekElement>();
  currentMonth: string;

  constructor() {
  }

  ngOnInit() {

  }

  itemClicked(item: WeekElement) {
    this.weekElements.forEach(e => e.active = false);
    item.active = true;
    this.weekElementClicked.emit(item);
  }

  getMonth(): string {
    for (const item of this.weekElements) {
      if (item.active) {
        return monthNames[item.days[0].date.getMonth()];
      }
    }
  }
}
