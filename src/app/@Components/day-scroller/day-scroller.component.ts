import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DayElement} from '../../@Models/calendar.model';

@Component({
  selector: 'app-day-scroller',
  templateUrl: './day-scroller.component.html',
  styleUrls: ['./day-scroller.component.scss']
})
export class DayScrollerComponent implements OnInit {

  @Input() dayElements: DayElement[] = [];
  @Output() dayElementClicked = new EventEmitter<DayElement>();

  constructor() {
  }

  ngOnInit() {
  }

  itemClicked(item: DayElement) {
    this.dayElements.forEach(e => e.active = false);
    item.active = true;
    this.dayElementClicked.emit(item);
  }
}
