import {Component, OnInit} from '@angular/core';
import {IconBarElement} from '../../@Components/icon-bar/icon-bar.model';
import {DayElement, WeekElement} from '../../@Models/calendar.model';
import {CalendarService} from '../../@Services/calendar.service';
import {TranslateService} from '@ngx-translate/core';
import {PatientService} from '../../@Services/patient.service';
import {PatientMedicationService} from '../../@Services/patient-medication.service';
import {PatientInvestigationService} from '../../@Services/patient-investigation.service';

@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})
export class DayPageComponent implements OnInit {
  get weekElements(): WeekElement[] {
    return this._weekElements;
  }

  set weekElements(value: WeekElement[]) {
    this._weekElements = value;
  }

  iconsForFilterBar: IconBarElement[] = [
    {
      char: '🚨',
      active: true
    },
    {
      char: '👔',
      active: true
    },
    {
      char: '💊',
      active: true
    },
    {
      char: '📅',
      active: false
    },
  ];

  private _weekElements: WeekElement[] = [];

  constructor(
    private calendarService: CalendarService,
    public translateService: TranslateService,
    private readonly patientService: PatientService,
    private readonly patientMedicationService: PatientMedicationService,
    private readonly patientInvestigationService: PatientInvestigationService
  ) {
  }

  ngOnInit() {
    this.weekElements = this.calendarService.getCalendarWeeksForMock(new Date(Date.now()));
  }

  calendarChangeDayEvent($event: DayElement) {

  }

  calendarChangeWeekEvent($event: WeekElement) {

  }

  getActiveWeek() {
    for (const i of this.weekElements) {
      if (i.active) {
        return (i);
      }
    }
  }

  isAllowedEmoji(emoji: string) {
    let allowed = false;
    this.iconsForFilterBar.forEach(e => {
      if (e.char === emoji && e.active) {
        allowed = true;
      }
    });
    return (allowed);
  }
}
