import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './domain/dashboard/dashboard.component';
import { ProductComponent } from './domain/product/product.component';
import { CategoryComponent } from './domain/category/category.component';
import { OrderComponent } from './domain/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'orders',
        component: OrderComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
