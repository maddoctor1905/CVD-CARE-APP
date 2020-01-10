import {Component, Input, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-collapsile',
  templateUrl: './card-collapsile.component.html',
  styleUrls: ['./card-collapsile.component.scss']
})
export class CardCollapsileComponent implements OnInit {
  iconAngleDown = faAngleDown;
  iconAngleUp = faAngleUp;
  active = false;
  @Input() title = '';

  constructor() {
  }

  ngOnInit() {
  }

}
