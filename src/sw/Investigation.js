const InvestigationFrequency = {
  'Monthly': 'Monthly',
  'Weekly': 'Weekly',
  'Daily': 'Daily',
  'Forynightly': 'Forynightly',
  '2 Months': '2 Months',
  '3 Months': '3 Months',
  '6 Months': '6 Months',
  'Yearly': 'Yearly'
}

class InvestigationHandler {
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
        await this._db.investigations.put(item);
      }
    }
  }

  async periodicSync(registration) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(8, 0, 0, 0);
    const investigations = await this.getAllFromDb();
    for (const item of investigations) {
      const frequencyDecision = this._frequency.find((decisionItem) => {
        return decisionItem.matcher === item.Frequency;
      });
      if (frequencyDecision && frequencyDecision.decision(date, item, frequencyDecision.args)) {
        this.sendNotification(item, registration);
      }
    }
  }

  sendNotification(investigation, registration) {
    const body = 'You have an investigation tomorrow\n ' + investigation.Investigation.InvMName;
    this._notification.show('Investigation', body, registration);
  }

  async getAllFromDb() {
    return this._db.investigations.toArray();
  }

  yearlyDecision(date, investigation) {
    const eventFirstDate = new Date(investigation.STDate);
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setFullYear(date.getFullYear());
    return date.getDate() === eventFirstDate.getDate() && date.getMonth() === eventFirstDate.getMonth();
  }

  NbMonthsDecision(date, investigation, ...args) {
    const eventFirstDate = new Date(investigation.STDate);
    eventFirstDate.setHours(8, 0, 0, 0);
    eventFirstDate.setMonth(date.getMonth());
    return ((date.getMonth() + eventFirstDate.getMonth()) % args[0] === 0) &&
      date.getDate() === eventFirstDate.getDate();
  }

  weeklyDecision(date, investigation, ...args) {
    const eventFirstDate = new Date(investigation.STDate);
    eventFirstDate.setHours(8, 0, 0, 0);
    return date.getDay() === eventFirstDate.getDay();
  }

}
