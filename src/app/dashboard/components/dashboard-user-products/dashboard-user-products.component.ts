import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUser} from '../../../shared/models/app-user';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../../shared/services/auth.service';
import {Product} from '../../../shared/models/products';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-dashboard-user-products',
  templateUrl: './dashboard-user-products.component.html',
  styleUrls: ['./dashboard-user-products.component.css']
})
export class DashboardUserProductsComponent implements OnInit, OnDestroy{

  appUser: AppUser;
  userSubscription: Subscription;
  productSubscription: Subscription;
  products: Product[] = [];
  userProducts: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private auth: AuthService, private productService: ProductService, route: ActivatedRoute) {
    this.appUser = {$key: 'RS76', username: 'username', email: 'username@domain.com', isAdmin: false, picture: 'http::/jsjdj/djjs.com', name: 'John Doe'};
    this.userSubscription = auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.productSubscription =  this.productService.getAll()
      .subscribe(p => {
        this.products = p;
        this.userProducts  = p.filter(fp => fp.user === this.appUser.username );
        this.dtTrigger.next();
      });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnDestroy () {
    this.userSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

}
