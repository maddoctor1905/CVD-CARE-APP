import {Component, OnInit} from '@angular/core';

interface DayElement {
  active: boolean;
  number: number;
}

@Component({
  selector: 'app-day-scroller',
  templateUrl: './day-scroller.component.html',
  styleUrls: ['./day-scroller.component.scss']
})
export class DayScrollerComponent implements OnInit {

  dayElements: DayElement[] = [];

  constructor() {
  }

  ngOnInit() {
    const currentDayNumber = new Date(Date.now()).getDate();
    this.dayElements.push({active: false, number: currentDayNumber - 3});
    this.dayElements.push({active: false, number: currentDayNumber - 2});
    this.dayElements.push({active: false, number: currentDayNumber - 1});
    this.dayElements.push({active: true, number: currentDayNumber});
    this.dayElements.push({active: false, number: currentDayNumber + 1});
    this.dayElements.push({active: false, number: currentDayNumber + 2});
    this.dayElements.push({active: false, number: currentDayNumber + 3});
    this.dayElements.push({active: false, number: currentDayNumber + 4});
    this.dayElements.push({active: false, number: currentDayNumber + 5});
    this.dayElements.push({active: false, number: currentDayNumber + 6});
    this.dayElements.push({active: false, number: currentDayNumber + 7});
  }

  itemClicked(item: DayElement) {
    this.dayElements.forEach(e => e.active = false);
    item.active = true;
  }
}
