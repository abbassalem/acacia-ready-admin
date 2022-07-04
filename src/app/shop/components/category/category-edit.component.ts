import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DbService } from 'src/app/core/services/db.service';
import { Category } from '../../models/category.model';
import { CategoryState } from '../../reducers/categories.reducer';
import { CreateCategory} from './../../actions/category.actions'

@Component({
    selector: 'app-category-edit',
    templateUrl: 'category-edit.component.html'
  })
  
  export class CategoryEditComponent implements OnInit {
  
    categoryForm: UntypedFormGroup;
    nextCategoryId: number;

    constructor(private store: Store<CategoryState>, private dbService: DbService) {
    }
  
     ngOnInit() {
      this.categoryForm = new UntypedFormGroup({
        name: new UntypedFormControl('', [Validators.required]),
        description: new UntypedFormControl('', [Validators.required]),
      });
      this.dbService.getNextCategoryId();
      this.dbService.nextCategoryId$.subscribe(newId => this.nextCategoryId= newId) ;
    }

    save() {
      if(this.categoryForm.valid){
        const newCat: Category = Object.assign(this.categoryForm.value,
          {id: this.nextCategoryId});
     
        this.store.dispatch(
          new CreateCategory(newCat));
      }
    }

  }