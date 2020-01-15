import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CalendarEvent, DayElement, WeekElement} from '../@Models/calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCalendarFor(date: Date, nbBefore = 5, nbAfter = 5) {
    return (this.http.get(`${environment.apiRootUrl}/users/:userID/calendar?date=${Math.round(date.getTime() / 1000)}
    &nbBefore=${nbBefore}&nbAfter=${nbAfter}`));
  }

  getCalendarForMock(date: Date, nbBefore = 5, nbAfter = 5) {
    return new Observable<DayElement[]>(subscriber => {
      const startDate = new Date(Date.now());
      const endDate = new Date(Date.now());
      startDate.setDate(date.getDate() - nbBefore);
      endDate.setDate(date.getDate() + nbAfter);
      const datesArray = this.createDateArray(startDate, endDate);
      subscriber.next(datesArray);
    });
  }

  private createDateArray(start: Date, end: Date) {
    const currentDate = new Date(Date.now());
    const arr: DayElement[] = [];
    const dt = new Date(start);
    while (dt <= end) {
      const tmpDate = new Date(dt);
      arr.push({
        active: (currentDate.getDate() === tmpDate.getDate()),
        date: tmpDate,
        events: this.getCalendarEventsForMock(tmpDate),
      });
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }

  private getCalendarEventsForMock(tmpDate: Date): CalendarEvent[] {
    if (tmpDate.getDate() % 2 === 0) {
      return [
        {
          emoji: '👔',
          from: new Date(Date.now()),
          to: new Date(Date.now()),
          text: 'test',
          title: 'title',
          typeName: 'type',
          urgent: false
        }
      ];
    } else {
      return [
        {
          emoji: '💊',
          from: new Date(Date.now()),
          to: new Date(Date.now()),
          text: 'test',
          title: 'title',
          typeName: 'type',
          urgent: false
        }
      ];
    }
  }

  getCalendarWeeksForMock(date: Date): WeekElement[] {
    return ([
      {
        active: (date.getDate() <= 31 && date.getDate() >= 24),
        days: [
          {
            date: new Date(2019, 12, 24),
            events: [],
            active: false
          }, {
            date: new Date(2019, 12, 25),
            events: [],
            active: false
          }, {
            date: new Date(2019, 12, 26),
            events: [],
            active: false
          }, {
            date: new Date(2019, 12, 27),
            events: [],
            active: false
          }, {
            date: new Date(2019, 12, 28),
            events: [],
            active: false
          }, {
            date: new Date(2019, 12, 29),
            events: [],
            active: false
          }, {
            date: new Date(2019, 12, 30),
            events: [],
            active: false
          }, {
            date: new Date(2019, 12, 31),
            events: [],
            active: false
          },
        ]
      },
      {
        active: (date.getDate() >= 1 && date.getDate() <= 7),
        days: [
          {
            date: new Date(2020, 1, 1),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 2),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 3),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 4),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 5),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 6),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 7),
            events: [],
            active: false
          },
        ]
      },
      {
        active:  (date.getDate() >= 7 && date.getDate() <= 14),
        days: [
          {
            date: new Date(2020, 1, 8),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 9),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 10),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 11),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 12),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 13),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 14),
            events: [],
            active: false
          },
        ]
      },
      {
        active:  (date.getDate() >= 14 && date.getDate() <= 21),
        days: [
          {
            date: new Date(2020, 1, 15),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 16),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 17),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 18),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 19),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 20),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 21),
            events: [],
            active: false
          },
        ]
      },
      {
        active:  (date.getDate() >= 21 && date.getDate() <= 28),
        days: [
          {
            date: new Date(2020, 1, 22),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 23),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 24),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 25),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 26),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 27),
            events: [],
            active: false
          }, {
            date: new Date(2020, 1, 28),
            events: [],
            active: false
          },
        ]
      },
    ]);
  }
}
