import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface PhoneNumberChange {
  status: boolean;
  value: string;
}

@Component({
  selector: 'app-enter-phonenumber-subpage',
  templateUrl: './enter-phonenumber-subpage.component.html',
  styleUrls: ['./enter-phonenumber-subpage.component.scss']
})
export class EnterPhonenumberSubpageComponent implements OnInit {
  iconPhone = faPhone;
  @Input() phoneNumber = '';
  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl(this.phoneNumber,
      [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)])
  });
  @Output() phoneNumberChange: EventEmitter<PhoneNumberChange> = new EventEmitter();
  @Input() error: string;

  constructor() {
  }

  ngOnInit() {
    this.form.get('phoneNumber').valueChanges.subscribe((value: string) => {
      if (this.form.valid) {
        this.phoneNumberChange.emit({status: true, value});
      } else {
        this.phoneNumberChange.emit({status: false, value});
      }
    });
  }
}
