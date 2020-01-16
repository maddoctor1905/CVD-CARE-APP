import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBars, faEllipsisV, faGlobeAsia} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  iconSidebar = faBars;
  iconLang = faGlobeAsia;
  iconMore = faEllipsisV;

  @Output() iconSidebarClicked = new EventEmitter();
  @Output() iconMoreClicked = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  sideBarIconClicked() {
    this.iconSidebarClicked.emit();
  }
}
