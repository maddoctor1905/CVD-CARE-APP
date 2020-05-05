import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {

  isSpinning$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setSpinning(b: boolean) {
    this.isSpinning$.next(b);
  }
}
