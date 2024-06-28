import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  gotoSavePage() {
    // this.router.navigate(['orders/register']);
    // this.router.navigate(['orders', 'register']);
    this.router.navigate(['register'], {relativeTo: this.route});
  }

}
