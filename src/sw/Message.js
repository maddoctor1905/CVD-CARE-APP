class MessageHandler {

  constructor(self, medicationHandler, patientHandler, investigationHandler, recruitmentHandler, db) {
    this._self = self;
    this._medicationHandler = medicationHandler;
    this._patientHandler = patientHandler;
    this._investigationHandler = investigationHandler;
    this._recruitmentHandler = recruitmentHandler;
    this._db = db;
  }

  registerListeners() {
    this.registerMessageListeners();
    this.registerPeriodicSync();
  }

  registerMessageListeners() {
    this._self.addEventListener('message', (event) => {
      const data = event.data;
      console.info(`[SW] Command received ${data.command}`);
      if (data.command === 'medicationsSync') {
        this._medicationHandler.syncronizeFromMessage(data.message);
      } else if (data.command === 'patientSync') {
        this._patientHandler.syncFromMessage(data.message);
      } else if (data.command === 'investigationsSync') {
        this._investigationHandler.syncronizeFromMessage(data.message)
      } else if (data.command === 'clear') {
        this.clear();
      } else if (data.command === 'recruitmentsSync') {
        this._recruitmentHandler.syncronizeFromMessage(data.message);
      }
    });
  }

  registerPeriodicSync() {
    this._self.addEventListener('periodicsync', (event) => {
      console.info("[PERIODIC SYNC] triggered for " + event.tag);
      if (event.tag === 'medication-sync') {
        event.waitUntil(this._medicationHandler.periodicSync(this._self.registration));
      }
      if (event.tag === 'investigation-sync') {
        event.waitUntil(this._investigationHandler.periodicSync(this._self.registration));
      }
      if (event.tag === 'recruitment-sync') {
        event.waitUntil(this._recruitmentHandler.periodicSync(this._self.registration));
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
