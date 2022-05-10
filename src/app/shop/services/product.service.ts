import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { FIREBASE_APP_NAME } from '@angular/fire/compat';
import { Product } from '../models/product.model';
import { arrayUnion } from 'firebase/firestore';


@Injectable({providedIn: 'any', useExisting: FIREBASE_APP_NAME, useValue: 'db'}
)

export class ProductService {
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;

  constructor(private db: AngularFirestore) {
  }

  getCategories(): Observable<Array<Category>> {

    let cats: Array<Category> = new Array();
    return this.db.collection('categories').snapshotChanges().pipe(
      map( snapshot => {
        cats = snapshot.map(action => action.payload.doc.data() as Category);
        return cats;
      })
    )
  }

  createCategory(cat: Category): Observable<any> {

    let p: Promise<void> = this.db.collection('categories')
      .doc(cat.id.toString()).set({id: cat.id, name: cat.name, description: cat.description});
    return of(p);  
  } 

  createProduct(catId: number, product: Product): Observable<any> {

    console.log('catId: ' + catId);
    console.dir(product);
    const p = this.db.collection('categories')
    .doc(catId.toString())
      .update({products: arrayUnion(product)});
    
      return of({catId: catId, product: product });
    
    }

}


// return this.db.collection('categories')
//     .doc(catId.toString()).collection('products').doc(product.id.toString())
//       .set({... product, id: product.id });