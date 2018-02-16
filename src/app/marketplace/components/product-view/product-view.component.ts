import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product;
  id;
  cart$;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: ShoppingCartService) {

    this.product = [];

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(2).subscribe(p => this.product = p);
  }


  addToCart () {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
}
