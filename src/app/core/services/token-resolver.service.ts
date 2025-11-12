// src/app/core/services/token-resolver.service.ts
import { Injectable } from '@angular/core';
import { IDesignTokens } from '../data/contracts/design-tokens.interface';
import get from 'lodash.get';

@Injectable({
  providedIn: 'root',
})
export class TokenResolverService {
  public resolveTokenValue(value: string, allTokens: IDesignTokens): string {
    if (typeof value !== 'string' || !value.startsWith('{') || !value.endsWith('}')) {
      return value;
    }

    const path = value.slice(1, -1);
    const pathParts = path.split('.');
    
    // Constrói o caminho completo para a busca no objeto de primitivos
    const lookupPath = this.buildLookupPath(pathParts);

    const primitiveValue = get(allTokens.primitives, lookupPath);

    if (primitiveValue === undefined) {
      console.warn(`Token alias "${value}" could not be resolved.`);
      return 'unset';
    }

    const cssVarName = this.buildCssVariableName(pathParts);
    return `var(${cssVarName})`;
  }

  /**
   * Constrói o caminho completo para a busca com lodash.get,
   * adicionando o prefixo da categoria (ex: 'typography').
   */
  private buildLookupPath(pathParts: string[]): string {
    const categoryMap: { [key: string]: string } = {
      font: 'typography.font',
      size: 'typography.size',
      weight: 'typography.weight',
      lineHeight: 'typography.lineHeight',
      // Adicione outros mapeamentos se necessário
    };
    
    const category = categoryMap[pathParts[0]];
    if (category) {
      // Reconstrói o caminho com a categoria correta
      // ex: ['size', 'font', 'xl'] -> 'typography.size.font.xl'
      return `${category}.${pathParts.slice(1).join('.')}`;
    }
    
    // Se não for uma categoria especial, retorna o caminho original.
    // ex: ['spacing', 'md'] -> 'spacing.md'
    return pathParts.join('.');
  }
  
  private buildCssVariableName(pathParts: string[]): string {
    // A lógica de construção da variável CSS permanece a mesma,
    // pois ela se baseia no alias original, que é o correto.
    const firstPart = pathParts[0];

    if (firstPart === 'size' && pathParts[1] === 'font') {
        return `--mlv-size-font-${pathParts[2]}`;
    }
    if (firstPart === 'font') {
        return `--mlv-font-family-${pathParts[1]}`;
    }
    if (firstPart === 'weight') {
      return `--mlv-font-weight-${pathParts[1]}`;
    }
    if (firstPart === 'lineHeight') {
      return `--mlv-line-height-${pathParts[1]}`;
    }
    
    // Caso padrão para cores, espaçamento, sombras...
    // ex: [ 'spacing', 'md' ] -> --mlv-spacing-md
    return `--mlv-${pathParts.join('-')}`;
  }
}
