import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StepperService} from './stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  get stepperService(): StepperService {
    return this._stepperService;
  }

  set stepperService(value: StepperService) {
    this._stepperService = value;
  }

  @Input() buttonsVisible = true;

  @Output() nextClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();
  @Output() confirmClicked = new EventEmitter();

  constructor(
    private _stepperService: StepperService
  ) {
  }

  ngOnInit() {
  }


  nextButtonClicked() {
    this.nextClicked.emit();
  }

  previousButtonClicked() {
    this.previousClicked.emit();
  }

  confirmButtonClicked() {
    this.confirmClicked.emit();
  }
}
