async function a() {
  return 'Hello';
}

(async function () {
  const status = await navigator.permissions.query({
    name: 'periodic-background-sync',
  });
  console.log(status, 'bite');
  if (status.state === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    if ('periodicSync' in registration) {
      try {
        await registration.periodicSync.register('content-sync', {
          // An interval of one day.
          minInterval: 24 * 60 * 60 * 1000,
        });
      } catch (error) {
        // Periodic background sync cannot be used.
      }
    }
  } else {

  }
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'content-sync') {
      // See the "Think before you sync" section for
      // checks you could perform before syncing.
      event.waitUntil(a());
    }
    // Other logic for different tags as needed.
  });
})();
