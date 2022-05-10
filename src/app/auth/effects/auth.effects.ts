import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import * as fromAuthActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { Reset } from '../../orders/actions/orders.actions';
import { OrderState } from '../../orders/reducers/orders.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private orderStore: Store<OrderState>,
  ) {}


  login$ = createEffect( () => {
    return this.actions$.pipe(
      ofType<fromAuthActions.Login>(fromAuthActions.AuthActionTypes.Login),
        switchMap( action => this.authService.SignIn(action.payload.email, action.payload.password)
          .then(
            user => {
                return new fromAuthActions.LoginComplete(user);
              }
          )
          .catch(
              error => new fromAuthActions.LoginError(error)
          )
        )
    )
  }, {dispatch: true});

  loginSuccess$ = createEffect ( () => {
    return this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.LoginComplete),
      tap(() => {
        this.router.navigate(['home']);
      })
  )}, {dispatch: false}
  );

  loginRedirect$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.LoginRedirect, fromAuthActions.AuthActionTypes.Logout),
      tap(authed => {
        this.orderStore.dispatch(new Reset());
        this.router.navigate(['/login']);
      })
    )}, {dispatch: false}
  );

}
