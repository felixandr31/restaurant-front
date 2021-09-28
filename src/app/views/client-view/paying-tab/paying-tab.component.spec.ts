import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayingTabComponent } from './paying-tab.component';

describe('PayingTabComponent', () => {
  let component: PayingTabComponent;
  let fixture: ComponentFixture<PayingTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
