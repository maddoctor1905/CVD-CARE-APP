import { TestBed } from '@angular/core/testing';

import { FirstInstallService } from './first-install.service';

describe('FirstInstallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstInstallService = TestBed.inject(FirstInstallService);
    expect(service).toBeTruthy();
  });
});
