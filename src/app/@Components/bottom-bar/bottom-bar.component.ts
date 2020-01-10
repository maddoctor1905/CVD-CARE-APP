import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faCalendarDay, faCircle, faHome, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {BottomBarConfig, BottomBarElement} from './bottom-bar.model';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  iconHome = faHome;
  iconSettings = faUserCog;
  iconCalendar = faCalendarDay;
  iconBG = faCircle;

  @Input() config: BottomBarConfig;
  @Input() elements: BottomBarElement[] = [];
  @Output() elementClicked = new EventEmitter<BottomBarElement>();

  constructor() {
  }

  ngOnInit() {
  }

  onElementClick(item: BottomBarElement) {
    this.elementClicked.emit(item);
  }
}
