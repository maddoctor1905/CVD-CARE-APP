class PatientHandler {
  constructor(db) {
    this._db = db;
  }

  async syncFromMessage(message) {
    const patient = await this.getPatient();
    if (!patient) {
      await this._db.patient.put(message);
    }
  }

  async getPatient() {
    return (await this._db.patient.toArray())[0];
  }
}
