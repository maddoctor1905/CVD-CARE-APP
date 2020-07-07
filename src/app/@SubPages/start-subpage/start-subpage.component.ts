import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalNotificationService} from '../../@Services/local-notification.service';
import {ServiceWorkerService} from '../../@Services/service-worker.service';
import {StepperService} from '../../@Components/stepper/stepper.service';

@Component({
  selector: 'app-start-subpage',
  templateUrl: './start-subpage.component.html',
  styleUrls: ['./start-subpage.component.scss'],
})
export class StartSubpageComponent implements OnInit {
  @Input() cardMode = false;
  @Output() done = new EventEmitter<void>();
  @Input() title = '';
  private currentIndex = 0;

  constructor(
    private localNotificationService: LocalNotificationService,
    private serviceWorkerService: ServiceWorkerService,
    private stepperService: StepperService,
  ) {
  }

  private _taskName = '';

  get taskName(): string {
    return this._taskName;
  }

  set taskName(value: string) {
    this._taskName = value;
  }

  ngOnInit() {
    this.stepperService.nextDisabled = false;
  }


  isNotificationEnabled() {
    return (this.localNotificationService.hasPermission);
  }

  isWifiEnabled() {
    return (!this.serviceWorkerService.offline$.getValue());
  }

  isPeriodicBackgroundSyncEnabled() {
    return (this.serviceWorkerService.backgroundSyncReady$.getValue())
  }
}
