import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlreadyInstallGuard implements CanActivate {
  constructor(
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const canActivate = !localStorage.getItem('firstInstall');
    if (!canActivate) {
      this.router.navigateByUrl('/app/day');
    }
    return canActivate;
  }

}
