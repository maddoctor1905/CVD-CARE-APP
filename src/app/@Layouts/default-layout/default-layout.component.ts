import {Component, OnInit} from '@angular/core';
import {BottomBarElement} from '../../@Components/bottom-bar/bottom-bar.model';
import {faCalendarDay, faHome, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  bottomBarElements: BottomBarElement[] = [
    {
      route: '/app/day',
      active: false,
      icon: faCalendarDay,
      name: 'My Day'
    },
    {
      route: '/app/home',
      active: true,
      icon: faHome,
      name: 'Home'
    },
    {
      route: '/app/settings',
      active: false,
      icon: faUserCog,
      name: 'Settings'
    }
  ];

  sideBarVisible = false;

  constructor(private router: Router,
  ) {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.bottomBarElements.forEach((item) => {
          item.active = item.route === events.urlAfterRedirects;
        });
      }
    });
  }

  ngOnInit() {
  }

  bottomBarElementClickEvent(element: BottomBarElement) {
    this.router.navigateByUrl(element.route);
  }

  setSidebarState(state: boolean) {
    this.sideBarVisible = state;
  }
}
