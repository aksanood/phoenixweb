import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }

  ngOnInit() {
  }

}
