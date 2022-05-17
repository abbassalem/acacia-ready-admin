import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged,  Observable, of, Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { OrderSearchCriteria } from 'src/app/shop/models/order.model';

@Component({
  selector: 'app-order-search',
  template: `
    <form [formGroup]="searchGroup">
  <mat-card>
    <mat-card-title style="text-align:start  ;"><small><b>Search order</b></small></mat-card-title>
    <mat-card-content>
          <!-- <mat-spinner [class.show]="searching" [diameter]="20" [strokeWidth]="2"></mat-spinner> -->
              <button style="align-content: flex-start;" mat-flat-button color="accent" [disabled]="!searchGroup.valid" (click) = "executeSearch()">
                <mat-icon>search</mat-icon>Search
            </button>
            &nbsp;&nbsp;
            <mat-form-field style="max-width: fit-content;">
                  <input  matInput [matDatepicker]="picker1" placeholder="Choose start date" formControlName="startDate">
                  <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
                  <mat-datepicker #picker1></mat-datepicker>
            </mat-form-field>
            <mat-form-field style="max-width: fit-content;">
                  <input matInput [matDatepicker]="picker2" placeholder="Choose end date" formControlName="endDate">
                  <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                  <mat-datepicker #picker2></mat-datepicker>
            </mat-form-field>
            
            <mat-form-field>
              <input matInput formControlName ="orderUser" 
              [matAutocomplete]="auto" placeholder="Filter email">
              <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" [displayWith]="displayFn">
                  <mat-option *ngFor="let user of (fetchedUsers$ | async)" [value]="user">
                    {{user.email}}
                  </mat-option>
              </mat-autocomplete>
            </mat-form-field>
            
            &nbsp;&nbsp;
            <mat-row>
              <span>Name: <b>{{selectedUser?.displayName}}</b> - Phone: <b>{{selectedUser?.phoneNumber}}</b></span>
            </mat-row>
              
            <mat-form-field>
                  <mat-select formControlName="orderStatus">
                    <mat-option *ngFor= "let status of statusList" [value]="status.value" 
                      [selected]="status.isSelected">{{status.label}}
                    </mat-option>
                  </mat-select>
            </mat-form-field>
          </mat-card-content>
        </mat-card>
      </form>
  <br><br>
  `,
  styles: [
    `
    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      justify-content: center;
    }

    mat-card-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    .mat-form-field {
      min-width: 300px;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px;
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
  `,
  ],
})
export class OrderSearchComponent implements OnInit, OnDestroy {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Input() fetchedUsers$: Observable<Array<User>> ;
  @Output() searchCriteriaChange = new EventEmitter<OrderSearchCriteria>();
  @Output() usersForAutoChange = new EventEmitter<string>();

  selectedUser: User;
  searchGroup: FormGroup;
  statusList: Status[] = [];
  userSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.initilizeStatusList();
    this.searchGroup = new FormGroup(
      {
        startDate: new FormControl(new Date(0), [Validators.required]),
        endDate: new FormControl(new Date(), [Validators.required]),
        orderStatus: new FormControl('OPEN'),
        orderUser: new FormControl()
      }
    );   
    
    this.userSubscription = this.searchGroup.get('orderUser').valueChanges.pipe( 
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap( val => of(val))
        )
        .subscribe( val => {
          console.log('userEmail from search comp');
          console.dir(val);
          if ( typeof val === 'string'){
            this.usersForAutoChange.emit(val);
          } else {
            console.log('selectedUser: ');
            console.dir(val);
             this.selectedUser = val;
          }

        });
  }

   displayFn(user){
     if (user) {
      return user.email;
     } else {
       return '';
     }
   }

  executeSearch() {
   
    let orderSearchCriteria: OrderSearchCriteria = {
      start: this.searchGroup.get('startDate').value.getTime(),
      end: this.searchGroup.get('endDate').value.getTime(),
      status: this.searchGroup.get('orderStatus').value,
      userId: this.searchGroup.get('orderUser')?.value?.uid
    };
    this.searchCriteriaChange.emit(orderSearchCriteria);
  }

  initilizeStatusList(){
    this.statusList.push({value: 'ALL', label: 'All', isSelected: false});
    this.statusList.push({value: 'OPEN', label: 'Open', isSelected: true});
    this.statusList.push({value: 'CLOSED', label: 'Closed', isSelected: false});
    this.statusList.push({value: 'DELIVERED', label: 'Delivered', isSelected: false});
    this.statusList.push({value: 'CANCELLED', label: 'Cancelled', isSelected: false});
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

export interface Status {
  value: string;
  label: string;
  isSelected: boolean;
} 

