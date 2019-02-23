import { TestBed } from '@angular/core/testing';

import { ValidateLoginService } from './validate-login.service';

describe('ValidateLoginService', () => {
  let service: ValidateLoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValidateLoginService] });
    service = TestBed.get(ValidateLoginService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should contains the first pattern', () => {
      expect(service.isPasswordContainPattern('abc')).toBe(true);
      expect(service.isPasswordContainPattern('pqr')).toBe(true);
      expect(service.isPasswordContainPattern('aws')).toBeUndefined();
      expect(service.isPasswordContainPattern('aedpqrpqr')).toBe(true);
  });

  it('should contains same letter twice like aa,bb,cc ', () => {
    expect(service.isPasswordContainSameLetterTwice('aabbaws')).toBe(true);
    expect(service.isPasswordContainSameLetterTwice('aaxwobb')).toBe(true);
    expect(service.isPasswordContainSameLetterTwice('aareerebbaws')).toBe(true);
    expect(service.isPasswordContainSameLetterTwice('anhdbre')).toBe(false);
  });
});
