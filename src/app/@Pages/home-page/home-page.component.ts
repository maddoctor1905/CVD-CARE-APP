import {Component, OnInit} from '@angular/core';
import {LocalNotificationService} from '../../@Services/local-notification.service';
import {NotificationElement} from '../../@Models/notification.model';
import {faGlobeAsia} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from '@ngx-translate/core';

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
  changeLangIcon = faGlobeAsia;

  constructor(
    private localNotificationService: LocalNotificationService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
  }

  launchNotification() {
    this.localNotificationService.send('💊 Did you take your treatment today ?', this.notificationElement);
  }

  resetApplication() {
    if (confirm('Are you really sure ?')) {
      localStorage.clear();
      window.location.reload();
    }
  }

  selectChange(selectRef: HTMLSelectElement) {
    this.translateService.use(selectRef.value);
    this.translateService.setDefaultLang(selectRef.value);
    localStorage.setItem('favoriteLang', selectRef.value);
  }
}
