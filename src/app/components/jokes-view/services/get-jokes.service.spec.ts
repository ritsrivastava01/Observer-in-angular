import { TestBed } from '@angular/core/testing';

import { GetJokesService } from './get-jokes.service';

describe('GetJokesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetJokesService = TestBed.get(GetJokesService);
    expect(service).toBeTruthy();
  });
});
