import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Order } from '../../shop/models/order.model';
import { AgGridEvent, GridReadyEvent, ColDef, SideBarDef, GridApi, GridParams, SetLeftFeature } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'
import { ButtonRenderer, CheckboxRenderer } from 'src/app/shared/renderers/eggrid.renderers';
import 'ag-grid-enterprise';
import { Store } from '@ngrx/store';
import * as fromAuthReducer from '../../../app/auth/reducers/auth.reducer';

@Component({
  selector: 'app-order-list',
  template: `

<mat-toolbar-row *ngIf="orderList && orderList.length > 0">
      <button mat-raised-button (click)="delivered()" > Delivered</button>
      <button mat-raised-button (click)="closed()" > Closed</button>
      <button mat-raised-button (click)="paid()"> Paid</button>
 </mat-toolbar-row>    

      <ag-grid-angular #agGrid *ngIf="orderList && orderList.length > 0"
          [gridOptions]="gridOptions" 
          [pagination]="true"
          [paginationPageSize]="10"
          height="300"
          [alwaysShowVerticalScroll]= "true"
          class="ag-theme-alpine-dark"
          [masterDetail]="true"
          [detailCellRendererParams]="detailCellRendererParams"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [rowData]="orderList"
          [rowSelection]="'multiple'"
          [immutableData]="true"
          [getRowNodeId]="getRowNodeId"
          [animateRows]="true"
          [sideBar] = "true"
          [pivotColumnGroupTotals]=""
          (gridReady)="onGridReady($event)"
          (selectionChanged)="checkIfEmpty($event)"
         (rowEditingStopped)="onRowEditingStopped($event)"
         (rowEditingStarted)="onRowEditingStarted($event)"
         (cellClicked)="onCellClicked($event)"
         editType="fullRow"
         [suppressClickEdit]="true">
      </ag-grid-angular>

`,
  styles: [
    `
     /* (cellValueChangedEvent)= "executeCellValueChangedEvent($event)"> */

    .header-order-date{
      color: blue;
      font-weight: bold;
      background-color: white;
    }

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

  public rowSelected: Array<any> = new Array() ;

  gridApi;
  gridColumnApi;
  gridOptions;

  defaultColDef:ColDef = {
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
    editable: true
  };

  columnDefs = [

    { headerName: 'Order Date',headerClass:'header-order-date',  
    editable: false , hide: 'false', field: 'orderDate',cellRenderer: 'agGroupCellRenderer',  resizable: false, 
    filter:true,sortable: true, valueFormatter: params => this.dateFormatter(params.data.orderDate)},

    { headerName: 'Order Details',  children: [
        { headerName: 'Status',field: 'status', sortable: true, cellEditorPopup: true,
        cellEditorPopupPosition: 'over'},
        { headerName: 'Amount',field: 'amount',filter:true, sortable: true, 
          valueFormatter: params =>  params.data.amount.toFixed(2),
          valueParser: params => Number(params.newValue).toFixed(2)
        },
        { headerName: 'Order Payment',field: 'paid', cellRenderer: CheckboxRenderer, editable: false }
        
    ]},
  

    {headerName: 'Delivery Info',   children: [
        { headerName: 'Delivery Date',field: 'deliveryDate', filter:true, sortable: true, 
        valueFormatter: params => this.dateFormatter(params.data.deliveryDate),
        valueParser: params => this.dateFormatter(new Date(params.newValue)) },
        { headerName: 'Delivery Time',field: 'deliveryTime', sortable:true}
    ]},
    { headerName: 'User Info',   children: [
                            {field: 'orderUser.displayName', headerName: 'Name'},
                            {field: 'orderUser.email', headerName: 'Email'},
                            {field: 'orderUser.phoneNumber', headerName: 'Phone'}
    ]},
    {
      header: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      pinned: 'left',
      width: 50,
      field: 'checkboxBtn'
    },
    {
      headerName: "action",
      minWidth: 150,
      cellRenderer: this.actionCellRenderer,
      editable: false,
      colId: "action"
    }
  ];

  selection: any[] = [];

  constructor(private authStore: Store<fromAuthReducer.State>) {
    
  }

  checkIfEmpty(params){
    this.selection = params.gridApi.getSelectedNodes();
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
        console.log('getDetailRowData');
        console.dir(params);
        params.successCallback(params.data.items);
    }, 
  };

  dateFormatter(date): string {
    let str = new Date(date).getDate().toString() + '/' + 
    new Date(date).getMonth().toString() +  '/' + new Date(date).getFullYear().toString();
    return str;
  }

  getRowNodeId(params: { id: number; })  {
    // console.log('node data ');
    // console.dir(params.api.node.data);
    // console.log('node params ');
    // console.dir(params);
    return params.id;
  }

  onGridReady(params: GridReadyEvent) {
    this.agGrid.api.sizeColumnsToFit();
    this.gridApi = this.agGrid.api;
    // console.dir(params.api);
    
  }


  paid(){
    console.log('method paid');
    this.rowSelected = this.gridApi.getSelectedRows();
    console.log('paid');
    console.dir(this.rowSelected);

  }

  delivered(){
    this.rowSelected = this.gridApi.getSelectedRows()
    console.log('delivered');
    console.dir(this.rowSelected);
  }

  closed(){
    this.rowSelected = this.gridApi.getSelectedRows()
    console.log('closed');
    console.dir(this.rowSelected);
  }

  onCellClicked(params) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      console.log('params: data');
       console.dir(params.data);

       console.log('params:');
       console.dir(params);


      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }

      if (action === "update") {
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }

  onRowEditingStarted(params) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
  onRowEditingStopped(params) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }

  // clearSelection(): void {
  //   this.agGrid.api.deselectAll();
  // }


  // executeCellValueChangedEvent(event) {
    
  //   console.log('old value: ' + event.oldValue + ' new value: ' + event.newValue);
  // }
  // clearSelection(): void {
  //   this.agGrid.api.deselectAll();
  // }

 actionCellRenderer(params) {
    let eGui = document.createElement("div");
  
    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });
  
    if (isCurrentRowEditing) {
      eGui.innerHTML = `
  <button  class="action-button update"  data-action="update"> update  </button>
  <button  class="action-button cancel"  data-action="cancel" > cancel </button>
  `;
    } else {
      eGui.innerHTML = `
  <button class="action-button edit"  data-action="edit" > edit  </button>
  <button class="action-button delete" data-action="delete" > delete </button>
  `;
    }
  
    return eGui;
  }

}

