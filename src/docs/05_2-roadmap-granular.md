# Roadmap Granular do Épico 2: A Biblioteca Atômica (O "Produto" - Lei 3)
**ID do Roadmap:** `05_2`
**Versão:** 1.0 (Canônica, Alinhada ao Fluxo)

## 1. Objetivo do Projeto

Construir a fundação canônica do `mlv-atomic-design`, um ecossistema de Design System reativo. O objetivo não é uma biblioteca de componentes, mas uma "máquina" de engenharia que impõe consistência, qualidade e reatividade em tempo real, governada por um pipeline de microsserviços de responsabilidade única.

---

## 2. Conceito de Pronto do Projeto

O `mlv-atomic-design` será considerado "Pronto" (v1.0) quando todos os critérios a seguir forem verificáveis:

* **Motor Reativo Funcional (Lei 1):** O pipeline de microsserviços (Estado, Orquestração, Geração, Injeção) está implementado e atualiza a UI globalmente em tempo real via `effect()`, em resposta a mutações no `signal` de estado.
* **Serviços de Contexto Operacionais (Lei 2):** Os serviços globais de Multi-Tema (Claro/Escuro), Responsividade (Angular CDK) e Internacionalização (i18n) estão implementados e funcionais.
* **Biblioteca Atômica Pura (Lei 3):** A biblioteca de componentes (Átomos, Moléculas, Organismos) está completa. Cada componente é comprovadamente "puro" (agnóstico de estado, aparência controlada por classes de identidade) e sua aparência é 100% governada pelo Motor de Estilo.
* **Geração Dinâmica de Dados:** A lógica de geração (ex: `PaletteGenerationService`) está funcional, eliminando a necessidade de arquivos de dados estáticos volumosos.
* **Guardiões de Qualidade Ativos (Lei 4):** A camada de auditoria (Acessibilidade) está integrada e o pipeline de CI/CD está configurado para falhar em caso de violações de contraste.
* **Funcionalidade de Exportação Implementada:** A capacidade de exportar artefatos de engenharia versionados (`.css`, `.json`) está funcional.

---

## 3. Roadmap (Hierarquia Canônica)

### Épico 2: A Biblioteca Atômica (O "Produto" - Lei 3)
*Propósito: Construir a biblioteca de componentes puros (`components/design/`) que consomem o Motor de Estilo.*

#### Parte 2.1: Implementação do Protocolo de Estilização

##### Tarefa 2.1.1: Atualizar o `CssGeneratorService` (Épico 0) para incluir a lógica de `generateButtonStyles`.
- Passo 2.1.1.1: Criar o método privado `generateButtonStyles(tokens: IDesignTokens): string`.
- Passo 2.1.1.2: Implementar a geração de regras CSS para `.ds-button` (base), variantes (`.primary`, `.secondary`) e tamanhos (`.sm`, `.md`, `.lg`).
- Passo 2.1.1.3: Garantir que as regras consumam *apenas* variáveis semânticas (ex: `var(--color-button-primary-background)`).
- Passo 2.1.1.4: Chamar `generateButtonStyles` de dentro do método principal `generateCssString`.

##### Tarefa 2.1.2: Atualizar o `CssGeneratorService` para `generateCardStyles`.
- Passo 2.1.2.1: Criar o método privado `generateCardStyles(tokens: IDesignTokens): string`.
- Passo 2.1.2.2: Implementar a geração de regras CSS para a classe de identidade `.ds-card` (ex: `padding`, `border-width`, `border-radius`, `box-shadow`).
- Passo 2.1.2.3: Garantir que as regras consumam *apenas* variáveis semânticas (ex: `var(--space-container-padding)`, `var(--shadow-card)`).
- Passo 2.1.2.4: Chamar `generateCardStyles` de dentro do método principal `generateCssString`.

##### Tarefa 2.1.3: Atualizar o `CssGeneratorService` para `generateMarkdownStyles`.
- Passo 2.1.3.1: Criar o método privado `generateMarkdownStyles(tokens: IDesignTokens): string`.
- Passo 2.1.3.2: Implementar a geração de regras CSS para tags HTML puras (ex: `h1`, `p`, `blockquote`, `ul`, `li`).
- Passo 2.1.3.3: Garantir que as regras consumam *apenas* tokens semânticos (ex: `var(--typography-heading-h1-fontFamily)`, `var(--elements-blockquote-border-left-width)`).
- Passo 2.1.3.4: Chamar `generateMarkdownStyles` de dentro do método principal `generateCssString`.

#### Parte 2.2: Construção dos Átomos (Atoms)

##### Tarefa 2.2.1: Construir `ButtonComponent` (puro, com `hostClasses` e `<ng-content>`).
- Passo 2.2.1.1: Criar o `ButtonComponent` em `components/design/atoms/`.
- Passo 2.2.1.2: Definir `inputs()` para `variant` e `size`.
- Passo 2.2.1.3: Implementar `hostClasses = computed(() => \`ds-button ${this.variant()} ${this.size()}\`);`.
- Passo 2.2.1.4: O template (`.html`) deve conter *apenas* `<ng-content></ng-content>`.
- Passo 2.2.1.5: Validar que o componente não possui `.scss` e não usa classes de aparência do Tailwind.

##### Tarefa 2.2.2: Construir `IconComponent` (puro, via `mask-image`).
- Passo 2.2.2.1: Criar o `IconComponent` em `components/design/atoms/`.
- Passo 2.2.2.2: Implementar a arquitetura de "Ícones como Tokens" (definida no Épico 0, Tarefa 0.1.4 e 0.2.2).
- Passo 2.2.2.3: O template (`.html`) deve ser um `<span>` estilizado com `[style.mask-image]="'var(--icon-' + name() + ')'"`.
- Passo 2.2.2.4: Garantir que o `IconComponent` herde a cor via `currentColor`.

##### Tarefa 2.2.3: *(...outros átomos: Input, Label, Checkbox...)*
- Passo 2.2.3.1: Repetir o padrão de "Identidade vs. Estilo" para todos os outros átomos.

#### Parte 2.3: Composição das Moléculas (Molecules)

##### Tarefa 2.3.1: Construir `StepperComponent`.
- Passo 2.3.1.1: Criar o `StepperComponent` em `components/design/molecules/`.
- Passo 2.3.1.2: Construir a UI usando Átomos (ex: `ButtonComponent`).
- Passo 2.3.1.3: Garantir que toda a aparência (espaçamento, cores) seja governada por tokens (`[style]` bindings).

##### Tarefa 2.3.2: Construir `TypographyCardComponent` (Laboratório Interativo).
- Passo 2.3.2.1: Criar o `TypographyCardComponent` em `components/design/molecules/`.
- Passo 2.3.2.2: Compor a UI usando Átomos (ex: `TextStyleShowcaseComponent`) e Moléculas (ex: `StepperComponent`).
- Passo 2.3.2.3: Conectar os controles de edição ao `TokenOrchestratorService` (Aduana).
- Passo 2.3.2.4: Garantir aderência total ao Protocolo de Estilização Inviolável (Lei nº 1).

##### Tarefa 2.3.3: *(...outras moléculas: SearchForm, Alert...)*
- Passo 2.3.3.1: Repetir o padrão de composição pura para todas as outras moléculas.

#### Parte 2.4: Orquestração dos Organismos (Organisms)

##### Tarefa 2.4.1: Construir `HeaderComponent` (consumindo tokens de `background-secondary`).
- Passo 2.4.1.1: Criar o `HeaderComponent` em `components/design/organisms/`.
- Passo 2.4.1.2: Compor a UI usando Átomos e Moléculas.
- Passo 2.4.1.3: Conectar o `ThemeService` e `I18nService` aos controles de troca.
- Passo 2.4.1.4: Garantir que a aparência (ex: `background-color`, `border-color`) seja governada por tokens (ex: `var(--color-background-secondary)`).

##### Tarefa 2.4.2: Construir `SidebarComponent`.
- Passo 2.4.2.1: Criar o `SidebarComponent` em `components/design/organisms/`.
- Passo 2.4.2.2: Conectar ao `ResponsivenessService` (Lei 2) para comportamento de *drawer* móvel vs. *sidebar* estática.
- Passo 2.4.2.3: Garantir que a aparência (ex: `width`, `background-color`) seja governada por tokens.

##### Tarefa 2.4.3: Construir `FooterComponent`.
- Passo 2.4.3.1: Criar o `FooterComponent` em `components/design/organisms/`.
- Passo 2.4.3.2: Garantir que a aparência seja governada por tokens.

##### Tarefa 2.4.4: *(...outros organismos: Card, DataTable...)*
- Passo 2.4.4.1: Repetir o padrão de composição pura para todos os outros organismos.