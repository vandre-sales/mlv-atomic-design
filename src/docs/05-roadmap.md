# Roadmap de Desenvolvimento `mlv-atomic-design`: Missão Gênesis
**ID do Roadmap:** `05`
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

## 3. Sumário do Roadmap (Hierarquia Canônica)

### Épico 0: A Fundação Inabalável (A "Máquina Invisível" - Leis 1 & 2)
*Propósito: Construir o sistema nervoso central e os serviços de contexto global. O resultado é um esqueleto de aplicação reativo, mas sem UI de Produto.*

#### Parte 0.1: Arquitetura de Microsserviços (Lei 1 - Motor de Estilo)

##### Tarefa 0.1.1: Implementar `PersistenceService` (I/O com `localStorage`).
##### Tarefa 0.1.2: Implementar `TokenStateService` (O "Cofre" - `signal()` SSoT).
##### Tarefa 0.1.3: Implementar `TokenResolverService` (O "Dicionário" - Resolução de Alias).
##### Tarefa 0.1.4: Implementar `CssGeneratorService` (A "Fábrica" - Geração de String CSS, incluindo a blindagem `--mlv-`).
##### Tarefa 0.1.5: Implementar `StyleInjectorService` (O "Injetor" - Manipulação do DOM).
##### Tarefa 0.1.6: Implementar `DesignTokenService` (O "Maestro" - `effect()` orquestrador).
##### Tarefa 0.1.7: Implementar `PaletteGenerationService` (Lógica de Geração Dinâmica).
##### Tarefa 0.1.8: Implementar `TokenOrchestratorService` (A "Aduana" - Camada de Lógica de Negócios).

#### Parte 0.2: Definição do DNA (A Fonte da Verdade)

##### Tarefa 0.2.1: Definir os Contratos de Dados (`design-tokens.interface.ts`).
##### Tarefa 0.2.2: Criar arquivos de "Sementes" Primitivas (`primitive-base-colors.ts`, `primitive-spacing.ts`).
##### Tarefa 0.2.3: Criar arquivos de "Decisões" Semânticas (`semantic-colors.ts`, `semantic-typography.ts`).
##### Tarefa 0.2.4: Criar o Agregador Puro (`default-tokens.ts`).
##### Tarefa 0.2.5: Integrar a Geração Dinâmica de Paletas no `TokenStateService` (hidratação inicial).

#### Parte 0.3: Serviços de Contexto Global (Lei 2)

##### Tarefa 0.3.1: Implementar `ThemeService` (Troca de tema Claro/Escuro via classe no `<body>`).
##### Tarefa 0.3.2: Implementar `ResponsivenessService` (Consumo do `BreakpointObserver` do CDK).
##### Tarefa 0.3.3: Implementar `I18nService` (Carregamento de traduções e `signal()` de idioma).
##### Tarefa 0.3.4: Configurar `provideAppInitializer` para carregar `I18nService` (o Motor de Estilo *não* deve estar no `APP_INITIALIZER`).

#### Parte 0.4: Cobertura de Testes da Fundação

##### Tarefa 0.4.1: Criar testes unitários para `PaletteGenerationService` (lógica pura).
##### Tarefa 0.4.2: Criar testes unitários para `TokenResolverService` (lógica pura).
##### Tarefa 0.4.3: Criar testes de integração para o pipeline de microsserviços (simular mutação no `TokenOrchestrator` e validar o `StyleInjector`).
##### Tarefa 0.4.4: Criar testes para os serviços de contexto (`ThemeService`, `ResponsivenessService`, `I18nService`).

---

### Épico 1: A Forja (A "Ferramenta" - Épicos 1 & 2 do Conceito)
*Propósito: Construir a UI da Ferramenta (os "Laboratórios") que permite a visualização e mutação do DNA (Tokens) definido no Épico 0.*

#### Parte 1.1: UI dos Laboratórios de Tokens

##### Tarefa 1.1.1: Construir a página de visualização da Paleta Primitiva (consumindo o `TokenStateService`).
##### Tarefa 1.1.2: Construir a página de visualização de Tokens Semânticos.
##### Tarefa 1.1.3: Construir o `EditorPopoverComponent` (o contêiner flutuante).

#### Parte 1.2: Componentes da Ferramenta de Edição

##### Tarefa 1.2.1: Implementar `ColorEditorComponent` (seletor de cor nativo).
##### Tarefa 1.2.2: Implementar `VisualColorEditorComponent` (seletor visual de paleta).
##### Tarefa 1.2.3: Implementar `TextStyleEditorComponent` (editor de tipografia).
##### Tarefa 1.2.4: Implementar `AliasEditorComponent` (editor de alias genérico).

#### Parte 1.3: Conexão da Ferramenta (Princípio da Dualidade)

##### Tarefa 1.3.1: Implementar a `EditableTokenDirective` (A "Ponte" que abre o Popover).
##### Tarefa 1.3.2: Conectar todos os componentes de edição (Parte 1.2) exclusivamente ao `TokenOrchestratorService` (A "Aduana").
##### Tarefa 1.3.3: Implementar o `TokenEditGuardService` para bloquear a edição de tokens não-editáveis (ex: tons `.100` gerados dinamicamente).

---

### Épico 2: A Biblioteca Atômica (O "Produto" - Lei 3)
*Propósito: Construir a biblioteca de componentes puros (`components/design/`) que consomem o Motor de Estilo.*

#### Parte 2.1: Implementação do Protocolo de Estilização

##### Tarefa 2.1.1: Atualizar o `CssGeneratorService` (Épico 0) para incluir a lógica de `generateButtonStyles`.
##### Tarefa 2.1.2: Atualizar o `CssGeneratorService` para `generateCardStyles`.
##### Tarefa 2.1.3: Atualizar o `CssGeneratorService` para `generateMarkdownStyles`.

#### Parte 2.2: Construção dos Átomos (Atoms)

##### Tarefa 2.2.1: Construir `ButtonComponent` (puro, com `hostClasses` e `<ng-content>`).
##### Tarefa 2.2.2: Construir `IconComponent` (puro, via `mask-image`).
##### Tarefa 2.2.3: *(...outros átomos: Input, Label, Checkbox...)*

#### Parte 2.3: Composição das Moléculas (Molecules)

##### Tarefa 2.3.1: Construir `StepperComponent`.
##### Tarefa 2.3.2: Construir `TypographyCardComponent` (Laboratório Interativo).
##### Tarefa 2.3.3: *(...outras moléculas: SearchForm, Alert...)*

#### Parte 2.4: Orquestração dos Organismos (Organisms)

##### Tarefa 2.4.1: Construir `HeaderComponent` (consumindo tokens de `background-secondary`).
##### Tarefa 2.4.2: Construir `SidebarComponent`.
##### Tarefa 2.4.3: Construir `FooterComponent`.
##### Tarefa 2.4.4: *(...outros organismos: Card, DataTable...)*

---

### Épico 3: A Camada de Inteligência e Entrega (O "Guardião" - Lei 4)
*Propósito: Implementar as ferramentas de validação de qualidade (Acessibilidade) e a funcionalidade de entrega (Exportar).*

#### Parte 3.1: O Guardião da Acessibilidade

##### Tarefa 3.1.1: Implementar o `AccessibilityService` (lógica de cálculo de contraste).
##### Tarefa 3.1.2: Construir a UI de Auditoria de Acessibilidade (lendo os resultados do serviço).
##### Tarefa 3.1.3: Integrar a auditoria de contraste como um "Gatekeeper" no pipeline de CI/CD.

#### Parte 3.2: A Funcionalidade de Entrega

##### Tarefa 3.2.1: Desenvolver a funcionalidade de "Exportar Artefatos".
##### Tarefa 3.2.2: Criar o exportador para `tokens.css` (a string gerada pelo `CssGeneratorService`).
##### Tarefa 3.2.3: Criar o exportador para `tokens.json` (o estado do `TokenStateService`).

#### Parte 3.3: Documentação Final
##### Tarefa 3.3.1: Gerar a documentação final de consumo e o guia de instalação para projetos externos.