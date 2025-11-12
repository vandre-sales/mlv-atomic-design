// src/app/core/data/semantics/semantic-spacing.ts

import { SemanticSpacing } from '../contracts/design-tokens.interface';

/**
 * Decisões Semânticas de Espaçamento
 * 
 * Mapeia os espaçamentos primitivos para usos específicos em layouts,
 * como padding de contêineres, margens entre elementos, etc.
 */
export const semanticSpacing: SemanticSpacing = {
  'spacing-container-padding': {
    value: '{spacing.md}',
    description: 'Espaçamento interno padrão para contêineres principais.'
  },
  'spacing-element-margin': {
    value: '{spacing.sm}',
    description: 'Margem padrão entre elementos de interface.'
  },
  'spacing-item-gap': {
    value: '{spacing.xs}',
    description: 'Espaçamento entre itens em um grupo, como ícones ou botões.'
  }
};
