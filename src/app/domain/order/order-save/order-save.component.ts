import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../core/services/person.service';
import { Person, PersonAddress } from '../../../core/interfaces/person';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import {
  SaveOrder,
  SaveOrderItem,
  SelectedOrderProduct,
} from '../../../core/interfaces/order';
import { OrderService } from '../../../core/services/order.service';
import { Router } from '@angular/router';

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

  totalAmount: number = 0;

  constructor(
    private personService: PersonService,
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initOrderForm();
    this.getPersons();
    this.getProducts();
  }

  registerOrder() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    if (this.selectedOrderProducts && this.selectedOrderProducts.length <= 0) {
      alert('No hay ningún producto agregado');
      return;
    }

    const body: SaveOrder = { ...this.orderForm.value };
    body.state = 'IN_PROGRESS';
    body.items = this.selectedOrderProducts.map((res) => {
      const item: SaveOrderItem = {
        productId: res.productId,
        quantity: res.productQuantity,
      };
      return item;
    });
    this.orderService.register(body).subscribe(() => {
      alert('Orden registrada');
      this.router.navigate(['/orders']);
    });
  }

  addSelectedOrderProduct(): void {
    if (this.productCtrl.value && this.quantityCtrl.value) {
      const product: Product = this.productCtrl.value;
      const quantity = this.quantityCtrl.value;
      const existingProductIndex = this.selectedOrderProducts.findIndex(
        (item) => item.productId === product.id
      );

      if (existingProductIndex !== -1) {
        // El producto ya existe, actualizar cantidad y subtotal
        this.selectedOrderProducts[existingProductIndex].productQuantity = quantity;
        this.selectedOrderProducts[existingProductIndex].productSubtotal = product.price * quantity;
      } else {
        // El producto no existe, agregar a la lista
        const orderItem: SelectedOrderProduct = {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productQuantity: quantity,
          productSubtotal: product.price * quantity,
        };
        this.selectedOrderProducts = [...this.selectedOrderProducts, orderItem];
      }

      this.productCtrl.reset();
      this.quantityCtrl.reset();
      this.calculateTotalAmount();
    }
  }

  removeSelectedOrderProduct(productId: number): void {
    this.selectedOrderProducts = this.selectedOrderProducts.filter(
      (item) => item.productId !== productId
    );
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.selectedOrderProducts.reduce((a, b) => a + b.productSubtotal, 0);
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
