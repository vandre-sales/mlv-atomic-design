// src/app/core/data/contracts/design-tokens.interface.ts

// =============================================================================
// INTERFACES DE ESTRUTURA RAIZ
// =============================================================================

/**
 * A estrutura raiz que encapsula todos os design tokens.
 * É a fonte única da verdade para o estado de design da aplicação.
 */
export interface IDesignTokens {
  primitives: IPrimitiveTokens;
  semantics: ISemanticTokens;
}

/**
 * Agrupa todos os tokens primitivos.
 * Primitivos são os átomos brutos, sem contexto de aplicação.
 */
export interface IPrimitiveTokens {
  colors: { [paletteName: string]: { [shade: string]: string } };
  spacing: { [key: string]: string };
  typography: IPrimitiveTypography;
  shadows: { [key: string]: string };
}

/**
 * Agrupa todos os tokens semânticos.
 * Semânticos dão propósito e contexto aos primitivos.
 */
export interface ISemanticTokens {
  colors: SemanticColors;
  typography: SemanticTypography;
  spacing: SemanticSpacing;
  shadows: SemanticShadows;
}

// =============================================================================
// INTERFACES DE VALOR E DESCRIÇÃO (Estrutura do Token)
// =============================================================================

/**
 * Estrutura genérica para um único token semântico, contendo seu valor
 * (que pode ser um alias para um primitivo) e uma descrição.
 */
export interface ISemanticToken<T> {
  value: T;
  description: string;
}

// =============================================================================
// INTERFACES DE CONTRATOS SEMÂNTICOS DETALHADOS
// =============================================================================

// --- Semântica de Cores ---
export type SemanticColors = {
  [key in SemanticColorKeys]: ISemanticToken<string>;
};

export type SemanticColorKeys = 
  | 'color-background-primary'
  | 'color-background-secondary'
  | 'color-background-tertiary'
  | 'color-text-primary'
  | 'color-text-secondary'
  | 'color-text-accent'
  | 'color-border-primary'
  | 'color-border-accent'
  | 'color-feedback-success'
  | 'color-feedback-error'
  | 'color-feedback-warning';

// --- Semântica de Tipografia ---
export type SemanticTypography = {
  [key in SemanticTypographyKeys]: ISemanticToken<ITypographyValue>;
};

export type SemanticTypographyKeys = 
  | 'typography-heading-1'
  | 'typography-heading-2'
  | 'typography-body'
  | 'typography-caption';

export interface ITypographyValue {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

// --- Semântica de Espaçamento ---
export type SemanticSpacing = {
  [key in SemanticSpacingKeys]: ISemanticToken<string>;
};

export type SemanticSpacingKeys = 
  | 'spacing-container-padding'
  | 'spacing-element-margin'
  | 'spacing-item-gap';

// --- Semântica de Sombras ---
export type SemanticShadows = {
  [key in SemanticShadowsKeys]: ISemanticToken<string>;
};

export type SemanticShadowsKeys = 
  | 'shadow-card'
  | 'shadow-modal'
  | 'shadow-interactive-element';


// =============================================================================
// INTERFACES DE CONTRATOS PRIMITIVOS DETALHADOS
// =============================================================================

export interface IPrimitiveTypography {
  font: { [key: string]: string };
  size: { [key: string]: { [key: string]: string } };
  weight: { [key: string]: string };
  lineHeight: { [key: string]: string };
}
