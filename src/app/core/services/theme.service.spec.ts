// src/app/core/services/theme.service.spec.ts
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { inject } from '@angular/core';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
  });

  afterEach(() => {
    // Limpa a classe do body após cada teste para evitar interferência
    document.body.classList.remove('dark');
  });

  it('should be created', () => {
    expect(TestBed.inject(ThemeService)).toBeTruthy();
  });

  it('deve aplicar a classe "dark" ao body quando o tema for "dark"', fakeAsync(() => {
    TestBed.runInInjectionContext(() => {
      const service = inject(ThemeService);
      tick(); // Processa a execução inicial do effect

      service.setTheme('dark');
      tick(); // Aguarda a execução do effect após a mudança do signal

      expect(document.body.classList.contains('dark')).toBe(true);
    });
  }));

  it('deve remover a classe "dark" do body quando o tema for "light"', fakeAsync(() => {
    TestBed.runInInjectionContext(() => {
      // Garante que a classe 'dark' existe antes do teste
      document.body.classList.add('dark');
      
      const service = inject(ThemeService);
      tick();

      service.setTheme('light');
      tick();

      expect(document.body.classList.contains('dark')).toBe(false);
    });
  }));

  it('deve alternar o tema de "light" para "dark" e de "dark" para "light"', fakeAsync(() => {
    TestBed.runInInjectionContext(() => {
      const service = inject(ThemeService);
      
      // Estado inicial: light
      service.setTheme('light');
      tick();
      expect(document.body.classList.contains('dark')).toBe(false);

      // Alterna para dark
      service.toggleTheme();
      tick();
      expect(document.body.classList.contains('dark')).toBe(true);
      expect(service.theme()).toBe('dark');

      // Alterna de volta para light
      service.toggleTheme();
      tick();
      expect(document.body.classList.contains('dark')).toBe(false);
      expect(service.theme()).toBe('light');
    });
  }));
});
