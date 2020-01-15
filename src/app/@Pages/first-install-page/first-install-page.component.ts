import {Component, OnInit} from '@angular/core';
import {StepperService} from '../../@Components/stepper/stepper.service';
import {FirstInstallService} from './first-install.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-first-install-page',
  templateUrl: './first-install-page.component.html',
  styleUrls: ['./first-install-page.component.scss']
})
export class FirstInstallPageComponent implements OnInit {
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
    private router: Router
  ) {
    this.stepperService.limit = 3;
  }

  ngOnInit() {
  }

  stepperNextClicked() {
    // TODO If form valid go
    this.stepperService.next();
  }

  stepperPreviousClicked() {
    this.stepperService.previous();
  }

  stepperConfirmClicked() {
    localStorage.setItem('firstInstall', 'true');
    localStorage.setItem('otpCode', 'true');
    localStorage.setItem('CLIENT_UNIQUE_ID', 'true');
    setTimeout(() => {
      this.router.navigateByUrl('/app/day');
    }, 1000);
  }

  getPhoneNumber() {
    return (this._firstInstallService.phoneNumber);
  }
}
