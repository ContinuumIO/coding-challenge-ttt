import { TestBed } from '@angular/core/testing';

import { GameMasterService } from './game-master.service';

describe('GameMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameMasterService = TestBed.get(GameMasterService);
    expect(service).toBeTruthy();
  });
});
