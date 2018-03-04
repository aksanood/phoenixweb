import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserTutorialsComponent } from './dashboard-user-tutorials.component';

describe('DashboardUserTutorialsComponent', () => {
  let component: DashboardUserTutorialsComponent;
  let fixture: ComponentFixture<DashboardUserTutorialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUserTutorialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
