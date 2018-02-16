import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserBlogComponent } from './dashboard-user-blog.component';

describe('DashboardUserBlogComponent', () => {
  let component: DashboardUserBlogComponent;
  let fixture: ComponentFixture<DashboardUserBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUserBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
