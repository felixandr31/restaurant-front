import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePieComponent } from './recipe-pie.component';

describe('RecipePieComponent', () => {
  let component: RecipePieComponent;
  let fixture: ComponentFixture<RecipePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
