class MessageHandler {

  constructor(self, medicationHandler, patientHandler, investigationHandler, db) {
    this._self = self;
    this._medicationHandler = medicationHandler;
    this._patientHandler = patientHandler;
    this._investigationHandler = investigationHandler;
    this._db = db;
  }

  registerListeners() {
    this.registerMessageListeners();
    this.registerPeriodicSync();
  }

  registerMessageListeners() {
    this._self.addEventListener('message', (event) => {
      const data = event.data;
      if (data.command === 'medicationsSync') {
        this._medicationHandler.syncronizeFromMessage(data.message);
      } else if (data.command === 'patientSync') {
        this._patientHandler.syncFromMessage(data.message);
      } else if (data.command === 'investigationsSync') {
        this._investigationHandler.syncronizeFromMessage(data.message)
      } else if (data.command === 'clear') {
        this.clear();
      }
    });
  }

  registerPeriodicSync() {
    this._self.addEventListener('periodicsync', (event) => {
      console.info("[PERIODIC SYNC] triggered");
      if (event.tag === 'content-sync') {
        const checks = [this._medicationHandler.periodicSync(this._self.registration),
          this._investigationHandler.periodicSync(this._self.registration)];
        event.waitUntil(Promise.all(checks));
      }
    });
  }

  registerBackgroundSync() {
    this._self.addEventListener('sync', (event) => {
      console.info("synnnnnccccc");
      if (event.tag === 'content-sync') {
        event.waitUntil('');
      }
    });
  }

  async clear() {
    this._db.delete();
    const names = await caches.keys();
    for (let name of names) {
      console.log(name);
      await caches.delete(name);
    }
    this.respondToClients('ok');
  }

  respondToClients(data) {
    this._self.clients.matchAll().then(all => all.map(client => client.postMessage(data)));
  }
}
