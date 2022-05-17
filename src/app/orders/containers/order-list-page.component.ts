import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderSearchCriteria, Order } from '../../shop/models/order.model';
import * as fromAuthReducer from '../../../app/auth/reducers/auth.reducer';
import * as fromOrderReducer from '../reducers/orders.reducer';
import { Load, Reset } from '../actions/orders.actions';
import { filter, map } from 'rxjs/operators';
import * as fromAuthActions from '../../auth/actions/auth.actions'
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-order-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-order-search [fetchedUsers$]="fetchedUsers$" (searchCriteriaChange)= "executeQuery($event)" 
    (usersForAutoChange)="fetchUsersForAuto($event)" >
  </app-order-search>
    <br>
    <app-order-list (searching)="executeQuery($event)" [orders]="orders$ | async">
  </app-order-list>
  `,
  styles: [
    ` .mat-tab-label-active {
      background-color: #5EADB0;
      color: #D5FEFF;
      border: 1px solid #6B7F7F;
      font-weight: bold;
  }`]
})

export class OrderListPageComponent implements OnInit {

  orders$: Observable<Order[]>;
  selectedOrderId$: Observable<string>;
  fetchedUsers$: Observable<Array<User>>;

  constructor(private authStore: Store<fromAuthReducer.State>, 
              private orderStore: Store<fromOrderReducer.OrderState>) {
  }

  
  ngOnInit(): void {  
  }
  
  fetchUsersForAuto(email: string) {
      this.authStore.dispatch(new fromAuthActions.FetchedUsers(email));
      this.fetchedUsers$ = this.authStore.select(fromAuthReducer.getFetchedUsers);
  }

  executeQuery(orderSearchCriteria: OrderSearchCriteria) {
    let payload = {orderSearchCriteria: orderSearchCriteria};
    this.orderStore.dispatch(new Reset);
    this.orderStore.dispatch(new Load(payload));
    this.orders$ =  this.orderStore.pipe(
      select(fromOrderReducer.getOrders),
      filter(value => value.length > 0),
      map( orders => {
          return orders;
      })
    );

  }
}
