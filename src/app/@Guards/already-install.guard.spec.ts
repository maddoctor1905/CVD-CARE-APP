import { TestBed, async, inject } from '@angular/core/testing';

import { AlreadyInstallGuard } from './already-install.guard';

describe('AlreadyInstallGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlreadyInstallGuard]
    });
  });

  it('should ...', inject([AlreadyInstallGuard], (guard: AlreadyInstallGuard) => {
    expect(guard).toBeTruthy();
  }));
});
