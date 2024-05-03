import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-save-category',
  templateUrl: './save-category.component.html',
  styleUrl: './save-category.component.scss',
})
export class SaveCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
    console.log('DATA:', this.data);
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    if (this.data) {
      this.updateCategory();
    } else {
      this.registerCategory();
    }
  }

  registerCategory() {
    this.categoryService.register(this.categoryForm.value).subscribe((res) => {
      console.log('Respuesta registrar categoria:', res);
      this.closeDialog(true);
    });
  }

  updateCategory() {
    this.categoryService
      .update(this.data.id, this.categoryForm.value)
      .subscribe((res) => {
        console.log('Respuesta actualizar categoria:', res);
        this.closeDialog(true);
      });
  }

  closeDialog(success?: boolean) {
    this.dialogRef.close(success);
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      description: [],
      slug: ['', [Validators.required]],
    });
    if (this.data) {
      this.categoryForm.patchValue(this.data);
    }
  }

  updateErrorMessage(control: string) {
    if (this.form[control].hasError('required')) {
      this.errorMessage = 'Este campo es requerido';
    } else if (this.form[control].hasError('email')) {
      this.errorMessage = 'No es un email valido';
    } else if (this.form[control].hasError('maxlength')) {
      this.errorMessage = 'Solo se permite hasta 10 caracteres';
    } else {
      this.errorMessage = '';
    }
  }

  get form() {
    return this.categoryForm.controls;
  }
}
