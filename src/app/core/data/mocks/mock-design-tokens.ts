// src/app/core/data/mocks/mock-design-tokens.ts

import { IDesignTokens, IPrimitiveTypography } from '../contracts/design-tokens.interface';

// Para garantir que o mock de primitivos esteja alinhado, importamos o real
import { primitiveTypography } from '../primitives/primitive-typography';

/**
 * Um objeto de mock completo e válido que satisfaz o contrato IDesignTokens.
 * Use este mock em todos os testes unitários que precisam de um estado de
 * design tokens para garantir consistência e evitar duplicação.
 */
export const mockDesignTokens: IDesignTokens = {
  primitives: {
    colors: {
      blue: { '500': '#3b82f6' },
      green: { '500': '#22c55e' },
      red: { '500': '#ef4444' },
      yellow: { '500': '#eab308' },
      neutral: {
        '100': '#f3f4f6',
        '200': '#e5e7eb',
        '300': '#d1d5db',
        '400': '#9ca3af',
        '900': '#111827',
      },
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
    },
    // Usa a implementação real para garantir consistência
    typography: primitiveTypography, 
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
  },
  semantics: {
    // --- Cores ---
    colors: {
      'color-background-primary': { value: '{neutral.100}', description: 'Mock' },
      'color-background-secondary': { value: '{neutral.200}', description: 'Mock' },
      'color-background-tertiary': { value: '{neutral.300}', description: 'Mock' },
      'color-text-primary': { value: '{neutral.900}', description: 'Mock' },
      'color-text-secondary': { value: '{neutral.700}', description: 'Mock' },
      'color-text-accent': { value: '{blue.500}', description: 'Mock' },
      'color-border-primary': { value: '{neutral.400}', description: 'Mock' },
      'color-border-accent': { value: '{blue.500}', description: 'Mock' },
      'color-feedback-success': { value: '{green.500}', description: 'Mock' },
      'color-feedback-error': { value: '{red.500}', description: 'Mock' },
      'color-feedback-warning': { value: '{yellow.500}', description: 'Mock' },
    },
    // --- Tipografia ---
    typography: {
      'typography-heading-1': { value: { fontFamily: '{font.sans}', fontSize: '{size.font.xxl}', fontWeight: '{weight.bold}', lineHeight: '{lineHeight.tight}' }, description: 'Mock' },
      'typography-heading-2': { value: { fontFamily: '{font.sans}', fontSize: '{size.font.xl}', fontWeight: '{weight.bold}', lineHeight: '{lineHeight.tight}' }, description: 'Mock' },
      'typography-body': { value: { fontFamily: '{font.sans}', fontSize: '{size.font.base}', fontWeight: '{weight.normal}', lineHeight: '{lineHeight.normal}' }, description: 'Mock' },
      'typography-caption': { value: { fontFamily: '{font.sans}', fontSize: '{size.font.sm}', fontWeight: '{weight.light}', lineHeight: '{lineHeight.normal}' }, description: 'Mock' },
    },
    // --- Espaçamento ---
    spacing: {
      'spacing-container-padding': { value: '{spacing.md}', description: 'Mock' },
      'spacing-element-margin': { value: '{spacing.sm}', description: 'Mock' },
      'spacing-item-gap': { value: '{spacing.xs}', description: 'Mock' },
    },
    // --- Sombras ---
    shadows: {
      'shadow-card': { value: '{shadow.md}', description: 'Mock' },
      'shadow-modal': { value: '{shadow.lg}', description: 'Mock' },
      'shadow-interactive-element': { value: '{shadow.sm}', description: 'Mock' },
    },
  },
};
