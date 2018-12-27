import { TestBed } from '@angular/core/testing';

import { GameRulesService } from './game-rules.service';

describe('GameRulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameRulesService = TestBed.get(GameRulesService);
    expect(service).toBeTruthy();
  });
});
