import {Component, OnInit} from '@angular/core';
import {StepperService} from '../../@Components/stepper/stepper.service';
import {FirstInstallService} from './first-install.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PhoneNumberChange} from '../../@SubPages/enter-phonenumber-subpage/enter-phonenumber-subpage.component';
import {Patient} from '../../@Models/patient';

@Component({
  selector: 'app-first-install-page',
  templateUrl: './first-install-page.component.html',
  styleUrls: ['./first-install-page.component.scss']
})
export class FirstInstallPageComponent implements OnInit {
  error: string;

  get firstInstallService(): FirstInstallService {
    return this._firstInstallService;
  }

  set firstInstallService(value: FirstInstallService) {
    this._firstInstallService = value;
  }

  get stepperService(): StepperService {
    return this._stepperService;
  }

  set stepperService(value: StepperService) {
    this._stepperService = value;
  }

  constructor(
    private _stepperService: StepperService,
    public _firstInstallService: FirstInstallService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.stepperService.limit = 3;
  }

  ngOnInit() {
  }

  stepperNextClicked() {
    if (this._stepperService.currentIndex === 0) {
      this.stepperService.next();
    } else if (this._firstInstallService.steps.phone && this._stepperService.currentIndex === 1) {
      this.firstInstallService.createUnconfirmedUser().subscribe(() => {
        this.stepperService.next();
      }, (err) => {
        this.error = err.error.message;
      });
    }
  }

  stepperPreviousClicked() {
    this.stepperService.previous();
  }

  stepperConfirmClicked() {
    this.firstInstallService.finishInstallation().subscribe((patient: Patient) => {
      console.log(patient);
      localStorage.setItem('firstInstall', 'true');
      localStorage.setItem('otpCode', 'true');
      localStorage.setItem('CLIENT_UNIQUE_ID', patient.id.toString());
      localStorage.setItem('firstInstallTime', Date.now().toString());
      setTimeout(() => {
        this.router.navigateByUrl('/app/day');
      }, 1000);
    });
  }

  getPhoneNumber() {
    return (this._firstInstallService.phoneNumber);
  }

  setLang(locale: string) {
    this.translateService.use(locale);
    this.translateService.setDefaultLang(locale);
    localStorage.setItem('favoriteLang', locale);
  }

  public phoneNumberChange(event: PhoneNumberChange) {
    this._firstInstallService.phoneNumberChange(event);
  }
}
