// src/app/core/services/theme.service.ts
import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  // Sinal para armazenar o tema atual
  private themeSignal = signal<Theme>('light');

  // Sinal público somente leitura
  public readonly theme = this.themeSignal.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Detecta a preferência inicial do sistema operacional
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.setTheme(prefersDark.matches ? 'dark' : 'light');

      // Ouve mudanças na preferência do sistema
      prefersDark.addEventListener('change', (e) => {
        this.setTheme(e.matches ? 'dark' : 'light');
      });

      // Efeito para aplicar a classe ao body
      effect(() => {
        const currentTheme = this.theme();
        if (currentTheme === 'dark') {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      });
    }
  }

  /**
   * Define o tema da aplicação.
   * @param theme O tema a ser definido ('light' or 'dark').
   */
  public setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
  }

  /**
   * Alterna entre os temas light e dark.
   */
  public toggleTheme(): void {
    this.themeSignal.update((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }
}
