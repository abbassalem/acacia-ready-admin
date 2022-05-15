import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Order } from '../../shop/models/order.model';
import { OrderService } from '../services/orders.service';
import * as fromOrderActions from '../../orders/actions/orders.actions';
import * as fromOrderReducer from '../../orders/reducers/orders.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class OrdersEffects {

  constructor(private actions$: Actions, 
        private orderService: OrderService, 
        private snackBar: MatSnackBar,
        private orderStore: Store<fromOrderReducer.OrderState>, 
        private router: Router) {
  }
  
  
  saveOrder$ = createEffect( () => {
    return this.actions$.pipe(
          ofType<fromOrderActions.SaveOrder>(fromOrderActions.OrderActionTypes.SaveOrder),
          switchMap( (action: fromOrderActions.SaveOrder) => 
            this.orderService.saveOrder(action.payload)
          ),
          map( (order) => {
              return new fromOrderActions.SaveOrderComplete(<Order>order);
            }),
          catchError (error => of(error))
          )
  }, {dispatch: true}
  );

  saveOrderSuccess$ =  createEffect( () => {
    return this.actions$.pipe(
        ofType<fromOrderActions.SaveOrderComplete>(fromOrderActions.OrderActionTypes.SaveOrderComplete),
        switchMap( (action) => {
            this.snackBar.open('Order saved successfully.', 'Close',{
            duration: 4000,
            panelClass: ["snack-notification"],
            horizontalPosition: "center",
            verticalPosition: "top"
            });

            this.orderStore.dispatch(new fromOrderActions.Reset());
            return this.router.navigate(['/']);
        })          
      )
    }, { dispatch: false });
  

  getAllOrders$ = createEffect( () => {
    let resOrders: any;
    return this.actions$.pipe(
      ofType<fromOrderActions.Load>(fromOrderActions.OrderActionTypes.Load),
      switchMap( action => {
        let res: Order[];
        return this.orderService.getOrders(action.payload.orderSearchCriteria)
        .pipe(
          map( q => {
              resOrders =  q.docs.map( 
                doc => {
                  return doc.data();
                })
                return new fromOrderActions.LoadComplete(resOrders);
            }),
          catchError(err => of(new fromOrderActions.LoadError('error in loading orders'))
          )
        )
      })
    )
  });


}
