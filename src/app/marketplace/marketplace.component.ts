import { Component, Input } from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/products';
import 'rxjs/add/operator/switchMap';
import {ProductFilterComponent} from "../product-filter/product-filter.component";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  isFreeProduct = false;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {

    productService
      .getAll()
      .switchMap(products => {
      this.products = products;
      return route.queryParamMap;
      })

      .subscribe(params => {
        this.category = params.get('category');

        // setting the filtered products
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }

  searchProducts (query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  filterFreeProducts (query: number) {
    return this.filteredProducts = (query === 0) ?
      this.products.filter(p => p.price.toString() === query.toString()) :
      this.products;
  }
}
