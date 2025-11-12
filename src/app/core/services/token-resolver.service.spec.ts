// src/app/core/services/token-resolver.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { TokenResolverService } from './token-resolver.service';
import { mockDesignTokens } from '../data/mocks/mock-design-tokens';

describe('TokenResolverService', () => {
  let service: TokenResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenResolverService],
    });
    service = TestBed.inject(TokenResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve resolver um alias de espaçamento para a variável CSS correta', () => {
    const alias = '{spacing.md}';
    const expectedVar = 'var(--mlv-spacing-md)';
    expect(service.resolveTokenValue(alias, mockDesignTokens)).toBe(expectedVar);
  });
  
  it('deve resolver um alias de tipografia (font family) para a variável CSS correta', () => {
    const alias = '{font.sans}';
    const expectedVar = 'var(--mlv-font-family-sans)';
    expect(service.resolveTokenValue(alias, mockDesignTokens)).toBe(expectedVar);
  });
  
  it('deve resolver um alias de tipografia (font size) para a variável CSS correta', () => {
    const alias = '{size.font.xl}';
    const expectedVar = 'var(--mlv-size-font-xl)';
    expect(service.resolveTokenValue(alias, mockDesignTokens)).toBe(expectedVar);
  });

  it('deve retornar o valor original se não for um alias', () => {
    const literalValue = '#ffffff';
    expect(service.resolveTokenValue(literalValue, mockDesignTokens)).toBe(literalValue);
  });

  it('deve retornar "unset" para um alias inválido', () => {
    const invalidAlias = '{color.nonexistent.100}';
    expect(service.resolveTokenValue(invalidAlias, mockDesignTokens)).toBe('unset');
  });
});
