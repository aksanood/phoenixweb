import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../../../shared/models/products';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  //dtOptions: DataTables.Settings = {};
  dtOptions: DataTables.Settings = {};
  products: Product[] = [];
  dtTrigger: Subject<any> = new Subject();

  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {

    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.dtTrigger.next();
      });
  }

  filter (query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

}
