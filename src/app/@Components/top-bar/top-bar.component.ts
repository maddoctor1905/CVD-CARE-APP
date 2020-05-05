import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBars, faLanguage} from '@fortawesome/free-solid-svg-icons';
import {TopBarService} from './top-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  iconSidebar = faBars;
  iconLang = faLanguage;

  @Output() iconSidebarClicked = new EventEmitter();
  @Output() iconMoreClicked = new EventEmitter();

  constructor(
    private topBarService: TopBarService,
  ) {
  }

  ngOnInit() {
  }

  sideBarIconClicked() {
    this.iconSidebarClicked.emit();
  }

  moreIconClicked() {
    this.iconMoreClicked.emit();
  }

  isSpinning() {
    return (this.topBarService.isSpinning$);
  }
}
