import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCategoryActions from '../actions/category.actions';
import { Product } from '../models/product.model';
import * as fromCategoryReducer from '../reducers/categories.reducer';
import * as index from '../reducers/index';

@Component({
  selector: 'app-product-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    
    <mat-card *ngIf="product">
  <mat-card-content>
        <app-product-detail
          [product]="product"
          [valid]= "valid$ | async"
          (save)="save($event)"
          (remove)="remove($event)">
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
}`]
})

export class ProductViewPageComponent implements OnInit {

  product: Product;
  valid$: Observable<boolean>;

  constructor(private store: Store<fromCategoryReducer.CategoryState>, 
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const id = +params['productId'];
        this.store.dispatch(new fromCategoryActions.SelectProduct(id));
        this.store.pipe(select(index.getSelectedProduct)).subscribe(value => this.product = value);
      });
  }

  back(){
    this.location.back();
  }
  ngOnDestroy() {
  }

}