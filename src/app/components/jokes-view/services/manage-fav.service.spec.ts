import { TestBed } from '@angular/core/testing';

import { ManageFavService } from './manage-fav.service';

describe('ManageFavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageFavService = TestBed.get(ManageFavService);
    expect(service).toBeTruthy();
  });
});
