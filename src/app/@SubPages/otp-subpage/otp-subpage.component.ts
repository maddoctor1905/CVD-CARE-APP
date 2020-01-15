import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PinCodeTyperState} from '../../@Components/pin-code-typer/pin-code-typer.model';

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

  constructor() {
  }

  ngOnInit() {
  }

  otpCodeEntered(otp: string) {
    if (otp.includes('9')) {
      this.pinCodeState.danger = true;
      this.pinCodeState.success = false;
      this.pinCodeState.buttonChangeNumber = true;
      this.otpCodeInvalid.emit();
    } else {
      this.pinCodeState.success = true;
      this.otpCodeValid.emit();
    }
  }

  changePhoneNumberEvent() {
    this.changePhoneNumber.emit();
  }
}
