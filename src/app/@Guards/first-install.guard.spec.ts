import { TestBed, async, inject } from '@angular/core/testing';

import { FirstInstallGuard } from './first-install.guard';

describe('FirstInstallGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstInstallGuard]
    });
  });

  it('should ...', inject([FirstInstallGuard], (guard: FirstInstallGuard) => {
    expect(guard).toBeTruthy();
  }));
});
