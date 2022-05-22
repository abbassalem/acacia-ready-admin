import { Injectable } from '@angular/core';
import { Order, OrderSearchCriteria} from '../../shop/models/order.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentData , QuerySnapshot } 
        from '@angular/fire/compat/firestore';
import { map, merge, Observable, of } from 'rxjs';

@Injectable()
export class OrderService {

    constructor(private db: AngularFirestore) {}
  
    async saveOrder(order: Order): Promise<Order> {
      let saved: Order;  
      let docRef = await this.db.collection('orders').add(order);
      let docData = <Order> await (await docRef.get()).data();
      saved = Object.assign({id: docRef.id}, docData);
      this.db.collection('orders').doc(docRef.id).set({id: docRef.id}, {merge:true});
      return saved;  
    }


    changePaidOrder(field: string, value: any, ids: string[]): Observable<string[]> {
       ids.forEach ( id => {
        this.db.collection('orders').doc(id).update({[field]: value}); 
      });
      return of(ids);
    }

    changeStatusOrder(field: string, value: any, ids: string[]):  Observable<{status: string, ids:string[]}>{
      ids.forEach ( id => {
        this.db.collection('orders').doc(id).update({[field]: value}); 
      });
      return of({'status': value, 'ids': ids});
    }

   // TODO: use duration to filter 
getOrders(orderSearchCriteria: OrderSearchCriteria): Observable<Order[]>{
    console.log('service => order search criteria');
    console.dir(orderSearchCriteria);
    let afsCollection: AngularFirestoreCollection;
    if(orderSearchCriteria.userId){
       if(orderSearchCriteria.status == 'ALL'){
          afsCollection =  this.db.collection('orders', 
            ref => ref.where('userId', '==', orderSearchCriteria.userId));
       } else {
        afsCollection =  this.db.collection('orders', 
            ref => ref.where('userId', '==', orderSearchCriteria.userId)
                      .where('status', '==', orderSearchCriteria.status));
       } 
    } else {
        if(orderSearchCriteria.status == 'ALL'){
          afsCollection =  this.db.collection('orders');
        } else {
          afsCollection =  this.db.collection('orders', 
            ref => ref.where('status', '==', orderSearchCriteria.status));
        } 
    }
    return afsCollection.get().pipe( 
      map( q => {
        let orders: Order[];
        orders = q.docs.map( doc =>  <Order>doc.data());
        return orders;
      }));
  }

  filterDate(order: Order, start: Date, end: Date) {
      const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      const dd = new Date(order.orderDate);
      const d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
      if ( d >= s && d <= e ) {
        return true;
      } else {
        return false;
      }
  }

  transforDate (date: Date): Date{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}



      //  } else {
      //   return this.db.collection('orders', 
      //       ref => ref.where('userId', '==', orderSearchCriteria.userId)
      //               // .where('orderDate', '>=', inputDurationWithStatus.start)
      //               // .where('orderDate', '<=', inputDurationWithStatus.end)
      //               .where('status', '==', orderSearchCriteria.status)
      //               // .orderBy( "orderDate", "desc" )
      //               )
      //       .get();
      //  }