import { inject, Inject, Injectable, InjectionToken, ModuleWithProviders, NgZone, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFirestore, AngularFirestoreModule, PERSISTENCE_SETTINGS } from '@angular/fire/compat/firestore';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire/compat';


@Injectable({providedIn: 'root', useExisting: FIREBASE_APP_NAME, useValue: 'db'}
)
export class ConfigService {

  constructor(private db: AngularFirestore ){
     console.log('configService');
     db.collection('/orders').get().subscribe(snap => {
       console.dir(snap.size);
      //  snap.forEach(doc => console.dir(doc.data()));
     }
    );
  }
  
}



