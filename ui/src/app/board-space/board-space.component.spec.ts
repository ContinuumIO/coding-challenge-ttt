import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSpaceComponent } from './board-space.component';

describe('BoardSpaceComponent', () => {
  let component: BoardSpaceComponent;
  let fixture: ComponentFixture<BoardSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [BoardSpaceComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
