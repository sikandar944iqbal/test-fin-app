import { TestBed } from '@angular/core/testing';

import { SecurityScannerService } from './security-scanner.service';

describe('SecurityScannerService', () => {
  let service: SecurityScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
