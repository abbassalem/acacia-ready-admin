import { Component, Input } from '@angular/core';
import { Order } from '../../shop/models/order.model';

@Component({
  selector: 'app-order-list',
  template: `
        <mat-accordion style="min-width: 100%;">
          <app-order-view-page  
            *ngFor="let singleOrder of orders" [orderForPage]="singleOrder" > </app-order-view-page>
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

}