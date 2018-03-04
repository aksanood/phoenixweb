import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeToPhoenixComponent } from './subscribe-to-phoenix.component';

describe('SubscribeToPhoenixComponent', () => {
  let component: SubscribeToPhoenixComponent;
  let fixture: ComponentFixture<SubscribeToPhoenixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeToPhoenixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeToPhoenixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
