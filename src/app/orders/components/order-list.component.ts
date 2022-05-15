import { Component, Input } from '@angular/core';
import { Order } from '../../shop/models/order.model';

@Component({
  selector: 'app-order-list',
  template: `

  <mat-accordion  style="width: 100%;">
    <app-order-view  *ngFor="let orderElement of orders" [order]="orderElement"> </app-order-view>
  </mat-accordion>
  
`,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ]
})

export class OrderListComponent {

  @Input() orders: Order[];

  constructor() {
  }


  // filterDate(order: Order, start: Date, end: Date) {
  //     const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  //     const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  //     const dd = new Date(order.orderDate);
  //     const d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
  //     if ( d >= s && d <= e ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  // }
}