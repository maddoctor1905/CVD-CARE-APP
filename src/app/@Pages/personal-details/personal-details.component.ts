import {Component, OnInit} from '@angular/core';
import {
  faAddressBook,
  faAt,
  faCalendarCheck,
  faGraduationCap, faMapMarkedAlt,
  faMobileAlt,
  faPhone,
  faPlaceOfWorship,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../@Models/patient';
import {TopBarService} from '../../@Components/top-bar/top-bar.service';
import {PatientService} from '../../@Services/patient.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
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
    this.patientService.patient$.pipe(filter((patient) => !!patient)).subscribe((patient: Patient) => {
      this.topBarService.setSpinning(false);
      this.patient = patient;
      this.form = new FormGroup({
        id: new FormControl(this.patient.id,
          [Validators.min(0), Validators.max(9999999)]),
        PatName: new FormControl(this.patient.PatName,
          []),
        MobileNo: new FormControl(this.patient.MobileNo,
          [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
        AltMobileNo: new FormControl(this.patient.AltMobileNo,
          [Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
        Email: new FormControl(this.patient.Email,
          [Validators.email]),
        Location: new FormControl(this.patient.Location,
          []),
        // Other
        Relationship: new FormControl('',
          []),
        FCGName: new FormControl(this.patient.FCGName, [Validators.required]),
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.patientService.update(data).subscribe((patient: Patient) => {
        this.patientService.patient$.next(patient);
      });
      localStorage.setItem('personalDetails', JSON.stringify(this.patient));
    }
  }
}
