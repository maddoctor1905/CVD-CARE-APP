import {Component, OnInit} from '@angular/core';
import {IconBarElement} from '../../@Components/icon-bar/icon-bar.model';
import {DayElement, WeekElement} from '../../@Models/calendar.model';
import {CalendarService} from '../../@Services/calendar.service';
import {TranslateService} from '@ngx-translate/core';
import {PatientSymptomService} from '../../@Services/patient-symptom.service';
import {WhatsappService} from '../../@Services/whatsapp.service';

@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})
export class DayPageComponent implements OnInit {
  iconsForFilterBar: IconBarElement[] = [
    {
      char: '🩺',
      active: true,
    },
    {
      char: '💊',
      active: true,
    },
    {
      char: '🧪',
      active: true,
    },
    {
      char: '🚨',
      active: true,
    },
    {
      char: '🔗',
      active: true
    }
  ];

  constructor(
    private calendarService: CalendarService,
    public translateService: TranslateService,
    private readonly patientSymptomService: PatientSymptomService,
    private readonly whatsappService: WhatsappService
  ) {
  }

  private _weekElements: WeekElement[] = [];

  get weekElements(): WeekElement[] {
    return this._weekElements;
  }

  set weekElements(value: WeekElement[]) {
    this._weekElements = value;
  }

  ngOnInit() {
    const actualDate = new Date();
    if (this.calendarService.calendar$.getValue().length) {
      this.weekElements = this.calendarService.calendar$.getValue();
      return;
    }
    this.calendarService.generateCalendarFromDate(actualDate);
    this.calendarService.calendar$.subscribe((item: WeekElement[]) => {
      this.weekElements = item;
    });
    this.calendarService.linkPatientData(actualDate);
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

  isCurrentWeekContainingActualDate() {
    const w = this.getActiveWeek();
    const d = w.days[0];
    const t = new Date();
    return d.date.getMonth() === t.getMonth() && d.date.getDate() === t.getDate();
  }

  addSymptom(itemDay: DayElement) {
    this.patientSymptomService.declareSymptom(itemDay.date);
  }

  sendSymptoms() {
    this.whatsappService.sendSymptomsOfWeek();
  }

  itemClicked(item: IconBarElement) {
    if (item.char === '🔗' && this.isCurrentWeekContainingActualDate()) {
      item.active = true;
      this.sendSymptoms();
    }
  }
}
