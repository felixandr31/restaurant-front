import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMenuItemComponent } from './choose-menu-item.component';

describe('ChooseMenuItemComponent', () => {
  let component: ChooseMenuItemComponent;
  let fixture: ComponentFixture<ChooseMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
