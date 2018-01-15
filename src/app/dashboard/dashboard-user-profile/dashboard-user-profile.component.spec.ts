import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserProfileComponent } from './dashboard-user-profile.component';

describe('DashboardUserProfileComponent', () => {
  let component: DashboardUserProfileComponent;
  let fixture: ComponentFixture<DashboardUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
