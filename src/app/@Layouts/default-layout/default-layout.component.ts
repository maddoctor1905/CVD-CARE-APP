import {Component, OnInit} from '@angular/core';
import {BottomBarElement} from '../../@Components/bottom-bar/bottom-bar.model';
import {
  faAmbulance,
  faCalendarDay,
  faHome,
  faRunning,
  faSignOutAlt,
  faUser,
  faUserCog,
  faUserMd,
  faUtensils
} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarElement} from '../../@Components/sidebar/sidebar.model';
import {AppService} from '../../@Services/app.service';
import {TranslateService} from '@ngx-translate/core';

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
      name: 'bottomBar.calendar'
    },
    {
      route: '/app/home',
      active: true,
      icon: faHome,
      name: 'bottomBar.home'
    },
    {
      route: '/app/settings',
      active: false,
      icon: faUserCog,
      name: 'bottomBar.settings'
    }
  ];

  sideBarVisible = false;
  sidebarLinksElements: SidebarElement[] = [

    {
      icon: faHome,
      name: 'sidebar.home',
      url: '/app/day',
      active: true,
    }, {
      icon: faUser,
      name: 'sidebar.personalDetails',
      url: '/app/personal-details',
      active: false,
    }, {
      icon: faUserMd,
      name: 'sidebar.doctor',
      url: '',
      active: false,
    }, {
      icon: faUtensils,
      name: 'sidebar.diet',
      url: '',
      active: false,
    }, {
      icon: faRunning,
      name: 'sidebar.exercise',
      url: '',
      active: false,
    },
  ];
  sidebarCommunicateElements: SidebarElement[] = [
    {
      icon: faAmbulance,
      name: 'sidebar.emergency',
      url: '',
      active: false,
    }, {
      icon: faSignOutAlt,
      name: 'sidebar.logout',
      url: '',
      active: false,
    },
  ];

  modal = {
    is: {
      visible: false,
      langView: false,
    },
    has: {
      closeProtection: false,
      contextData: {},
    }
  };

  constructor(private router: Router,
              private appService: AppService,
              private translateService: TranslateService
  ) {
    this.translateBottombar();
    this.translateSidebar();
    this.translateService.onLangChange.subscribe(() => {
      this.translateBottombar();
      this.translateSidebar();
    });
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

  sidebarElementClicked(e: SidebarElement) {
    this.sideBarVisible = false;
    if (e.name === 'Logout') {
      return this.appService.logout();
    }
    this.router.navigateByUrl(e.url);
  }

  showLangPopup() {
    this.modal.is.langView = true;
    this.modal.is.visible = true;
    switch (this.translateService.getDefaultLang()) {
      case 'en-US':
        this.modal.has.contextData = 'English';
        break;
      case 'fr-FR':
        this.modal.has.contextData = 'Francais';
        break;
      case 'kn-IN':
        this.modal.has.contextData = 'ಕನ್ನಡ';
        break;
    }
  }

  langSelected(locale: string) {
    this.translateService.use(locale);
    this.translateService.setDefaultLang(locale);
    localStorage.setItem('favoriteLang', locale);
    this.modal.is.visible = false;
    this.modal.is.langView = false;
  }

  closeModal() {
    if (!this.modal.has.closeProtection) {
      this.modal.is.visible = false;
    }
  }

  private translateBottombar() {
    this.bottomBarElements.forEach(e => {
      this.translateService.get(e.name).subscribe(translatedText => e.name = translatedText);
    });
  }

  private translateSidebar() {
    this.sidebarCommunicateElements.forEach(e => {
      this.translateService.get(e.name).subscribe(translatedText => e.name = translatedText);
    });
    this.sidebarLinksElements.forEach(e => {
      this.translateService.get(e.name).subscribe(translatedText => e.name = translatedText);
    });
  }
}
