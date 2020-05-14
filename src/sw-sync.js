importScripts('dexie.min.js');
importScripts('./sw/Patient.js');
importScripts('./sw/Notification.js');
importScripts('./sw/Medication.js');
importScripts('./sw/Investigation.js')
importScripts('./sw/Message.js')

function initDb() {
  const db = new Dexie("cvd");

  db.version(20).stores({
    medications: "id",
    investigations: "id",
    patient: "patient",
  });

  db.open();
  return db;
}

(async function () {
  // Register db
  const db = initDb();

  // Register Handlers
  const patientHandler = new PatientHandler(db);
  const notificationHandler = new NotificationHandler();
  const medicationHandler = new MedicationHandler(db, patientHandler, notificationHandler);
  const investigationHandler = new InvestigationHandler(db, patientHandler, notificationHandler);
  const messageHandler = new MessageHandler(self, medicationHandler, patientHandler, investigationHandler, db);

  messageHandler.registerListeners();
})();
