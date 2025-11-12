// src/app/core/services/i18n.service.ts
import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private http = inject(HttpClient);

  // Sinal para o idioma atual
  private readonly currentLangSignal = signal<string>('pt-BR');
  public readonly currentLang = this.currentLangSignal.asReadonly();

  // Sinal para armazenar as traduções carregadas
  private readonly translationsSignal = signal<{ [key: string]: string }>({});
  
  /**
   * Carrega o arquivo de tradução para um idioma específico.
   * @param lang O código do idioma a ser carregado (ex: 'pt-BR').
   */
  public loadLanguage(lang: string): Observable<any> {
    const langPath = `./assets/i18n/${lang}.json`;
    return this.http.get<{ [key: string]: string }>(langPath).pipe(
      tap(translations => {
        this.translationsSignal.set(translations);
        this.currentLangSignal.set(lang);
      }),
      catchError(error => {
        console.error(`Could not load translation file for language "${lang}".`, error);
        // Em caso de erro, define as traduções como um objeto vazio para evitar que a app quebre
        this.translationsSignal.set({});
        return of({}); // Retorna um observable vazio para que o AppInitializer possa continuar
      })
    );
  }

  /**
   * Traduz uma chave para o idioma atualmente carregado.
   * @param key A chave de tradução (ex: 'GREETING').
   * @returns A string traduzida ou a própria chave se a tradução não for encontrada.
   */
  public translate(key: string): string {
    const translations = this.translationsSignal();
    return translations[key] || key;
  }
}
