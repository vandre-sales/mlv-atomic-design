// src/app/core/data/semantics/semantic-typography.ts

import { SemanticTypography } from '../contracts/design-tokens.interface';

/**
 * Decisões Semânticas de Tipografia
 * 
 * Mapeia as primitivas de tipografia para seus usos específicos na aplicação,
 * como títulos, corpo de texto, legendas, etc.
 */
export const semanticTypography: SemanticTypography = {
  'typography-heading-1': {
    value: {
      fontFamily: '{font.sans}',
      fontSize: '{size.font.xxl}',
      fontWeight: '{weight.bold}',
      lineHeight: '{lineHeight.tight}',
    },
    description: 'Estilo para o título principal da página (H1).'
  },
  'typography-heading-2': {
    value: {
      fontFamily: '{font.sans}',
      fontSize: '{size.font.xl}',
      fontWeight: '{weight.bold}',
      lineHeight: '{lineHeight.tight}',
    },
    description: 'Estilo para títulos de seção secundários (H2).'
  },
  'typography-body': {
    value: {
      fontFamily: '{font.sans}',
      fontSize: '{size.font.base}',
      fontWeight: '{weight.normal}',
      lineHeight: '{lineHeight.normal}',
    },
    description: 'Estilo padrão para o corpo de texto.'
  },
  'typography-caption': {
    value: {
      fontFamily: '{font.sans}',
      fontSize: '{size.font.sm}',
      fontWeight: '{weight.light}',
      lineHeight: '{lineHeight.normal}',
    },
    description: 'Estilo para legendas e textos de menor importância.'
  }
};
