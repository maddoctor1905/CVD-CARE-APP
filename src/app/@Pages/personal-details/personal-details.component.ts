import {Component, OnInit} from '@angular/core';
import {
  faAddressBook,
  faAt,
  faCalendarCheck,
  faGraduationCap,
  faMapMarkedAlt,
  faMobileAlt,
  faPhone,
  faPlaceOfWorship,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient, PatientDemographic} from '../../@Models/patient';
import {TopBarService} from '../../@Components/top-bar/top-bar.service';
import {PatientService} from '../../@Services/patient.service';
import {concatMap, filter, mergeMap, tap} from 'rxjs/operators';
import {concat, forkJoin} from 'rxjs';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  iconPhone = faPhone;
  iconUser = faUser;
  iconAddressBook = faAddressBook;
  iconMobile = faMobileAlt;
  iconCalendarCheck = faCalendarCheck;
  iconAt = faAt;
  iconGraduationCap = faGraduationCap;
  iconPlaceOfWorship = faPlaceOfWorship;
  iconAddress = faMapMarkedAlt;
  form: FormGroup;

  patient: Patient;

  constructor(
    private topBarService: TopBarService,
    private readonly patientService: PatientService,
  ) {
  }

  ngOnInit() {
    this.topBarService.setSpinning(true);
    this.patientService.patient$.pipe(filter((patient) => !!patient),
      mergeMap(() => {
        return this.patientService.patientDemographic$.pipe(filter((p) => !!p));
      })).subscribe((patientDemographic: PatientDemographic) => {
      this.topBarService.setSpinning(false);
      console.info(this.patientService.patient);
      this.patient = this.patientService.patient;
      this.form = new FormGroup({
        id: new FormControl(this.patient.id,
          [Validators.min(0), Validators.max(9999999)]),
        PatName: new FormControl(this.patient.PatName,
          [Validators.required]),
        MobileNo: new FormControl(this.patient.MobileNo,
          [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
        AltMobileNo: new FormControl(this.patient.AltMobileNo,
          [Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
        DOB: new FormControl(patientDemographic.DOB,
          []),
        Email: new FormControl(this.patient.Email,
          [Validators.email]),
        Address: new FormControl(this.patient.Address,
          []),
        Location: new FormControl(this.patient.Location,
          []),
        City: new FormControl(this.patient.City,
          []),
        Pincode: new FormControl(this.patient.Pincode,
          [Validators.min(0)]),
        // Other
        MaritialStatus: new FormControl(patientDemographic.MaritialStatus,
          []),
        FCGName: new FormControl(this.patient.Caregiver.CGName, []),
        FCGEmail: new FormControl(this.patient.Caregiver.Email, []),
        FCGMobileNo: new FormControl(this.patient.Caregiver.MobileNo, []),
        FCGAltMobileNo: new FormControl(this.patient.Caregiver.AltMobileNo, []),
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      forkJoin([this.patientService.update(
        {
          ...this.removeKeys(['DOB', 'MaritialStatus', 'FCGName', 'FCGEmail', 'FCGMobileNo', 'FCGAltMobileNo']
            , data),
        }).pipe(tap((patient: Patient) => {
        if (!patient) {
          return null;
        }
        this.patientService.patient = patient;
        this.patientService.patient$.next(patient);
      })), this.patientService.updateDemographic(this.getOnlyKeys(['DOB', 'MaritialStatus'], data))
        .pipe(tap((patientDemographic: PatientDemographic) => {
          this.patientService.patientDemographic$.next(patientDemographic);
        }))]).subscribe(() => {
        localStorage.setItem('personalDetails', JSON.stringify(this.patient));
      });
    }
  }

  getOnlyKeys(keys: string[], data: any) {
    const obj = {};
    keys.forEach((key) => {
      obj[key] = data[key];
    });
    console.info('UPDATE Patient', obj);
    return (obj);
  }

  removeKeys(keys: string[], data: any) {
    const obj = {...data};
    keys.forEach((key) => {
      delete obj[key];
    });
    console.info('UPDATE PatientDemographic', obj);
    return (obj);
  }
}
