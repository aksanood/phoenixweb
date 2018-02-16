import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/take';
import {AppUser} from '../../../shared/models/app-user';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  categories$;
  product;
  id;
  appUser: AppUser;
  subscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.subscription = auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.product = [];
    this.categories$ = categoryService.getAllProductCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save (product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['admin/products']);
  }

  delete () {
    if (!confirm('Are you sure you want to delete this product ?')) return;

      this.productService.delete(this.id);
      this.router.navigate(['admin/products']);
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
