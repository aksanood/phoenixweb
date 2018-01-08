import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../category.service';
import {ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  categories$;
  product;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.product = [];
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save (product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete () {
    if (!confirm('Are you sure you want to delete this product ?')) return;

      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
