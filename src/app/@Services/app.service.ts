import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
  }

  reset() {
    // This function remove every type of data
    localStorage.clear();
    window.location.reload();
  }

  logout() {
    // This function doesn't remove the cached data (like blood pressure)
    localStorage.clear();
    window.location.reload();
  }
}
