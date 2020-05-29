import { TestBed } from '@angular/core/testing';

import { TopBarService } from './top-bar.service';

describe('TopBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopBarService = TestBed.inject(TopBarService);
    expect(service).toBeTruthy();
  });
});
