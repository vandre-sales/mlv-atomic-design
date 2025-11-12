// src/app/core/services/token-state.service.ts
import { Injectable, signal, effect, inject } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { IDesignTokens } from '../data/contracts/design-tokens.interface';
import { PaletteGenerationService } from './palette-generation.service';
import { buildDefaultTokens } from '../data/default-tokens';

@Injectable({
  providedIn: 'root',
})
export class TokenStateService {
  private persistenceService = inject(PersistenceService);
  private paletteGenerationService = inject(PaletteGenerationService);

  // Definição da signal privada que armazena o estado
  private tokensSignal = signal<IDesignTokens>({} as IDesignTokens);

  // Exposição da signal pública como readonly para proteger a escrita
  public readonly tokens = this.tokensSignal.asReadonly();

  constructor() {
    this.hydrateState();

    // Efeito que reage a qualquer mudança nos tokens e os persiste
    effect(() => {
      const currentTokens = this.tokens();
      // Evita persistir o estado inicial vazio antes da hidratação
      if (Object.keys(currentTokens).length > 0) {
        this.persistenceService.setItem('design-tokens', currentTokens);
      }
    });
  }

  /**
   * Hidrata o estado dos tokens a partir do localStorage.
   * Se não houver dados, constrói e inicializa com o estado padrão.
   */
  private hydrateState(): void {
    const storedTokens = this.persistenceService.getItem<IDesignTokens>('design-tokens');
    if (storedTokens) {
      this.tokensSignal.set(storedTokens);
    } else {
      // Constrói o estado inicial completo usando o agregador e o gerador de paleta
      const defaultTokens = buildDefaultTokens(this.paletteGenerationService);
      this.tokensSignal.set(defaultTokens);
    }
  }

  /**
   * Atualiza o estado completo dos tokens.
   * @param newTokens O novo objeto de tokens.
   */
  public updateTokens(newTokens: IDesignTokens): void {
    this.tokensSignal.set(newTokens);
  }
}
