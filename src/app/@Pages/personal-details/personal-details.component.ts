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

  patient: Patient = {
    Address: '',
    AltMobileNo: 9900410153,
    CGId: 0,
    City: '',
    Email: 'contact@enoviah.fr',
    FCGEmail: '',
    FCGName: '',
    IsOwnPhone: 0,
    IsSmartPhone: 0,
    KCity: '',
    KFCGName: '',
    KLocation: '',
    Location: '',
    MobileNo: 8855229634,
    PatDesc: '',
    PatName: 'Suresh Alimad',
    Pincode: 0,
    Registered: 0,
    Relationship: '',
    id: 564
  };

  constructor(
    private topBarService: TopBarService,
  ) {
  }

  ngOnInit() {
    this.topBarService.setSpinning(true);
    setTimeout(() => {
      this.topBarService.setSpinning(false);
      const patientCached = localStorage.getItem('personalDetails');
      if (patientCached) {
        this.patient = JSON.parse(patientCached);
      }
      this.form = new FormGroup({
        id: new FormControl(this.patient.id,
          [Validators.min(0), Validators.max(9999999)]),
        PatName: new FormControl(this.patient.PatName,
          []),
        MobileNo: new FormControl(this.patient.MobileNo,
          [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
        AltMobileNo: new FormControl(this.patient.AltMobileNo,
          [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
        Email: new FormControl(this.patient.Email,
          [Validators.email]),
        Location: new FormControl(this.patient.Location,
          []),
        // Other
        Religion: new FormControl('',
          []),
        Graduation: new FormControl('',
          []),
        Birth: new FormControl('',
          []),
      });
    }, 1000);
  }

  submit() {
    if (this.form.valid) {
      this.patient = {...this.patient, ...this.form.value};
      localStorage.setItem('personalDetails', JSON.stringify(this.patient));
    }
  }
}
