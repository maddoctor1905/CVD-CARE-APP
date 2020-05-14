import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faAmbulance, faHome, faRunning, faSignOutAlt, faUser, faUserMd, faUtensils} from '@fortawesome/free-solid-svg-icons';
import {SidebarElement, SidebarSettingElement} from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() clickOutside = new EventEmitter();
  @Input() visible = false;
  @Input() sidebarQuickLinksElements: SidebarElement[] = [];
  @Input() sidebarCommunicateElements: SidebarElement[] = [];
  @Input() sidebarSettingElements: SidebarElement[] = [];
  @Output() elementClicked = new EventEmitter<SidebarElement>();

  constructor() {
  }

  ngOnInit() {
  }

  backgroundClicked() {
    this.clickOutside.emit();
  }

  elementClick(item: SidebarElement) {
    this.sidebarCommunicateElements.forEach(e => e.active = false);
    this.sidebarQuickLinksElements.forEach(e => e.active = false);
    item.active = true;
    this.elementClicked.emit(item);
  }
}
