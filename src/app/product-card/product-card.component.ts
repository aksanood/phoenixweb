import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('show-description') showDescription = true;
  constructor() { }
}