import {TestBed} from '@angular/core/testing';
import {BoardComponent} from './board.component';

describe('BoardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should convert from index to coordinates properly', () => {
    expect(BoardComponent.indexToCoordinates(8)).toEqual({x: 2, y: 2});
    expect(BoardComponent.indexToCoordinates(2)).toEqual({x: 0, y: 2});
    expect(BoardComponent.indexToCoordinates(7)).toEqual({x: 2, y: 1});
    expect(BoardComponent.indexToCoordinates(3)).toEqual({x: 1, y: 0});
  });
});
