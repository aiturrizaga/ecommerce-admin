import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../core/services/person.service';
import { Person, PersonAddress } from '../../../core/interfaces/person';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { SelectedOrderProduct } from '../../../core/interfaces/order';

@Component({
  selector: 'app-order-save',
  templateUrl: './order-save.component.html',
  styles: ``,
})
export class OrderSaveComponent implements OnInit {
  displayedColumns: string[] = [
    'product',
    'quantity',
    'price',
    'subtotal',
    'option',
  ];
  selectedOrderProducts: SelectedOrderProduct[] = [];

  orderForm: FormGroup = new FormGroup({});
  persons: Person[] = [];
  addresses: PersonAddress[] = [];
  products: Product[] = [];

  productCtrl: FormControl = new FormControl('');
  quantityCtrl: FormControl = new FormControl('');

  constructor(
    private personService: PersonService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initOrderForm();
    this.getPersons();
    this.getProducts();
  }

  addSelectedOrderProduct(): void {
    const product: Product = this.productCtrl.value;
    const orderItem: SelectedOrderProduct = {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productQuantity: this.quantityCtrl.value,
      productSubtotal: product.price * this.quantityCtrl.value
    }
    this.selectedOrderProducts = [...this.selectedOrderProducts, orderItem];
  }

  removeSelectedOrderProduct(productId: number): void {
    this.selectedOrderProducts = this.selectedOrderProducts.filter(item => item.productId !== productId);
  }

  getPersons() {
    this.personService
      .findAll()
      .subscribe((res) => (this.persons = res.content));
  }

  getAddresses() {
    const userId = this.form['userId'].value;
    this.personService
      .getAddressById(userId)
      .subscribe((res) => (this.addresses = res));
  }

  getProducts() {
    this.productService
      .findAll()
      .subscribe((res) => (this.products = res.content));
  }

  initOrderForm() {
    this.orderForm = this.fb.group({
      userId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      orderType: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
    });
  }

  compareFn(option: any, value: any): boolean {
    return option.id === value.id;
  }

  get form() {
    return this.orderForm.controls;
  }
}
