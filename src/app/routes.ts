import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/containers/login-page.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { HomePageComponent } from './core/containers/home-page.component';
import { NotFoundPageComponent } from './core/containers/not-found-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then ( module => module.ShopModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( module => module.OrdersModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./account/account.module').then( module => module.AccountModule)
  // },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule)
  // },
  {
    path: '**',
    component: NotFoundPageComponent
  },
];
