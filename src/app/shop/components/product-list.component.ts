import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import * as fromCategoryActions from './../actions/category.actions';
import * as fromCategories from './../reducers/categories.reducer';

@Component({
  selector: 'app-list-product',
  template: `
  <mat-toolbar>
  <span class="toolbar-flex">
      <nav mat-tab-nav-bar [backgroundColor]="'secondary'">
        <a mat-tab-link 
            *ngFor="let routeLink of routeLinks; let i=index"
              [routerLink]="routeLink.path"
              routerLinkActive #rla="routerLinkActive"
              [active]="rla.isActive">
              <b style="color: blue">{{routeLink.label}} &nbsp; &nbsp;</b>
              
              <button *ngIf="rla.isActive" style="color:green; font-weight: bold"  
                [color]="'secondary'"  mat-button
                (click)="editFormVisible =true">
                <mat-icon matBadge="+" matBadgePosition="above before" matBadgeColor="green"  
                style="color:green" >list</mat-icon>
              </button>   
        </a>

      </nav>
    </span>
</mat-toolbar>
<div style="display:flex; flex-wrap: wrap; align-content: flex-start;" *ngIf= "!editFormVisible">
<app-product-view  *ngFor="let product of products" [product]="product">
</app-product-view>
</div>

<app-edit-product *ngIf= "editFormVisible" [categoryId]="selectedCategoryId" 
    (close)="hideForm($event)" >
</app-edit-product>

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
  ],
})

export class ProductListComponent implements OnInit, OnChanges {

  @Input() categories: Category[];
  @Input() routeLinks: Array<{ catId: number, label: string, path: string }>;
  products: Product[];
  currentTabIndex = 0;
  selectedCategoryId: number;
  editFormVisible: boolean = false;

  constructor(private store: Store<fromCategories.CategoryState>, private route: ActivatedRoute) {
  }

   ngOnInit() {
   this.route.params.subscribe(params => {
      this.editFormVisible = false;
      this.currentTabIndex = +params['id'];
      if (this.routeLinks[this.currentTabIndex]) {
        this.store.dispatch(new fromCategoryActions.Select(this.routeLinks[this.currentTabIndex].catId));
      }
      if (this.categories[this.currentTabIndex]) {
        this.products = this.categories[this.currentTabIndex].products;
      }
    });
    console.log('category current iindex');
    console.dir(this.routeLinks[this.currentTabIndex].catId);
    this.selectedCategoryId = this.routeLinks[this.currentTabIndex].catId;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.categories[this.currentTabIndex]) {
      this.products = this.categories[this.currentTabIndex].products;
      this.store.dispatch(new fromCategoryActions.Select(this.categories[this.currentTabIndex].id));
      this.selectedCategoryId = this.routeLinks[this.currentTabIndex].catId;
    }
  }

  hideForm(event){
    this.editFormVisible = false;
  }

  showForm(){
     this.editFormVisible = true;
  }

  
}
