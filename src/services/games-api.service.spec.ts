import { TestBed, inject } from '@angular/core/testing';

import { GamesApiService } from './games-api.service';

describe('GamesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesApiService]
    });
  });

  it('should be created', inject([GamesApiService], (service: GamesApiService) => {
    expect(service).toBeTruthy();
  }));
});
