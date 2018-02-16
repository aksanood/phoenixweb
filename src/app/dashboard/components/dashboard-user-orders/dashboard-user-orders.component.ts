import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-dashboard-user-orders',
  templateUrl: './dashboard-user-orders.component.html',
  styleUrls: ['./dashboard-user-orders.component.css']
})
export class DashboardUserOrdersComponent implements OnInit {

  orders$;

  constructor(private authService: AuthService, private orderService: OrderService) {
    this.orders$ = authService.user$.switchMap(u => orderService.getOrderByUser(u.uid));
  }

  ngOnInit() {
  }

}
