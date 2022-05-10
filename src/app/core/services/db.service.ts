import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_APP_NAME } from '@angular/fire/compat';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root',
    useExisting: FIREBASE_APP_NAME, useValue: 'db'
})

export class DbService {

    nextProductId$: Subject<number> = new Subject<number>();
    nextCategoryId$: Subject<number> = new Subject<number>();

    constructor(private db: AngularFirestore) {
    }

    getNextProductId(catId: number) {
        console.log('DbService generateProductId');
        let ref = this.db.collection('categories', ref => ref.where('id', '==', catId))
        .get().subscribe(query => {
            const products  = query.docs[0].get('products');
            console.log('products; ' + length);
            console.dir(products);
            this.nextProductId$.next(products.length+1);
            });
    }

    getNextCategoryId() {
        let nextCategoryId: number = 0;
        console.log('DbService generateCategoryId');
        this.db.collection('/categories').get().subscribe(query => {
            query.forEach(doc => {
                const id = parseInt(doc.id);
                if (id > nextCategoryId) {
                    nextCategoryId = id;
                }
            });
            this.nextCategoryId$.next(nextCategoryId+1);
        });

    }

}



