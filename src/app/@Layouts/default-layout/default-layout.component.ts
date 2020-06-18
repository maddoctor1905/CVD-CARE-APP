import {Component, OnInit} from '@angular/core';
import {BottomBarElement} from '../../@Components/bottom-bar/bottom-bar.model';
import {
  faAmbulance,
  faCalendarDay,
  faHome, faLanguage,
  faRunning,
  faSignOutAlt,
  faUser,
  faUserCog, faUserMd,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarElement} from '../../@Components/sidebar/sidebar.model';
import {AppService} from '../../@Services/app.service';
import {TranslateService} from '@ngx-translate/core';
import {filter, take} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {PatientService} from '../../@Services/patient.service';
import {PatientMedicationService} from '../../@Services/patient-medication.service';
import {PatientInvestigationService} from '../../@Services/patient-investigation.service';
import {PatientRecruitmentService} from '../../@Services/patient-recruitment.service';
import {OverlayService} from '../../@Services/overlay.service';
import {PatientSymptomService} from '../../@Services/patient-symptom.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  bottomBarElements: BottomBarElement[] = [
    {
      route: '/app/day',
      active: false,
      icon: faCalendarDay,
      name: 'bottomBar.calendar',
    },
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
      icon: faUtensils,
      name: 'sidebar.diet',
      url: '/app/diet',
      active: false,
    }, {
      icon: faRunning,
      name: 'sidebar.exercise',
      url: '/app/exercise',
      active: false,
    },
    {
      icon: faUserMd,
      name: 'sidebar.doctor',
      url: '/app/doctors',
      active: false,
    },
  ];
  sidebarCommunicateElements: SidebarElement[] = [
    {
      icon: faAmbulance,
      name: 'sidebar.emergency',
      url: '',
      active: false,
    },
  ];

  sidebarSettingElements: SidebarElement[] = [
    {
      icon: faLanguage,
      name: 'sidebar.lang',
      url: '',
      active: false,
      custom: this.showLangPopup.bind(this),
    },
    {
      icon: faSignOutAlt,
      name: 'sidebar.logout',
      url: '',
      active: false,
      custom: () => '',
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
    },
  };

  constructor(private router: Router,
              private appService: AppService,
              private translateService: TranslateService,
              private readonly patientMedicationService: PatientMedicationService,
              private readonly patientInvestigationService: PatientInvestigationService,
              private readonly patientService: PatientService,
              private readonly patientRecruitmentService: PatientRecruitmentService,
              private readonly patientSymptomService: PatientSymptomService,
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
    this.patientService.patient$.pipe(filter((p) => !!p), take(1)).subscribe((patient) => {
      forkJoin([this.patientMedicationService.init(), this.patientInvestigationService.init(),
        this.patientRecruitmentService.init(), this.patientSymptomService.init()]).subscribe((a) => {
        console.log('[START] services initialized');
      });
    });
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
      this.appService.logout();
      return this.router.navigateByUrl('/');
    }
    if (e.custom) {
      e.custom();
    } else {
      this.router.navigateByUrl(e.url);
    }
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
    console.log(locale);
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
    this.sidebarSettingElements.forEach(e => {
      this.translateService.get(e.name).subscribe(t => e.name = t);
    });
  }
}
