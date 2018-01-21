import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnIndicatorComponent } from './turn-indicator.component';

describe('TurnIndicatorComponent', () => {
  let component: TurnIndicatorComponent;
  let fixture: ComponentFixture<TurnIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
