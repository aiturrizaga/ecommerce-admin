import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveProductComponent } from './components/save-product/save-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'slug',
    'rating',
    'categoryName',
    'price',
    'option',
  ];
  public dataSource: any[] = [];
  public products: any[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  openDialog(product?: any) {
    const dlgRef = this.dialog.open(SaveProductComponent);
    dlgRef.afterClosed().subscribe(res => {
      if (res) {
        this.getProducts();
      }
    })
  }

  deleteProduct(id: number) {
    this.productService.delete(id)
    .subscribe(() => {
      this.getProducts();
      alert('Se elimino el producto');
    })
  }

  getProducts() {
    this.productService.findAll().subscribe((res: any) => {
      this.products = res.content;
      this.dataSource = this.products;
    });
  }
}
