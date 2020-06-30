import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  get nextDisabled(): boolean {
    return this._nextDisabled;
  }

  set nextDisabled(value: boolean) {
    this._nextDisabled = value;
  }
  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value - 1;
  }

  private _currentIndex = 0;
  private _limit = 5;
  private _nextDisabled = false;

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(value: number) {
    this._currentIndex = value;
  }

  constructor() {
  }

  isEnd() {
    return (this.currentIndex === this.limit);
  }

  isStart() {
    return (this.currentIndex === 0);
  }

  next() {
    if (this.currentIndex + 1 > this.limit) {
      return;
    }
    this.currentIndex++;
  }

  previous() {
    if (this.currentIndex - 1 < 0) {
      return;
    }
    this.currentIndex--;
  }
}
