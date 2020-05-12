import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faInfoCircle, faPhone} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface PhoneNumberChange {
  status: boolean;
  phoneNumber: string;
  fullName: string;
}

@Component({
  selector: 'app-enter-phonenumber-subpage',
  templateUrl: './enter-phonenumber-subpage.component.html',
  styleUrls: ['./enter-phonenumber-subpage.component.scss']
})
export class EnterPhonenumberSubpageComponent implements OnInit {
  iconPhone = faPhone;
  iconName = faInfoCircle;
  @Input() phoneNumber = '';
  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl(this.phoneNumber,
      [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  @Output() phoneNumberChange: EventEmitter<PhoneNumberChange> = new EventEmitter();
  @Input() error: string;

  constructor() {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((value: string) => {
      const form = this.form.getRawValue();
      if (this.form.valid) {
        this.phoneNumberChange.emit({status: true, ...form});
      } else {
        this.phoneNumberChange.emit({status: false, ...form});
      }
    });
  }
}
