import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExplorerComponent } from './game-explorer.component';

describe('GameExplorerComponent', () => {
  let component: GameExplorerComponent;
  let fixture: ComponentFixture<GameExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
