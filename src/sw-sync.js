importScripts('dexie.min.js');
importScripts('./sw/Patient.js');
importScripts('./sw/Notification.js');
importScripts('./sw/Medication.js');
importScripts('./sw/Investigation.js')
importScripts('./sw/Message.js')
importScripts('./sw/Recruitment.js')

function initDb() {
  const db = new Dexie("cvd");

  db.version(20).stores({
    medications: "id",
    investigations: "id",
    patient: "patient",
    recruitments: "id",
  });

  db.open();
  return db;
}

(async function () {
  // Register db
  const db = initDb();
  console.log('bite');
  // Register Handlers
  const patientHandler = new PatientHandler(db);
  const notificationHandler = new NotificationHandler();
  const medicationHandler = new MedicationHandler(db, patientHandler, notificationHandler);
  const investigationHandler = new InvestigationHandler(db, patientHandler, notificationHandler);
  const recruitmentHandler = new RecruitmentHandler(db, patientHandler, notificationHandler);
  const messageHandler = new MessageHandler(self, medicationHandler, patientHandler, investigationHandler, recruitmentHandler, db);

  messageHandler.registerListeners();
})();
