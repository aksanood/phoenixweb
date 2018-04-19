import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowcaseItemComponent } from './add-showcase-item.component';

describe('AddShowcaseItemComponent', () => {
  let component: AddShowcaseItemComponent;
  let fixture: ComponentFixture<AddShowcaseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShowcaseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShowcaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
