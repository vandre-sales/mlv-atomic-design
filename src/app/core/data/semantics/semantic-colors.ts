// src/app/core/data/semantics/semantic-colors.ts

import { SemanticColors } from '../contracts/design-tokens.interface';

/**
 * Decisões Semânticas de Cores
 * 
 * Mapeia as cores primitivas para seus significados e usos na aplicação.
 * Por exemplo, 'primary' pode ser mapeado para 'blue-500'.
 * 
 * A estrutura aqui deve seguir a interface SemanticColors.
 */
export const semanticColors: SemanticColors = {
  // Cores de Fundo
  'color-background-primary': {
    value: '{neutral.100}',
    description: 'Cor de fundo principal da aplicação.'
  },
  'color-background-secondary': {
    value: '{neutral.200}',
    description: 'Cor de fundo para elementos secundários.'
  },
  'color-background-tertiary': {
    value: '{neutral.300}',
    description: 'Cor de fundo para elementos terciários.'
  },

  // Cores de Texto
  'color-text-primary': {
    value: '{neutral.900}',
    description: 'Cor de texto principal.'
  },
  'color-text-secondary': {
    value: '{neutral.700}',
    description: 'Cor de texto para informações secundárias.'
  },
  'color-text-accent': {
    value: '{blue.500}',
    description: 'Cor de texto para links e elementos de destaque.'
  },

  // Cores de Borda
  'color-border-primary': {
    value: '{neutral.400}',
    description: 'Cor de borda padrão.'
  },
  'color-border-accent': {
    value: '{blue.500}',
    description: 'Cor de borda para elementos em foco ou ativos.'
  },
  
  // Cores de Feedback
  'color-feedback-success': {
    value: '{green.500}',
    description: 'Cor para indicar sucesso.'
  },
  'color-feedback-error': {
    value: '{red.500}',
    description: 'Cor para indicar erro.'
  },
  'color-feedback-warning': {
    value: '{yellow.500}',
    description: 'Cor para indicar aviso.'
  }
};
