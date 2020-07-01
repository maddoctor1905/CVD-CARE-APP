import {Injectable} from '@angular/core';
import {CalendarService} from './calendar.service';
import {DayElement} from '../@Models/calendar.model';
import {PatientService} from './patient.service';
import {OverlayService} from './overlay.service';
import {SymptomShareDialogComponent} from '../@Components/dialogs/symptom-share-dialog/symptom-share-dialog.component';
import {AlertDialogComponent} from '../@Components/dialogs/alert-dialog/alert-dialog.component';

@Injectable()
export class WhatsappService {
  private break = '%0a';
  private apiUrl = 'https://api.whatsapp.com/send';

  constructor(private readonly calendar: CalendarService, private patientService: PatientService,
              private overlayService: OverlayService) {
  }

  sendSymptomsOfWeek() {
    const days = this.findCurrentWeek();
    const messageContent = this.formatMessageContent(days);
    const headMessage = this.formatMessageHead();
    this.overlayService.open(SymptomShareDialogComponent, {}).afterClosed$.subscribe((res) => {
      if (res.data !== 'no') {
        const url = `${this.apiUrl}?phone=${res.data}&text=${headMessage}${messageContent}`;
        window.open(url, '_blanck');
      }
    });
  }


  private findCurrentWeek() {
    const weeks = this.calendar.calendar$.getValue();
    const activeWeekIndex = weeks.findIndex((item) => {
      return item.active;
    });
    return [...weeks[activeWeekIndex - 1].days, weeks[activeWeekIndex].days[0]];
  }

  private formatMessageContent(days: DayElement[]): string {
    let message = '';
    for (const item of days) {
      message += item.date.toLocaleString('en-us', {weekday: 'long', day: '2-digit', month: 'long'}) + ': ';
      let used = false;
      for (const i of item.events) {
        if (i.typeName === 'symptom') {
          message += i.text.reduce((previous, current) => {
            return previous += ', ' + current;
          });
          used = true;
        }
      }
      if (used === false) {
        message += 'No symptoms for this date';
      }
      message += this.break;
    }
    return message;
  }

  private formatMessageHead() {
    return `Hello, ${this.break}I am ${this.patientService.patient.PatName}.${this.break}` +
      `I'd like to share with you my symptoms of the previous week.${this.break}`;
  }

  showError(title: string, message) {
    this.overlayService.open(AlertDialogComponent, {
      title,
      message,
      emoji: '⚠️',
    });
  }
}
