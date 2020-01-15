import { Component, OnInit } from '@angular/core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-choose-lang-subpage',
  templateUrl: './choose-lang-subpage.component.html',
  styleUrls: ['./choose-lang-subpage.component.scss']
})
export class ChooseLangSubpageComponent implements OnInit {
  changeLangIcon = faGlobe;

  constructor() { }

  ngOnInit() {
  }

}
