import {Component, OnInit} from '@angular/core';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {IconBarElement} from '../../@Components/icon-bar/icon-bar.model';

@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})
export class DayPageComponent implements OnInit {

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

  constructor() {
  }

  ngOnInit() {
  }

}
