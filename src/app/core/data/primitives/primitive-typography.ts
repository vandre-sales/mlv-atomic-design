// src/app/core/data/primitives/primitive-typography.ts

import { IPrimitiveTypography } from '../contracts/design-tokens.interface';

/**
 * Primitivos de Tipografia
 * 
 * Define os valores atômicos para construção de estilos de texto.
 * Estes são os blocos de construção brutos, como famílias de fonte,
 * escalas de tamanho, pesos e alturas de linha.
 */
export const primitiveTypography: IPrimitiveTypography = {
  font: {
    sans: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  size: {
    font: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem',  // 20px
      xxl: '1.5rem', // 24px
    },
  },
  weight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },
};
