import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { ProductService } from '../../../../core/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SaveProductComponent>
  ) {}

  ngOnInit(): void {
    this.initProductForm();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.findAll()
    .subscribe((res: any) => {
      this.categories = res.content
      this.productForm.controls['categoryId'].setValue(this.data.category.id);
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

    if (this.data) {
      this.productForm.patchValue(this.data);
    }
  }

  saveProduct() {
    if (this.productForm.invalid) {
      return;
    }

    if (this.data) {
      // Actualizar producto
      this.updateProduct();
    } else {
      // Agregar producto
      this.registerProduct();
    }
  }

  registerProduct() {
    this.productService.register(this.productForm.value)
    .subscribe((res: any) => {
      console.log('Respuesta registrar producto:', res);
      this.closeDialog(true);
    })
  }

  updateProduct() {
    this.productService.update(this.data.id, this.productForm.value)
    .subscribe((res: any) => {
      console.log('Respuesta actualizar producto:', res);
      this.closeDialog(true);
    })
  }

  compareFn(option: any, value: any): boolean {
    return option.id === value.id;
  }

  closeDialog(res?: boolean) {
    this.dialogRef.close(res);
  }
}
