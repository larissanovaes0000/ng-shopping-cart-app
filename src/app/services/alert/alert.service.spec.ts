import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts with null alert state', () => {
    let latest: any = 'initial';
    service.alert$.subscribe((value) => (latest = value));

    expect(latest).toBeNull();
  });

  it('emits success alert and auto clears after 3 seconds', fakeAsync(() => {
    let latest: any;
    service.alert$.subscribe((value) => (latest = value));

    service.success('ok');
    expect(latest).toEqual({ message: 'ok', type: 'success' });

    tick(3000);
    expect(latest).toBeNull();
  }));

  it('clears alert manually', () => {
    let latest: any;
    service.alert$.subscribe((value) => (latest = value));

    service.error('error');
    expect(latest).toEqual({ message: 'error', type: 'danger' });

    service.clear();
    expect(latest).toBeNull();
  });

  it('emits warning alert', fakeAsync(() => {
    let latest: any;
    service.alert$.subscribe((value) => (latest = value));

    service.warning('warn');
    expect(latest).toEqual({ message: 'warn', type: 'warning' });
    tick(3000);
    expect(latest).toBeNull();
  }));

  it('emits info alert', fakeAsync(() => {
    let latest: any;
    service.alert$.subscribe((value) => (latest = value));

    service.info('info');
    expect(latest).toEqual({ message: 'info', type: 'info' });
    tick(3000);
    expect(latest).toBeNull();
  }));

  it('does not auto clear before 3 seconds', fakeAsync(() => {
    let latest: any;
    service.alert$.subscribe((value) => (latest = value));

    service.error('error');
    tick(2999);
    expect(latest).toEqual({ message: 'error', type: 'danger' });

    tick(1);
    expect(latest).toBeNull();
  }));
});
