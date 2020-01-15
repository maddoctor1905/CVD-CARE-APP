import {Component, Input, OnInit} from '@angular/core';
import {faPhone} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-enter-phonenumber-subpage',
  templateUrl: './enter-phonenumber-subpage.component.html',
  styleUrls: ['./enter-phonenumber-subpage.component.scss']
})
export class EnterPhonenumberSubpageComponent implements OnInit {
  iconPhone = faPhone;
  @Input() phoneNumber = '';

  constructor() { }

  ngOnInit() {
  }
}
