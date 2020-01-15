import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value - 1;
  }

  private _currentIndex = 0;
  private _limit = 4;

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
