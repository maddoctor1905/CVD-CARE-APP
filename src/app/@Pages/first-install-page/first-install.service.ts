import {Injectable} from '@angular/core';
import {PhoneNumberChange} from '../../@SubPages/enter-phonenumber-subpage/enter-phonenumber-subpage.component';
import {RequestService} from '../../@Services/request.service';
import {map, tap} from 'rxjs/operators';
import {Otp} from '../../@Models/otp.model';
import {Observable} from 'rxjs';
import {Patient} from '../../@Models/patient';
import {PatientService} from '../../@Services/patient.service';

@Injectable({
  providedIn: 'root'
})
export class FirstInstallService {

  private _lang = '';
  private _phoneNumber = '09';
  private _otpCode = '';
  private _steps = {
    phone: false,
    otp: false,
  };

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

  public get steps(): { phone: boolean; otp: boolean } {
    return this._steps;
  }

  public set steps(value: { phone: boolean; otp: boolean }) {
    this._steps = value;
  }

  createUnconfirmedUser() {
    return this.requestService.generateOtp(this.phoneNumber).pipe(tap((response: Otp) => {
      this._otpCode = response.code;
      alert('Your otp code: ' + response.code);
    }));
  }

  confirmUser(code: string) {
    return this.requestService.confirmOtp(this._phoneNumber, code);
  }

  phoneNumberChange(event: PhoneNumberChange) {
    this._steps.phone = event.status;
    if (event.status) {
      this._phoneNumber = event.value;
    }
  }

  finishInstallation() {
    return this.patientService.initFromPhone(this.phoneNumber);
  }

  getPatient(): Observable<Patient> {
    return this.requestService.getPatientByPhone(this._phoneNumber);
  }

  constructor(private requestService: RequestService, private readonly patientService: PatientService) {
  }
}
