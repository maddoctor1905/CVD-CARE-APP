import {Component, OnInit} from '@angular/core';
import {LocalNotificationService} from '../../@Services/local-notification.service';
import {NotificationElement} from '../../@Models/notification.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public notificationElement: NotificationElement = {
    body: 'Today Treatment \n1 Painkill\n2 Painkillers',
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

  constructor(
    private localNotificationService: LocalNotificationService
  ) {
  }

  ngOnInit() {
  }

  launchNotification() {
    this.localNotificationService.send('💊 Did you take your treatment today ?', this.notificationElement);
  }
}
