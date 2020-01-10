import {Component, OnInit} from '@angular/core';
import {PinCodeTyperState} from '../../@Components/pin-code-typer/pin-code-typer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  get pinCodeState(): PinCodeTyperState {
    return this._pinCodeState;
  }

  set pinCodeState(value: PinCodeTyperState) {
    this._pinCodeState = value;
  }

  private _pinCodeState: PinCodeTyperState = {};

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  async pinCodeEnterEvent(otpCode: string) {
    this.pinCodeState.success = true;
    // Dev Purpose
    localStorage.setItem('CLIENT_UNIQUE_ID', otpCode);
    setTimeout(() => {
      this.router.navigateByUrl('/app/day');
    }, 500);
  }
}
