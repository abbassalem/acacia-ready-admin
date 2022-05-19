import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Order } from '../../shop/models/order.model';
import { AgGridEvent, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'
import { ButtonRenderer, CheckboxRenderer } from 'src/app/shared/renderers/eggrid.renderers';
import 'ag-grid-enterprise';
import { ButtonRendererComponent } from 'src/app/shared/renderers/button-renderer.component';
import { Store } from '@ngrx/store';
import * as fromAuthReducer from '../../../app/auth/reducers/auth.reducer';

@Component({
  selector: 'app-order-list',
  template: `
 
      <ag-grid-angular #agGrid
          [gridOptions]="gridOptions" 
          class="ag-theme-alpine-dark"
          [masterDetail]="true"
          [detailCellRendererParams]="detailCellRendererParams"
          [columnDefs]="columnDefs"
          [rowData]="orderList"
          [rowSelection]="'single'"
          [immutableData]="true"
          [getRowNodeId]="getRowNodeId"
          [animateRows]="true"
          (gridReady)="onGridReady($event)"
          >
      </ag-grid-angular>
`,
  styles: [
    `
    ag-grid-angular {
      width: 100%;
      height: 30%
    }
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ]
})

export class OrderListComponent {

  @Input() orderList: Order[];
  @ViewChild(AgGridAngular) agGrid: AgGridAngular;

  gridApi;
  gridColumnApi;
  gridOptions;

  public columnDefs: ColDef[] = [
    { headerName: 'Order Date', field: 'orderDate',cellRenderer: 'agGroupCellRenderer', resizable: true,
    filter:true,sortable: true, valueFormatter: params => this.dateFormatter(params.data.orderDate)},
    { headerName: 'Status',field: 'status', sortable: true},
    { headerName: 'Amount',field: 'amount',filter:true, sortable: true, valueFormatter: params =>  params.data.amount.toFixed(2)},
    { headerName: 'Delivery Date',field: 'deliveryDate', filter:true, sortable: true, valueFormatter: params => this.dateFormatter(params.data.deliveryDate) },
    { headerName: 'Delivery Time',field: 'deliveryTime', sortable:true},
    { headerName: 'Order Payment',field: 'paid', cellRenderer: CheckboxRenderer, editable: false },
    { headerName: 'User Email',field: 'orderUser.email' },
    { headerName: 'User Id',field: 'orderUser.displayName', cellRenderer: ButtonRendererComponent,
      cellRendererParams: {
        onClick: this.onSelect.bind(this),
        label: 'Show User'
    }},
    { headerName: 'Name ',field: 'orderUser.displayName', hide: true },
    { headerName: 'Phone ',field: 'orderUser.phoneNumber', hide: true }
  
  ];

  constructor(private authStore: Store<fromAuthReducer.State>) {}

  onSelect(e) {
    console.log('onselect event');
    console.dir(e);
  
    this.columnDefs['orderUser.phoneNumber'].hide = false;
    this.columnDefs['orderUser.displayName'].hide = false;

  }

  detailCellRendererParams = {
    detailGridOptions: {
        columnDefs: [
            { headerName: 'ID', field: 'id' },
            { headerName: 'Quantity',  field: 'quantity'},
            { headerName: 'Product Name',field: 'product.name'}
        ],

        onFirstDataRendered: params => {
          params.api.sizeColumnsToFit();
        }
    },
    getDetailRowData: (params) => {
        params.successCallback(params.data.items);
    }, 
  };

  dateFormatter(date): string {
    let str = new Date(date).getDate().toString() + '/' + 
    new Date(date).getMonth().toString() +  '/' + new Date(date).getFullYear().toString();
    return str;
  }

  getRowNodeId(params)  {
    return params.id;
  }

  onGridReady(params: GridReadyEvent) {

    this.agGrid.api.sizeColumnsToFit();
  }

  // onCellClicked(e: CellClickedEvent): void {
  //   console.log('cellClicked', e);
  // }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}

