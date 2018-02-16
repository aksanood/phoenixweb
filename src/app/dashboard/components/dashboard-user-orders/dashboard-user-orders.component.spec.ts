import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserOrdersComponent } from './dashboard-user-orders.component';

describe('DashboardUserOrdersComponent', () => {
  let component: DashboardUserOrdersComponent;
  let fixture: ComponentFixture<DashboardUserOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUserOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
