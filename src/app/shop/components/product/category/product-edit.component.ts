import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DbService } from 'src/app/core/services/db.service';
import { Product } from 'src/app/shop/models/product.model';
import { CategoryState } from '../../../reducers/categories.reducer';
import { CreateProduct } from './../../../actions/category.actions'

@Component({
  selector: 'app-edit-product',
  templateUrl: 'product-edit.component.html'
})

export class ProductyEditComponent implements OnInit, OnChanges {

  productForm: FormGroup;
  nextProductId: number;
  isVisible: boolean = false;

  @Input()
  categoryId: number;

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private store: Store<CategoryState>, private dbService: DbService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dbService.getNextProductId(this.categoryId);
    this.dbService.nextProductId$.subscribe(newId => {
      this.nextProductId = newId;
      console.log('inside ngchanges nextproductId = ' + this.nextProductId);
    });
  }

  ngOnInit() {
    console.log('categoryId = ' + this.categoryId);
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      reference: new FormControl('', []),
      image: new FormControl('', []),
    });
    this.dbService.getNextProductId(this.categoryId);
    this.dbService.nextProductId$.subscribe(newId => {
      this.nextProductId = newId
      console.log('nextproductId = ' + this.nextProductId);
    });
  }

  save() {
    console.log('catid: ' + this.categoryId);
    if (this.productForm.valid) {
      const newProd: Product = Object.assign(this.productForm.value,
        { id: this.nextProductId });

      console.log('new product');
      console.dir(newProd);
      console.log('catId');
      console.log(this.categoryId);
      this.store.dispatch(
        new CreateProduct({ catId: this.categoryId, product: newProd }));

      this.close.emit(false);
    }
  }

  // showForm() {
  //   this.isVisible = true;
  // }

  cancelForm() {
    this.close.emit(false);
  }
}