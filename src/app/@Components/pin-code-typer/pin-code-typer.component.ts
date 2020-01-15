import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PinCodeTyperState} from './pin-code-typer.model';

@Component({
  selector: 'app-pin-code-typer',
  templateUrl: './pin-code-typer.component.html',
  styleUrls: ['./pin-code-typer.component.scss']
})
export class PinCodeTyperComponent implements OnInit {
  @Input() mandatoryWidth = 6;
  @Output() codeEntered = new EventEmitter<string>();
  @Output() changePhoneNumberAsked = new EventEmitter();
  @Input() state: PinCodeTyperState = {};

  get isCodeValid(): number {
    return this._isCodeValid;
  }

  set isCodeValid(value: number) {
    this._isCodeValid = value;
  }

  get otpCode(): string {
    return this._otpCode;
  }

  set otpCode(value: string) {
    this._otpCode = value;
  }

  // tslint:disable-next-line:variable-name
  private _otpCode = '';
  // tslint:disable-next-line:variable-name
  private _isCodeValid = -1;


  constructor() {
  }

  ngOnInit() {
  }

  numberPressed(digit: number) {
    if (this.otpCode.length === this.mandatoryWidth && this.state.danger) {
      this.state.danger = false;
      this.otpCode = '';
    }
    if (this.otpCode.length + 1 <= this.mandatoryWidth) {
      this.otpCode = `${this.otpCode}${digit}`;
    }
    if (this.otpCode.length === this.mandatoryWidth) {
      return this.login();
    }
  }

  private login() {
    this.codeEntered.emit(this.otpCode);
  }

  changePhoneNumberClicked() {
    this.changePhoneNumberAsked.emit();
  }
}
