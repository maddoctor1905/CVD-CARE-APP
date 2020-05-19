const RecruitmentFrequency = {
  'Monthly': 'Monthly',
  'Weekly': 'Weekly',
  'Daily': 'Daily',
  'Forynightly': 'Forynightly',
  '2 Months': '2 Months',
  '3 Months': '3 Months',
  '6 Months': '6 Months',
  'Yearly': 'Yearly'
}

class RecruitmentHandler {
  constructor(dbHandler, patientHandler, notificationHandler) {
    this._db = dbHandler;
    this._patient = patientHandler;
    this._notification = notificationHandler;

    this._frequency = [{
      matcher: InvestigationFrequency.Monthly,
      decision: this.NbMonthsDecision,
      args: [1]
    }, {
      matcher: InvestigationFrequency['2 Months'],
      decision: this.NbMonthsDecision,
      args: [2]
    }, {
      matcher: InvestigationFrequency['3 Months'],
      decision: this.NbMonthsDecision,
      args: [3]
    }, {
      matcher: InvestigationFrequency['6 Months'],
      decision: this.NbMonthsDecision,
      args: [6]
    }, {
      matcher: InvestigationFrequency.Yearly,
      decision: this.yearlyDecision,
    }, {
      matcher: InvestigationFrequency.Weekly,
      decision: this.weeklyDecision,
      args: [7],
    }, {
      matcher: InvestigationFrequency.Daily,
      decision: () => true,
      args: [1],
    }];
  }

  async syncronizeFromMessage(message) {
    const dbEntries = await this.getAllFromDb();
    for (const item of message) {
      const itemExist = dbEntries.find((entrie) => {
        return entrie.id === item.id;
      });
      if (!itemExist) {
        await this._db.recruitments.put(item);
      }
    }
  }

  async periodicSync(registration) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(8, 0, 0, 0);
    const recruitments = await this.getAllFromDb();
    for (const item of recruitments) {
      const dateToCheck = (item.LastDVisitDate) ? new Date(item.LastDVisitDate) : new Date(item.SurveyDate);
      const frequencyDecision = this._frequency.find((decisionItem) => {
        return decisionItem.matcher === item.DVisitFrequency;
      });
      if (frequencyDecision && frequencyDecision.decision(date, dateToCheck, frequencyDecision.args)) {
        this.sendNotification(item, registration);
      }
    }
  }

  sendNotification(recruitment, registration) {
    const body = 'You have a recruitment tomorrow\n ' + recruitment.Doctor.DName;
    this._notification.show('Recruitment', body, registration);
  }

  async getAllFromDb() {
    return this._db.recruitments.toArray();
  }

  yearlyDecision(calendarDate, eventFirstDate) {
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setFullYear(calendarDate.getFullYear());
    return calendarDate.getDate() === eventFirstDate.getDate() && calendarDate.getMonth() === eventFirstDate.getMonth();
  }

  NbMonthsDecision(date, eventFirstDate, ...args) {
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setMonth(date.getMonth());
    return ((date.getMonth() + eventFirstDate.getMonth()) % args[0] === 0) &&
      date.getDate() === eventFirstDate.getDate();
  }

  weeklyDecision(date, eventFirstDate, ...args) {
    eventFirstDate.setHours(8, 0, 0, 0);
    return date.getDay() === eventFirstDate.getDay();
  }
}
