import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUser} from "../../models/app-user";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

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

  this.router.navigate(['dashboard/dashboard-user-products']);
}

delete () {
  if (!confirm('Are you sure you want to delete this product ?')) return;

  this.productService.delete(this.id);
  this.router.navigate(['dashboard/dashboard-user-products']);
}

ngOnInit() {
}

ngOnDestroy () {
  this.subscription.unsubscribe();
}

}
