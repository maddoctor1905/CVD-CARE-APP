import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-choose-lang-subpage',
  templateUrl: './choose-lang-subpage.component.html',
  styleUrls: ['./choose-lang-subpage.component.scss']
})
export class ChooseLangSubpageComponent implements OnInit {
  changeLangIcon = faGlobe;

  @Output() langSelected = new EventEmitter<string>();
  @Input() cardMode = false;
  @Input() actualLang = 'English';

  constructor() {
  }

  ngOnInit() {
  }

  selectChange(e: HTMLSelectElement) {
    if (e.value === 'English') {
      this.langSelected.emit('en-US');
    } else if (e.value === 'Francais') {
      this.langSelected.emit('fr-FR');
    } else {
      this.langSelected.emit('kn-IN');
    }
  }
}
