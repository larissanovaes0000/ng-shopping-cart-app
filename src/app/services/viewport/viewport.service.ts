import { Injectable } from '@angular/core';
import { merge, of, fromEvent } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  private readonly MOBILE_BREAKPOINT = 767;

  isMobile$ = merge(of(window.innerWidth), fromEvent(window, "resize")).pipe(
    map(() => window.innerWidth <= this.MOBILE_BREAKPOINT),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
