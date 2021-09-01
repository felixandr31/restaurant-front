import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetrecipeformComponent } from './setrecipeform.component';

describe('SetrecipeformComponent', () => {
  let component: SetrecipeformComponent;
  let fixture: ComponentFixture<SetrecipeformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetrecipeformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetrecipeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
