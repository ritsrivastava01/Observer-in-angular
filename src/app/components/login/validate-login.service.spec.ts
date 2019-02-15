import { TestBed } from '@angular/core/testing';

import { ValidateLoginService } from './validate-login.service';

describe('ValidateLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidateLoginService = TestBed.get(ValidateLoginService);
    expect(service).toBeTruthy();
  });
});
