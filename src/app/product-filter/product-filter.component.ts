import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from '../category.service';
import {MatRadioChange} from "@angular/material";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;
  @Output() free = new EventEmitter();
  @Output() paid = new EventEmitter();
  array = ['Free', 'Paid'];


  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAllProductCategories();

  }

  ngOnInit() {
  }

  radioChange (event: MatRadioChange) {
    if (event.value === 'Free') {
      console.log(event);
      this.free.emit();
    }
    if (event.value === 'Paid') {
      console.log(event);
      this.paid.emit();
    }

  }

  reset() {
    console.log('Reesetttt');
  }

  isChecked(){}
}
