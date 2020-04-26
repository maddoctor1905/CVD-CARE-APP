importScripts('dexie.min.js');
importScripts('./sw/Patient.js');
importScripts('./sw/Notification.js');
importScripts('./sw/Medication.js');
importScripts('./sw/Investigation.js')

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
  // Register listeners
  self.addEventListener('message', function (event) {
    const data = event.data;

    if (data.command === 'medicationsSync') {
      medicationHandler.syncronizeFromMessage(data.message);
    } else if (data.command === 'patientSync') {
      patientHandler.syncFromMessage(data.message);
    } else if (data.command === 'investigationsSync') {
      investigationHandler.syncronizeFromMessage(data.message)
    }
  });

  self.addEventListener('periodicsync', (event) => {

    console.info("[PERIODIC SYNC] triggered");
    if (event.tag === 'content-sync') {
      const checks = [medicationHandler.periodicSync(self.registration),
        investigationHandler.periodicSync(self.registration)];
      event.waitUntil(Promise.all(checks));
    }
    // Other logic for different tags as needed.
  });
  self.addEventListener('sync', (event) => {
    console.info("synnnnnccccc");
    if (event.tag === 'content-sync') {
      // See the "Think before you sync" section for
      // checks you could perform before syncing.
      event.waitUntil(a());
    }
    // Other logic for different tags as needed.
  });
})();
