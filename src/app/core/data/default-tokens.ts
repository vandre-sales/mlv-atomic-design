// src/app/core/data/default-tokens.ts

import { PaletteGenerationService } from '../services/palette-generation.service';
import { IDesignTokens } from './contracts/design-tokens.interface';
import { primitiveBaseColors } from './primitives/primitive-base-colors';
import { primitiveShadows } from './primitives/primitive-shadows';
import { primitiveSpacing } from './primitives/primitive-spacing';
import { primitiveTypography } from './primitives/primitive-typography';
import { semanticColors } from './semantics/semantic-colors';
import { semanticShadows } from './semantics/semantic-shadows';
import { semanticSpacing } from './semantics/semantic-spacing';
import { semanticTypography } from './semantics/semantic-typography';

/**
 * Constrói o objeto de estado inicial completo para os Design Tokens.
 * 
 * Esta função é a única fonte da verdade para a criação do estado de design
 * padrão da aplicação. Ela agrega primitivos, gera paletas de cores dinamicamente
 * e os combina com as decisões semânticas.
 *
 * @param paletteGenerator Uma instância do PaletteGenerationService para gerar as paletas de cores.
 * @returns Um objeto IDesignTokens completo com o estado de design padrão.
 */
export const buildDefaultTokens = (paletteGenerator: PaletteGenerationService): IDesignTokens => {
  // 1. Gera as paletas de cores completas a partir das cores base primitivas.
  const generatedColors: { [key: string]: { [key: string]: string } } = {};
  for (const colorName in primitiveBaseColors) {
    const baseColor = primitiveBaseColors[colorName as keyof typeof primitiveBaseColors];
    if (baseColor && baseColor['500']) {
      generatedColors[colorName] = paletteGenerator.generatePalette(baseColor['500']);
    }
  }

  // 2. Monta o objeto de tokens completo.
  const defaultTokens: IDesignTokens = {
    primitives: {
      colors: generatedColors,
      spacing: primitiveSpacing,
      typography: primitiveTypography,
      shadows: primitiveShadows,
    },
    semantics: {
      colors: semanticColors,
      typography: semanticTypography,
      spacing: semanticSpacing,
      shadows: semanticShadows,
    },
  };

  return defaultTokens;
};
