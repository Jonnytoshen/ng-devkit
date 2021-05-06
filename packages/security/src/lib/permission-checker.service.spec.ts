import { TestBed } from '@angular/core/testing';

import { NdkPermissionCheckerService } from './permission-checker.service';

describe('NdkPermissionCheckerService', () => {
  let service: NdkPermissionCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NdkPermissionCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
