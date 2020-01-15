import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstInstallService {
  private _lang = '';
  private _phoneNumber = '09';
  private _otpCode = '';

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get otpCode(): string {
    return this._otpCode;
  }

  set otpCode(value: string) {
    this._otpCode = value;
  }

  constructor() {
  }
}
