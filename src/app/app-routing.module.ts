import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './@Layouts/auth-layout/auth-layout.component';
import {DefaultLayoutComponent} from './@Layouts/default-layout/default-layout.component';
import {AlreadyLoggedGuard} from './@Guards/already-logged.guard';
import {AuthGuard} from './@Guards/auth.guard';
import {FirstInstallGuard} from './@Guards/first-install.guard';
import {FirstInstallLayoutComponent} from './@Layouts/first-install-layout/first-install-layout.component';
import {AlreadyInstallGuard} from './@Guards/already-install.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/day'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AlreadyLoggedGuard, FirstInstallGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./@Pages/auth-page/auth-page.module').then(m => m.AuthPageModule)
      }
    ]
  },
  {
    path: 'first-install',
    component: FirstInstallLayoutComponent,
    canActivate: [AlreadyInstallGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./@Pages/first-install-page/first-install-page.module').then(m => m.FirstInstallPageModule)
      }
    ]
  },
  {
    path: 'app',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard, FirstInstallGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app/day'
      },
      {
        path: 'day',
        loadChildren: () => import('./@Pages/day-page/day-page.module').then(m => m.DayPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./@Pages/home-page/home-page.module').then(m => m.HomePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./@Pages/settings-page/settings-page.module').then(m => m.SettingsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
