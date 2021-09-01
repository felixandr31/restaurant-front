import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToTableReservationComponent } from './to-table-reservation.component';

describe('ToTableReservationComponent', () => {
  let component: ToTableReservationComponent;
  let fixture: ComponentFixture<ToTableReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToTableReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToTableReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
