import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from "../../core/services/order.service";
import { Order, OrderState } from "../../core/interfaces/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'saleDate',
    'customer',
    'orderType',
    'total',
    'state',
    'option',
  ];
  public dataSource: Order[] = [];

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.findAll().subscribe(res => this.dataSource = res.content)
  }

  getStateLabel(state: OrderState): string {
    switch (state) {
      case "IN_PROGRESS":
        return 'En progreso';
      case "ON_WAY":
        return 'En camino'
      case "DELIVERED":
        return 'Entregado'
      case "CANCELLED":
        return 'Cancelado'
      default:
        return 'Desconocido'
    }
  }

  gotoSavePage() {
    // this.router.navigate(['orders/register']);
    // this.router.navigate(['orders', 'register']);
    this.router.navigate(['register'], { relativeTo: this.route });
  }


}
