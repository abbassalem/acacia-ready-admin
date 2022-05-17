import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_APP_NAME } from '@angular/fire/compat';


@Injectable({providedIn: 'root', useExisting: FIREBASE_APP_NAME, useValue: 'db'}
)
export class ConfigService {

  constructor(private db: AngularFirestore ){
     db.collection('/orders').get().subscribe(snap => {
      //  console.dir(snap.size);
      //  snap.forEach(doc => console.dir(doc.data()));
     }
    );
  }
  
}



