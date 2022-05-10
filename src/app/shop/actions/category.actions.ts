import { Action } from '@ngrx/store';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

export enum CategoryActionTypes {
  Search = '[Category] Search',
  SearchComplete = '[Category] Search Complete',
  SearchError = '[Category] Search Error',
  Load = '[Category] Load',
  LoadComplete = '[Category] Load Complete',
  LoadError = '[Category] Load Error',
  Select = '[Category] Select',
  SelectProduct = '[Product] Select',
  CreateCategory = '[Category] Create',
  CreateCategoryComplete = '[Category] Create Complete',
  CreateCategoryError = '[Category] Create Error',
  CreateProduct = '[Product] Create',
  CreateProductComplete = '[Product] Create Complete',
  CreateProductError = '[Product] Create Error'
}

export class CreateCategory implements Action {
  readonly type = CategoryActionTypes.CreateCategory;
  constructor(public payload: Category) {}
}

export class CreateCategoryComplete implements Action {
  readonly type = CategoryActionTypes.CreateCategoryComplete;
  constructor(public payload: Category) {}
}

export class CreateCategoryError implements Action {
  readonly type = CategoryActionTypes.CreateCategoryError;
  constructor(public payload: any) {}
}

export class CreateProduct implements Action {
  readonly type = CategoryActionTypes.CreateProduct;
  constructor(public payload:{catId: number, product: Product}) {}
}

export class CreateProductComplete implements Action {
  readonly type = CategoryActionTypes.CreateProductComplete;
  constructor(public payload: {catId: number, product: Product}) {}
}

export class CreateProductError implements Action {
  readonly type = CategoryActionTypes.CreateProductError;
  constructor(public payload:any) {}
}

export class Search implements Action {
  readonly type = CategoryActionTypes.Search;
  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = CategoryActionTypes.SearchComplete;
  constructor(public payload: Category[]) {}
}

export class SearchError implements Action {
  readonly type = CategoryActionTypes.SearchError;
  constructor(public payload: any) {}
}

export class Load implements Action {
  readonly type = CategoryActionTypes.Load;
  constructor() {}
}

export class LoadComplete implements Action {
  readonly type = CategoryActionTypes.LoadComplete;
  constructor(public payload: Category[]) {}
}

export class LoadError implements Action {
  readonly type = CategoryActionTypes.LoadError;
  constructor(public payload: any) {}
}

export class Select implements Action {
  readonly type = CategoryActionTypes.Select;
  constructor(public payload: number) {}
}


export class SelectProduct implements Action {
  readonly type = CategoryActionTypes.SelectProduct;
  constructor(public payload: number) {}
}

export type CategoryActionsUnion =
  | Load
  | LoadComplete
  | LoadError
  | Select
  | SelectProduct
  | SearchComplete
  | SearchError
  | Search
  | CreateCategory
  | CreateCategoryComplete
  | CreateCategoryError
  | CreateProduct
  | CreateProductComplete
  | CreateProductError;

