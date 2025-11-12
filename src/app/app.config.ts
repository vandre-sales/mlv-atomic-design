import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { I18nService } from './core/services/i18n.service';
import { routes } from './app.routes';
import { Observable } from 'rxjs';

// Função factory para o App Initializer
export function initializeAppFactory(i18nService: I18nService): () => Observable<any> {
  return () => i18nService.loadLanguage('pt-BR');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Provider para o HttpClient

    // Provider do App Initializer
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [I18nService],
      multi: true,
    },
  ],
};
