import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from './services/product.service';
import { MaterialModule } from '../material';
import { ProductListComponent } from './components/product-list.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { ProductViewComponent } from './components/product-view.component';
import { ProductListPageComponent } from './containers/product-list-page.component';
import { ProductViewPageComponent } from './containers/product-view-page.component';
import { ProductEffects } from './effects/product.effects';
import { reducers } from './reducers';
import { CategoryEditComponent } from './components/category/category-edit.component';
import { ProductyEditComponent } from './components/product/category/product-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'categories/0', pathMatch: 'full'},
      { path: 'categories/0', component: ProductListPageComponent},
      { path: 'categories/:id', component: ProductListPageComponent},
      { path: 'products/:productId', component: ProductViewPageComponent},
      { path: 'category/new', component: CategoryEditComponent},
      { path: 'product/new', component: ProductyEditComponent},
    ]),

    StoreModule.forFeature('shop', reducers),
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [
    // ProductSelectedPageComponent,
    ProductViewPageComponent,
    ProductListPageComponent,
    ProductListComponent,
    ProductViewComponent,
    ProductDetailComponent,
    // ProductSearchComponent,
    CategoryEditComponent,
    ProductyEditComponent
  ],
  providers: [ProductService]
})

export class ShopModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: ShopModule,
      providers: []
    };
  }
}