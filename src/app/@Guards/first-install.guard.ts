import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstInstallGuard implements CanActivate {
  constructor(
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const firstInstallItem = localStorage.getItem('firstInstall');
    if (!firstInstallItem) {
      this.router.navigateByUrl('/first-install');
    }
    return !!firstInstallItem;
  }

}
