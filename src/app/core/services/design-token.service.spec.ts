// src/app/core/services/design-token.service.spec.ts
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { inject } from '@angular/core';
import { DesignTokenService } from './design-token.service';
import { TokenStateService } from './token-state.service';
import { CssGeneratorService } from './css-generator.service';
import { StyleInjectorService } from './style-injector.service';
import { mockDesignTokens } from '../data/mocks/mock-design-tokens';
import { IDesignTokens } from '../data/contracts/design-tokens.interface';

describe('DesignTokenService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DesignTokenService,
        TokenStateService,
        CssGeneratorService,
        StyleInjectorService,
      ],
    });
  });

  it('should be created', () => {
    // Apenas para garantir que o serviço pode ser instanciado
    expect(TestBed.inject(DesignTokenService)).toBeTruthy();
  });

  it('deve orquestrar o pipeline quando os tokens mudam', fakeAsync(() => {
    // Usamos runInInjectionContext para garantir que o effect funcione como na aplicação
    TestBed.runInInjectionContext(() => {
      // 1. Injeta os serviços DENTRO do contexto
      const tokenState = inject(TokenStateService);
      const cssGenerator = inject(CssGeneratorService);
      const styleInjector = inject(StyleInjectorService);
      
      // 2. Configura os espiões
      const generateSpy = spyOn(cssGenerator, 'generateCssString').and.returnValue('.test { color: blue; }');
      const injectSpy = spyOn(styleInjector, 'injectCss');

      // 3. O DesignTokenService é instanciado aqui pelo `inject`, o que cria o `effect`
      const service = inject(DesignTokenService);

      // 4. Avança o tempo para processar a execução inicial do effect
      tick();

      // 5. Limpa os espiões para ignorar a chamada inicial
      generateSpy.calls.reset();
      injectSpy.calls.reset();
      
      // 6. Simula a atualização nos tokens
      const newValidTokens: IDesignTokens = mockDesignTokens;
      tokenState.updateTokens(newValidTokens);
      
      // 7. Avança o tempo para permitir que o effect reaja
      tick();

      // 8. Verifica se o pipeline foi executado com os dados corretos
      expect(generateSpy).toHaveBeenCalledWith(newValidTokens);
      expect(injectSpy).toHaveBeenCalledWith('.test { color: blue; }', 'design-tokens');
    });
  }));
});
