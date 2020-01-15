import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeekElement} from '../../@Models/calendar.model';

@Component({
  selector: 'app-week-scroller',
  templateUrl: './week-scroller.component.html',
  styleUrls: ['./week-scroller.component.scss']
})
export class WeekScrollerComponent implements OnInit {

  @Input() weekElements: WeekElement[] = [];
  @Output() weekElementClicked = new EventEmitter<WeekElement>();

  constructor() {
  }

  ngOnInit() {
  }

  itemClicked(item: WeekElement) {
    this.weekElements.forEach(e => e.active = false);
    item.active = true;
    this.weekElementClicked.emit(item);
  }
}
