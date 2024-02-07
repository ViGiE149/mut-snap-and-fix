import { TestBed } from '@angular/core/testing';

import { DamageDataService } from './damage-data.service';

describe('DamageDataService', () => {
  let service: DamageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
