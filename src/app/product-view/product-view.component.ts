import { Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product;
  id;

  constructor(private productService: ProductService, private route: ActivatedRoute) {

    this.product = [];

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

}
