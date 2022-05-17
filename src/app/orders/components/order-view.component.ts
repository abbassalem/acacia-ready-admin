import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { Order } from '../../shop/models/order.model';

@Component({
  selector: 'app-order-view',
  template: `
<br>
  <mat-expansion-panel  (opened)="open(id)" (closed)="panelOpenState = false"  style="width: 100%">
      <mat-expansion-panel-header style="color:'blue'; font-size: 12px">
          <img mat-card-sm-image style="width:20px;height:20px" *ngIf="thumbnail" [src]="thumbnail"/>
          &nbsp;&nbsp;&nbsp;&nbsp;Order Date:<b>{{ orderDate | date: 'dd/MM/yyyy:HH:mm' }}</b>
          &nbsp;&nbsp;&nbsp;&nbsp;Amount: <b>{{ amount | currency : 'EUR':'symbol':'1.2-2'}} </b>
          &nbsp;&nbsp;&nbsp;&nbsp;Delivery Date: <b>{{ deliveryDate | date: 'dd/MM/yyyy'}} </b>
          &nbsp;&nbsp;&nbsp;&nbsp;Delivery Time: <b>{{ deliveryTime }}</b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Paid:&nbsp;<mat-checkbox width="20%" [checked]= "order.paid" [disabled]="true" color="accent" ></mat-checkbox>
          &nbsp;&nbsp;&nbsp;
          
          <!-- &nbsp;&nbsp; Customer Info:<b>{{ userId }}</b> &nbsp;&nbsp;   -->
          <button mat-mini-fab (click)="loadUser(userId)">
              <mat-icon>person</mat-icon>
          </button> 
          
          <!-- <span *ngIf="user$">
            Email: <b>{{(user$ | async)?.email}}</b> - Name: <b>{{(user$ | async)?.email}}</b> - 
            Phone: <b>{{(user$ | async)?.phoneNumber}}</b>
          </span> -->
    </mat-expansion-panel-header>
    <mat-action-row>
      <button mat-raised-button color="accent">
        <mat-icon>edit</mat-icon>Edit
      </button>
    </mat-action-row>

    <ng-template matExpansionPanelContent>

        <table mat-table [dataSource]="orderItems" class="mat-elevation-z8" style="min-width: 70%">

          <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Product Name </th>
              <td mat-cell *matCellDef="let element"> {{element.name}} </td>
          </ng-container>

          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef> Price </th>
            <td mat-cell *matCellDef="let element"> {{element.price | number : '1.0-0'}} </td>
        </ng-container>

        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef> Quantity</th>
          <td mat-cell *matCellDef="let element"> {{element.quantity}} </td>
        </ng-container>

        <ng-container matColumnDef="subTotal">
          <th mat-header-cell *matHeaderCellDef> Sub Total </th>
          <td mat-cell *matCellDef="let element"> {{element.subTotal | number : '1.2-2'}} </td>
        </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

        </table>
        <br>
        <span *ngIf="(user$ | async)">
            Email: <b>{{(user$ | async)?.email}}</b> - Name: <b>{{(user$ | async)?.email}}</b> - 
            Phone: <b>{{(user$ | async)?.phoneNumber}}</b>
          </span>
          <br>
    </ng-template>
</mat-expansion-panel>
  `,
  styles: [
    `
    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    mat-card-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    .mat-form-field {
      min-width: 300px;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px; 
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
    .mat-snack-bar-container {
      margin-top: 50px !important;
    }
  `,
  ],
})

export class OrderViewComponent implements OnChanges {

  @Input()
  order: Order;

  @Input()
  user$: Observable<User>;

  @Output() loadUserEvent: EventEmitter<string> = new EventEmitter();

  orderItems: Array<OrderItem> = [];

  panelOpenState = false;
  
  displayedColumns: string[] = ['name', 'price', 'quantity', 'subTotal'];

  constructor() {
    console.log('constructor order-view');
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('======>>>order-view ngOnChanges');
    console.table(changes);
  }

  get id() {
    return this.order.id;
  }

  get orderDate() {
    return this.order.orderDate;
  }

  get deliveryDate() {
    return this.order.deliveryDate;
  }

  get deliveryTime() {
    return this.order.deliveryTime;
  }

  get userId() {
    return this.order.userId;
  }

  get status() {
    return this.order.status;
  }

  get amount() {
    return this.order.amount;
  }

  get thumbnail() {
    let img;
    switch (this.status) {
      case 'OPEN': img = 'check.png';
        break;

      case 'DELIVERED': img = 'up.png';
        break;

      case 'CANCELLED': img = 'cancel.png';
        break;

      case 'CLOSED': img = 'cancel.png';
        break;

      case 'ARCHIVED': img = 'archived.png';
        break;
    }
    return 'assets/images/core/' + img;
  }


  loadItems() {
    let item: OrderItem;
    const inputItems = this.order.items;
    for (let i = 0; i < inputItems.length; i++) {
      item = {
        name: inputItems[i].product.name,
        price: inputItems[i].product.price,
        quantity: inputItems[i].quantity,
        subTotal: inputItems[i].product.price * inputItems[i].quantity
      };
      this.orderItems.push(item);
    }
  }

  open(id) {
    console.log('order Id: ' + id);
    this.loadItems();
    this.panelOpenState = true;
  }

  loadUser(userId){
      this.loadUserEvent.emit(userId);
  }
}


export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}
// <a [routerLink]="['/orders', id]">
// <mat-card>
//   <mat-card-title-group>
//     <p>
//       <span matBadge="{{status}}" matBadgeOverlap="true"></span>
//       <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
//     </p>
//     <mat-card-title>{{ orderDate | date: 'dd/MM/yyyy - hh:mm' }}</mat-card-title>
//   </mat-card-title-group>
//   <mat-card-footer align="end">
//     <p>Total Amount: <b>{{ amount | number : '1.2-2'}} </b></p>
//   </mat-card-footer>
// </mat-card>
// </a>
