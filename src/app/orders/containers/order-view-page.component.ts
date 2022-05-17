import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Order } from '../../shop/models/order.model';
import * as fromAuthReducer from '../../../app/auth/reducers/auth.reducer';
import * as fromOrderReducer from '../reducers/orders.reducer';
import * as fromAuthActions from '../../auth/actions/auth.actions'
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-order-view-page',
  template: ` 
        <app-order-view (loadUserEvent)="handleLoadUser($event)" [user$]="orderUser$"  [order]="orderForPage" >
        </app-order-view>
          `,
  styles: [``]
})

export class OrderViewPageComponent {

  constructor(private authStore: Store<fromAuthReducer.State>, 
    private orderStore: Store<fromOrderReducer.OrderState>) {
     
  }

  @Input()
  orderForPage: Order;

  @Input()
  orderUser$: Observable<User> = of(null);
  

  handleLoadUser(userId){  
      console.log('order-view-page handLoadUser');
      this.authStore.dispatch(new fromAuthActions.LoadOrderUser(userId));
      this.orderUser$ = this.authStore.select(fromAuthReducer.getOrderdUser); 
    
  }

}
