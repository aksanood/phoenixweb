import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserShowcaseComponent } from './dashboard-user-showcase.component';

describe('DashboardUserShowcaseComponent', () => {
  let component: DashboardUserShowcaseComponent;
  let fixture: ComponentFixture<DashboardUserShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUserShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
