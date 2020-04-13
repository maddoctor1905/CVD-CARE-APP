import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PinCodeTyperState} from '../../@Components/pin-code-typer/pin-code-typer.model';
import {FirstInstallService} from '../../@Pages/first-install-page/first-install.service';

@Component({
  selector: 'app-otp-subpage',
  templateUrl: './otp-subpage.component.html',
  styleUrls: ['./otp-subpage.component.scss']
})
export class OtpSubpageComponent implements OnInit {
  pinCodeState: PinCodeTyperState = {
    buttonChangeNumber: false,
    success: false,
    danger: false
  };

  @Output() otpCodeValid = new EventEmitter();
  @Output() otpCodeInvalid = new EventEmitter();
  @Output() changePhoneNumber = new EventEmitter();

  constructor(private readonly firstInstallService: FirstInstallService) {
  }

  ngOnInit() {
  }

  otpCodeEntered(otp: string) {
    this.firstInstallService.confirmUser(otp).subscribe(() => {
      this.pinCodeState.success = true;
      this.otpCodeValid.emit();
    }, (error => {
      this.pinCodeState.danger = true;
      this.pinCodeState.success = false;
      this.pinCodeState.buttonChangeNumber = true;
      this.otpCodeInvalid.emit();
    }));
  }

  changePhoneNumberEvent() {
    this.changePhoneNumber.emit();
  }
}
