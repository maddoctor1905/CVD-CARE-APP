class MedicationHandler {
  constructor(dbHandler, patientHandler, notificationHandler) {
    this._db = dbHandler;
    this._patient = patientHandler;
    this._notification = notificationHandler;
  }

  async syncronizeFromMessage(message) {
    const dbEntries = await this.getAllFromDb();
    for (const item of message) {
      const itemExist = dbEntries.find((entrie) => {
        return entrie.id === item.id;
      });
      if (!itemExist) {
        await this._db.medications.put(item);
      }
    }
  }

  async getAllFromDb() {
    return this._db.medications.toArray();
  }

  async periodicSync(registration) {
    let medications = await this.getAllFromDb();
    const needNotifications = await this.isMedicationTomorrow(medications);
    if (needNotifications) {
      await this.sendNotification(medications, registration);
    }
  }

  async isMedicationTomorrow(medications) {
    const patient = (await this._patient.getPatient());
    if (!medications || !patient) {
      return false;
    }
    const firstRunDate = new Date(patient.installTime);
    const tomorrow = new Date();
    firstRunDate.setHours(8, 0, 0, 0);
    tomorrow.setHours(8, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.getDay() === firstRunDate.getDay();

  }

  async sendNotification(medications, registration) {
    let body = 'Tomorrow medications';
    for (const med of medications) {
      body += '\n ' + med.Medication.BrandName;
    }
    await this._notification.show('Medication', body, registration);
  }

}
