import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterViewComponent } from './waiter-view.component';

describe('WaiterViewComponent', () => {
  let component: WaiterViewComponent;
  let fixture: ComponentFixture<WaiterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
