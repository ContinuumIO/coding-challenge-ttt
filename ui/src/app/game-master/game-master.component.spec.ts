import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMasterComponent } from './game-master.component';

describe('GameMasterComponent', () => {
  let component: GameMasterComponent;
  let fixture: ComponentFixture<GameMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [GameMasterComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
