// src/app/core/services/responsiveness.service.ts
import { Injectable, signal, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResponsivenessService {
  private breakpointObserver = inject(BreakpointObserver);

  // Sinal para o estado de 'isHandset'
  private readonly isHandsetSignal = signal<boolean>(false);
  public readonly isHandset = this.isHandsetSignal.asReadonly();

  constructor() {
    // Observa as mudanças no breakpoint 'Handset'
    this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      ).subscribe(matches => {
        this.isHandsetSignal.set(matches);
      });
  }
}
