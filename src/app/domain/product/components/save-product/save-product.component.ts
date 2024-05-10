import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrl: './save-product.component.scss',
})
export class SaveProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<SaveProductComponent>
  ) {}

  ngOnInit(): void {
    this.initProductForm();
  }

  getCategories() {
    this.categoryService.findAll()
    .subscribe((res: any) => {
      this.categories = res.content
    })
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      imageUrl: [''],
      rating: [0],
      categoryId: [''],
      slug: [''],
      price: [0],
    });
    this.getCategories();
  }

  registerProduct() {
    this.productService.register(this.productForm.value)
    .subscribe((res: any) => {
      console.log('Respuesta registrar producto:', res);
      this.closeDialog(true);
    })
  }

  closeDialog(res?: boolean) {
    this.dialogRef.close(res);
  }
}
