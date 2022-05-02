import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import * as index from '../reducers/index';
import { Location } from '@angular/common';
import { OrderItem } from '../models/OrderItem.model';

@Component({
  selector: 'app-product-selected-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <mat-card *ngIf="product">
    <mat-card-actions align="center" *ngIf="!(isSelectedProductInBasket$ | async)">
          <mat-form-field>
              <input #qty [formControl]="quantityFormControl" type="number" [value]="0"
                    matInput placeholder="Quantity" min="1" max="100" required>
          </mat-form-field>
        &nbsp;
        <p class="price">£ <b>{{qty.value * product.price | number : '1.2-2'}}</b></p>
    </mat-card-actions>
  <mat-card-content>
        <app-product-detail
          [product]="product"
          [quantity]="quantity$ | async"
          [inBasket] = "isSelectedProductInBasket$ | async"
          [valid]= "valid$ | async"
          (add)="addToBasket($event)"
          (remove)="removeFromBasket($event)">
        </app-product-detail>
    </mat-card-content>
    <mat-card-footer>
    <p style="padding:5px;margin:5px">
           <button mat-raised-button  (click)="back()">
             Cancel <mat-icon>close</mat-icon>
           </button>
    </p>
  </mat-card-footer>
</mat-card>
  `,
  styles: [`
  :host {
    display: flex;
    justify-content: center;
    margin: 75px 0;
  }
  mat-card {
    max-width: 600px;
  }
  mat-card-title-group {
    margin-left: 0;
  }
  img {
    width: 60px;
    min-width: 60px;
    margin-left: 5px;
  }
  mat-card-content {
    margin: 15px 0 50px;
  }
  mat-card-actions {
    margin: 25px 0 0 !important;
  }¦
  mat-card-footer {
    padding: 0 25px 25px;
    position: relative;
  }`
  ]
})

export class ProductSelectedPageComponent implements OnInit {

  @Input() product: Product;
  quantity$: Observable<number>;
  quantityFormControl: FormControl;
  valid$: Observable<boolean>;
  selectedCategoryId$: Observable<number>;
  orderItems: OrderItem[];
  
  constructor(private store: Store<index.ShopState>, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.quantityFormControl = new FormControl(0, [Validators.required]);
    this.valid$ = this.quantityFormControl.valueChanges;
    this.selectedCategoryId$ = this.store.select(index.getSelectedCategoryId);

  }

  getQuantity(values) {
    let qty;
    if (values) {
      qty = values.find(item => item.id === this.product.id);
      if (qty) {
        return qty.quantity;
      } else {
        return 0;
      }
    }
  }

  back() {
    history.back();
  }
}
