import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { ViewportService } from './viewport.service';

describe('ViewportService', () => {
  let service: ViewportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a boolean for isMobile$', (done) => {
    service.isMobile$.pipe(take(1)).subscribe((value) => {
      expect(typeof value).toBe('boolean');
      done();
    });
  });
});
