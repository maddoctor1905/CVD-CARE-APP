class NotificationHandler {
  constructor() {
    this.notificationElement = {
      body: '',
      icon: 'assets/icons/doctor.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore', title: 'Yes',
          icon: 'assets/icons/like.png'
        },
        {
          action: 'close', title: 'No',
          icon: 'assets/icons/dislike.png'
        },
      ]
    };
  }

  async show(title, body, registration) {
    await registration.showNotification(title, {
      ...this.notificationElement, body: body
    });
  }
}
