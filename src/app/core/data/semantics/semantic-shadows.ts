// src/app/core/data/semantics/semantic-shadows.ts

import { SemanticShadows } from '../contracts/design-tokens.interface';

/**
 * Decisões Semânticas de Sombras
 * 
 * Define a aplicação das sombras primitivas em componentes, criando
 * uma hierarquia visual e profundidade na interface.
 */
export const semanticShadows: SemanticShadows = {
  'shadow-card': {
    value: '{shadow.md}',
    description: 'Sombra padrão para componentes tipo card.'
  },
  'shadow-modal': {
    value: '{shadow.lg}',
    description: 'Sombra para elementos elevados como modais e pop-ups.'
  },
  'shadow-interactive-element': {
    value: '{shadow.sm}',
    description: 'Sombra sutil para elementos interativos como botões.'
  }
};
