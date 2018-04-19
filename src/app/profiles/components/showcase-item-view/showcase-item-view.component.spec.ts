import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseItemViewComponent } from './showcase-item-view.component';

describe('ShowcaseItemViewComponent', () => {
  let component: ShowcaseItemViewComponent;
  let fixture: ComponentFixture<ShowcaseItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
