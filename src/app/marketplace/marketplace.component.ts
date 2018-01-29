import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../models/products';
import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnDestroy {

  products: Product[] = [];
  filteredProducts: any[];
  category: string;
  categories$;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    this.categories$ = categoryService.getAllProductCategories();


     this.subscription = productService
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

  filterFreeProducts (c: string) {
    console.log(c);

    return this.filteredProducts = (0 === 0) ?
      this.filteredProducts.filter(p => p.price.toString() === '0') :
      this.products;
  }

  filterPaidProducts(c: string) {
    return this.filteredProducts = (0 === 0) ?
      this.filteredProducts.filter(p => p.price !== 0) :
      this.products;
  }

  filterByPriceRange() {

  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
