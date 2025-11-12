// src/app/core/services/css-generator.service.ts
import { Injectable, inject } from '@angular/core';
import { 
  IDesignTokens, 
  IPrimitiveTokens, 
  ISemanticTokens, 
  SemanticColorKeys,
  SemanticSpacingKeys,
  SemanticShadowsKeys,
  SemanticTypographyKeys,
  ITypographyValue
} from '../data/contracts/design-tokens.interface';
import { TokenResolverService } from './token-resolver.service';

@Injectable({
  providedIn: 'root',
})
export class CssGeneratorService {
  private tokenResolver = inject(TokenResolverService);

  public generateCssString(tokens: IDesignTokens): string {
    if (!tokens || !tokens.primitives || !tokens.semantics) {
      return '';
    }

    const primitiveCss = this.generatePrimitiveVariables(tokens.primitives);
    const semanticCss = this.generateSemanticVariables(tokens.semantics, tokens);

    return `:root {\n${primitiveCss}${semanticCss}}\n`;
  }

  private generatePrimitiveVariables(primitives: IPrimitiveTokens): string {
    let css = '  /* --- Primitives --- */\n';
    
    // Cores
    for (const color in primitives.colors) {
      for (const shade in primitives.colors[color]) {
        css += `  --mlv-color-${color}-${shade}: ${primitives.colors[color][shade]};\n`;
      }
    }
    // Espaçamento
    for (const key in primitives.spacing) {
      css += `  --mlv-spacing-${key}: ${primitives.spacing[key]};\n`;
    }
    // Sombras
    for (const key in primitives.shadows) {
      css += `  --mlv-shadow-${key}: ${primitives.shadows[key]};\n`;
    }
    // Tipografia (família, peso, etc.)
    for (const key in primitives.typography.font) {
      css += `  --mlv-font-family-${key}: ${primitives.typography.font[key]};\n`;
    }
    for (const key in primitives.typography.weight) {
      css += `  --mlv-font-weight-${key}: ${primitives.typography.weight[key]};\n`;
    }
    for (const key in primitives.typography.lineHeight) {
      css += `  --mlv-line-height-${key}: ${primitives.typography.lineHeight[key]};\n`;
    }
    for (const category in primitives.typography.size) {
      for (const key in primitives.typography.size[category]) {
        css += `  --mlv-size-${category}-${key}: ${primitives.typography.size[category][key]};\n`;
      }
    }
    return css;
  }

  private generateSemanticVariables(semantics: ISemanticTokens, allTokens: IDesignTokens): string {
    let css = '  /* --- Semantics --- */\n';
    
    // Cores
    for (const key in semantics.colors) {
      const token = semantics.colors[key as SemanticColorKeys];
      const resolvedValue = this.tokenResolver.resolveTokenValue(token.value, allTokens);
      css += `  --${key}: ${resolvedValue};\n`;
    }
    // Espaçamento
    for (const key in semantics.spacing) {
      const token = semantics.spacing[key as SemanticSpacingKeys];
      const resolvedValue = this.tokenResolver.resolveTokenValue(token.value, allTokens);
      css += `  --${key}: ${resolvedValue};\n`;
    }
    // Sombras
    for (const key in semantics.shadows) {
      const token = semantics.shadows[key as SemanticShadowsKeys];
      const resolvedValue = this.tokenResolver.resolveTokenValue(token.value, allTokens);
      css += `  --${key}: ${resolvedValue};\n`;
    }
    // Tipografia (gera um grupo de variáveis para cada token)
    for (const key in semantics.typography) {
      const token = semantics.typography[key as SemanticTypographyKeys];
      const typographyValue = token.value as ITypographyValue;
      
      for (const prop in typographyValue) {
        const value = typographyValue[prop as keyof ITypographyValue];
        const resolvedValue = this.tokenResolver.resolveTokenValue(value, allTokens);
        css += `  --${key}-${this.toKebabCase(prop)}: ${resolvedValue};\n`;
      }
    }
    return css;
  }

  // Função utilitária para converter camelCase para kebab-case
  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}
