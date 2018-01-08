import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;
  @Output() change = new EventEmitter();
  checked = false;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();

    this.isChecked();

  }

  ngOnInit() {
  }

  isChecked() {
    if (this.checked) {
      this.change.emit();
    }

  }

}
