// src/app/core/services/css-generator.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { CssGeneratorService } from './css-generator.service';
import { TokenResolverService } from './token-resolver.service';
import { IDesignTokens } from '../data/contracts/design-tokens.interface';
import { mockDesignTokens } from '../data/mocks/mock-design-tokens'; // Mock importado

describe('CssGeneratorService', () => {
  let service: CssGeneratorService;

  // Usa o mock importado e completo
  const validMockTokens: IDesignTokens = mockDesignTokens;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CssGeneratorService, TokenResolverService],
    });
    service = TestBed.inject(CssGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve gerar variáveis primitivas de cor e espaçamento', () => {
    const css = service.generateCssString(validMockTokens);
    expect(css).toContain('--mlv-color-blue-500: #3b82f6;');
    expect(css).toContain('--mlv-spacing-sm: 8px;');
  });
  
  it('deve gerar variáveis semânticas resolvendo aliases', () => {
    const css = service.generateCssString(validMockTokens);
    // As chaves agora seguem o novo padrão
    expect(css).toContain('--color-background-primary: var(--mlv-color-neutral-100);');
    expect(css).toContain('--color-text-accent: var(--mlv-color-blue-500);');
  });

  it('deve gerar variáveis de tipografia e sombra', () => {
    const css = service.generateCssString(validMockTokens);
    // Verifica a geração de primitivas de tipografia e sombra
    expect(css).toContain('--mlv-font-family-sans: "Inter", sans-serif;');
    expect(css).toContain('--mlv-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);');
    // Verifica a geração de semânticas de tipografia e sombra
    expect(css).toContain('--typography-heading-1-font-family: var(--mlv-font-family-sans);');
    expect(css).toContain('--shadow-card: var(--mlv-shadow-md);');
  });

  it('deve retornar uma string vazia se os tokens forem nulos ou incompletos', () => {
    expect(service.generateCssString({} as any)).toBe('');
    expect(service.generateCssString({ primitives: {} } as any)).toBe('');
    expect(service.generateCssString({ semantics: {} } as any)).toBe('');
  });
});
