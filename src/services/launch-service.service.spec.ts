import { TestBed } from '@angular/core/testing';

import { LaunchServiceService } from './launch-service.service';

describe('LaunchServiceService', () => {
  let service: LaunchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
