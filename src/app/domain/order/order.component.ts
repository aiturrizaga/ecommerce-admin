import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  public displayedColumns: string[] = [
    'id',
    'saleDate',
    'customer',
    'orderType',
    'total',
    'state',
    'productQuantity',
    'option',
  ];
  public dataSource: any[] = [];
}
