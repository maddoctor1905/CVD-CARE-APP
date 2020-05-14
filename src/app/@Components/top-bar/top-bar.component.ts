import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBars, faLanguage} from '@fortawesome/free-solid-svg-icons';
import {TopBarService} from './top-bar.service';
import {PatientService} from '../../@Services/patient.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  iconSidebar = faBars;
  iconLang = faLanguage;
  firstName: string;

  @Output() iconSidebarClicked = new EventEmitter();
  @Output() iconMoreClicked = new EventEmitter();

  constructor(
    private topBarService: TopBarService,
    private readonly patientService: PatientService,
  ) {
  }

  ngOnInit() {
    this.patientService.patient$.pipe(filter(p => !!p)).subscribe((patient) => {
      this.firstName = patient.PatName.split(' ')[0];
    });
  }

  sideBarIconClicked() {
    this.iconSidebarClicked.emit();
  }

  moreIconClicked() {
    this.iconMoreClicked.emit();
  }

  isSpinning() {
    return (this.topBarService.isSpinning$);
  }
}
