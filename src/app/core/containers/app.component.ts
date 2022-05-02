import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../auth/actions/auth.actions';
import * as fromRoot from '../../reducers';
import { User } from '../../auth/models/user';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<app-toolbar>
<button mat-button [matMenuTriggerFor]="menu">Menu<mat-icon>menu</mat-icon></button>
    <mat-menu #menu="matMenu">
 
      <button mat-menu-item routerLink="/shop/products">
            <mat-icon>list</mat-icon>
            Browse Products
      </button>
          
      <button mat-menu-item routerLink="/shop/categories/0">
          <mat-icon>shopping_cart</mat-icon>
          Categories
      </button>

      <button mat-menu-item routerLink="/shop/products">
          <mat-icon>shopping_cart</mat-icon>
          Products
      </button>
        
      <button mat-menu-item  routerLink="/orders" >
          <mat-icon>perm_media</mat-icon>
          Orders
      </button>
      
      <button mat-menu-item  routerLink="/account" >
        <mat-icon>all_out</mat-icon>
        Account
      </button>
    
      <button mat-menu-item  routerLink="/auth" >
        <mat-icon>account_circle</mat-icon>
        Sign In
      </button>
    
      <button mat-menu-item  *ngIf="loggedIn$ | async" (click)="logout()" >
        <mat-icon>phonelink_off</mat-icon>
        Sign Out
      </button>
</mat-menu>

         <div style="flex: 1 1 auto;flex-direction: row">
         <span class="login" *ngIf="loggedIn$ | async">
              <span style="padding-right: 10px;color:white">LoggedIn as: </span> <b>{{(user$ | async)?.displayName}}</b>
          </span>
        </div>
</app-toolbar>

<router-outlet></router-outlet>
  `,
  styles: [`.login {
    font-size: 12px;
    color: yellow;
    float: right;
    padding-right:20px;
  }`]
})


export class AppComponent {
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedIn$ = this.store.pipe(select(fromRoot.isLoggedIn));
    this.user$ = store.pipe(select(fromRoot.getUser));
  }


  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
