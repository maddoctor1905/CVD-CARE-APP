import {Injectable} from '@angular/core';
import {CalendarService} from './calendar.service';
import {DayElement} from '../@Models/calendar.model';
import {PatientService} from './patient.service';

@Injectable()
export class WhatsappService {
  private break = '%0a';
  private apiUrl = 'https://api.whatsapp.com/send';

  constructor(private readonly calendar: CalendarService, private patientService: PatientService) {
  }

  sendSymptomsOfWeek() {
    const days = this.findCurrentWeek();
    const messageContent = this.formatMessageContent(days);
    const headMessage = this.formatMessageHead();
    const url = `${this.apiUrl}?phone=33607749594&text=${headMessage}${messageContent}`;
    window.open(url, '_blanck');
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
      message += item.date.toLocaleDateString() + ': ';
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
    return `Hello, ${this.break}I am ${this.patientService.patient.PatName}.${this.break}` + `
    I'd like to share with you my symptoms of the previous week.${this.break}`;
  }
}
