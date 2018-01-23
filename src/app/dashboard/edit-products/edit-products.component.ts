import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../models/products';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  @Input('dtOptions') dtOptions;
  @Input('dtTrigger') dtTrigger;
  @Input('products') products: Product[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openForm() {
    this.router.navigate(['dashboard/add-product']);
  }
}
