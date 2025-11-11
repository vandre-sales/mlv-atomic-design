# Status do Projeto: MLV Atomic DS (Roadmap Canônico 05)

## Legenda de Status
- [✅] **Concluído:** A tarefa foi finalizada e validada.
- [⏳] **Em Progresso:** A tarefa está sendo executada ativamente.
- [🟨] **Pendente:** A tarefa está planejada, mas ainda não foi iniciada.
- [🟥] **Bloqueado:** Há um impedimento que precisa ser resolvido.
- [⬜] **Cancelado:** A tarefa não é mais necessária.

---

## Fases do Projeto

### [🟨] Fase 0: A Fundação Inabalável (A "Máquina Invisível" - Leis 1 & 2)
*Propósito: Construir o sistema nervoso central e os serviços de contexto global. O resultado é um esqueleto de aplicação reativo, mas sem UI de Produto.*

#### [🟨] Parte 0.1: Arquitetura de Microsserviços (Lei 1 - Motor de Estilo)

- [🟨] **Tarefa 0.1.1:** Implementar `PersistenceService` (I/O com `localStorage`).
  - [🟨] **Passo 0.1.1.1:** Criar o `PersistenceService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.1.2:** Implementar o método `setItem(key: string, value: any)`.
  - [🟨] **Passo 0.1.1.3:** Implementar o método `getItem<T>(key: string): T | null`.
  - [🟨] **Passo 0.1.1.4:** Implementar o método `removeItem(key: string)`.
  - [🟨] **Passo 0.1.1.5:** Garantir que o serviço utilize `localStorage` e trate exceções (ex: modo `private`).

- [🟨] **Tarefa 0.1.2:** Implementar `TokenStateService` (O "Cofre" - `signal()` SSoT).
  - [🟨] **Passo 0.1.2.1:** Criar o `TokenStateService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.2.2:** Definir a `signal()` privada: `private tokens = signal<IDesignTokens>({});`.
  - [🟨] **Passo 0.1.2.3:** Expor a `signal()` pública: `public readonly tokens = this.tokens.asReadonly();`.
  - [🟨] **Passo 0.1.2.4:** Injetar `PersistenceService`.
  - [🟨] **Passo 0.1.2.5:** Implementar o construtor para chamar `hydrateState()`.
  - [🟨] **Passo 0.1.2.6:** Implementar `hydrateState()`: tentar ler do `PersistenceService` (`getItem`). Se falhar, chamar `buildDefaultTokens()` (a ser criado na Parte 0.2).
  - [🟨] **Passo 0.1.2.7:** Implementar o método `updateTokens(newTokens: IDesignTokens)` (que chama `this.tokens.set(newTokens)`).
  - [🟨] **Passo 0.1.2.8:** Implementar um `effect()` que observa `this.tokens()` e chama `PersistenceService.setItem()` para persistir mudanças.

- [🟨] **Tarefa 0.1.3:** Implementar `TokenResolverService` (O "Dicionário" - Resolução de Alias).
  - [🟨] **Passo 0.1.3.1:** Criar o `TokenResolverService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.3.2:** Implementar o método `resolveTokenAlias(alias: string, tokens: IDesignTokens)` como uma função pura.
  - [🟨] **Passo 0.1.3.3:** A lógica deve traduzir um alias (ex: `'blue.500'`) em sua referência de variável CSS privada (ex: `'var(--mlv-color-blue-500)'`).

- [🟨] **Tarefa 0.1.4:** Implementar `CssGeneratorService` (A "Fábrica" - Geração de String CSS, incluindo a blindagem `--mlv-`).
  - [🟨] **Passo 0.1.4.1:** Criar o `CssGeneratorService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.4.2:** Implementar o método público `generateCssString(tokens: IDesignTokens): string`.
  - [🟨] **Passo 0.1.4.3:** Implementar o método privado `generatePrimitiveVariables(tokens: IDesignTokens)` (Camada Privada `--mlv-`).
  - [🟨] **Passo 0.1.4.4:** Implementar o método privado `generateSemanticVariables(tokens: IDesignTokens, resolver: TokenResolverService)` (Camada Pública `--color-`, usando o resolver).
  - [🟨] **Passo 0.1.4.5:** Implementar métodos privados de geração de estilo de componente (ex: `generateButtonStyles`, `generateMarkdownStyles`), que serão expandidos no Épico 2.
  - [🟨] **Passo 0.1.4.6:** Garantir que `generateCssString` concatene todas as strings geradas.

- [🟨] **Tarefa 0.1.5:** Implementar `StyleInjectorService` (O "Injetor" - Manipulação do DOM).
  - [🟨] **Passo 0.1.5.1:** Criar o `StyleInjectorService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.5.2:** Implementar o método `injectCss(cssString: string, id: string)`.
  - [🟨] **Passo 0.1.5.3:** A lógica deve buscar um `<style>` elemento pelo `id` no `<head>`, criá-lo se não existir, e atualizar seu `textContent` com `cssString`.

- [🟨] **Tarefa 0.1.6:** Implementar `DesignTokenService` (O "Maestro" - `effect()` orquestrador).
  - [🟨] **Passo 0.1.6.1:** Criar o `DesignTokenService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.6.2:** Injetar `TokenStateService`, `CssGeneratorService` e `StyleInjectorService`.
  - [🟨] **Passo 0.1.6.3:** Implementar o `effect()` principal no construtor.
  - [🟨] **Passo 0.1.6.4:** O `effect` deve: 1. Obter `currentTokens = this.tokenState.tokens()`. 2. Gerar `cssString = this.cssGenerator.generateCssString(currentTokens)`. 3. Injetar `this.styleInjector.injectCss(cssString, 'design-tokens')`.

- [🟨] **Tarefa 0.1.7:** Implementar `PaletteGenerationService` (Lógica de Geração Dinâmica).
  - [🟨] **Passo 0.1.7.1:** Criar o `PaletteGenerationService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.7.2:** Adicionar `d3-color` como dependência.
  - [🟨] **Passo 0.1.7.3:** Implementar o método `generatePalette(baseColorHex: string): { [key: string]: string }`.
  - [🟨] **Passo 0.1.7.4:** A lógica deve gerar os 11 tons (50-950) a partir da cor base (tom 500) usando `d3-color` para interpolação.

- [🟨] **Tarefa 0.1.8:** Implementar `TokenOrchestratorService` (A "Aduana" - Camada de Lógica de Negócios).
  - [🟨] **Passo 0.1.8.1:** Criar o `TokenOrchestratorService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.1.8.2:** Injetar `TokenStateService` e `PaletteGenerationService`.
  - [🟨] **Passo 0.1.8.3:** Implementar o método `updateTokenValue(path: string, newValue: any)`.
  - [🟨] **Passo 0.1.8.4:** Implementar a lógica de negócios: Se o `path` for uma cor "semente" (ex: `primitives.colors.blue.500`), chamar o `PaletteGenerationService` para gerar a paleta completa e atualizar o estado (via `TokenStateService.updateTokens`).
  - [🟨] **Passo 0.1.8.5:** Se for qualquer outro `path`, apenas atualizar o valor correspondente no objeto de tokens e chamar `TokenStateService.updateTokens`.

#### [🟨] Parte 0.2: Definição do DNA (A Fonte da Verdade)

- [🟨] **Tarefa 0.2.1:** Definir os Contratos de Dados (`design-tokens.interface.ts`).
  - [🟨] **Passo 0.2.1.1:** Criar `design-tokens.interface.ts`.
  - [🟨] **Passo 0.2.1.2:** Definir as interfaces para `IDesignTokens`, `IPrimitiveTokens`, `ISemanticTokens`, etc.

- [🟨] **Tarefa 0.2.2:** Criar arquivos de "Sementes" Primitivas (`primitive-base-colors.ts`, `primitive-spacing.ts`).
  - [🟨] **Passo 0.2.2.1:** Criar `primitive-base-colors.ts` e exportar apenas os tons `500` (cores mestras).
  - [🟨] **Passo 0.2.2.2:** Criar `primitive-spacing.ts` e exportar a escala de espaçamento.
  - [🟨] **Passo 0.2.2.3:** Criar `primitive-typography.ts`, `primitive-shadows.ts`, etc.

- [🟨] **Tarefa 0.2.3:** Criar arquivos de "Decisões" Semânticas (`semantic-colors.ts`, `semantic-typography.ts`).
  - [🟨] **Passo 0.2.3.1:** Criar `semantic-colors.ts` e exportar os mapeamentos (ex: `backgroundPrimary: 'white'`).
  - [🟨] **Passo 0.2.3.2:** Criar `semantic-typography.ts` e exportar os mapeamentos (ex: `heading1: '...'`).

- [🟨] **Tarefa 0.2.4:** Criar o Agregador Puro (`default-tokens.ts`).
  - [🟨] **Passo 0.2.4.1:** Criar `default-tokens.ts`.
  - [🟨] **Passo 0.2.4.2:** Importar todos os primitivos (sementes) e semânticos.
  - [🟨] **Passo 0.2.4.3:** Exportar uma função `buildDefaultTokens(paletteGenerator: PaletteGenerationService): IDesignTokens`.
  - [🟨] **Passo 0.2.4.4:** A lógica desta função deve usar o `paletteGenerator` para construir as paletas completas a partir das sementes e agregá-las com os tokens semânticos.

- [🟨] **Tarefa 0.2.5:** Integrar a Geração Dinâmica de Paletas no `TokenStateService` (hidratação inicial).
  - [🟨] **Passo 0.2.5.1:** No `TokenStateService` (Tarefa 0.1.2), injetar `PaletteGenerationService`.
  - [🟨] **Passo 0.2.5.2:** Na função `hydrateState()`, quando o `PersistenceService` falhar, chamar `buildDefaultTokens(this.paletteGenerator)` (da Tarefa 0.2.4) para obter o estado inicial.
  - [🟨] **Passo 0.2.5.3:** Definir o estado inicial com `this.tokens.set(...)`.

#### [🟨] Parte 0.3: Serviços de Contexto Global (Lei 2)

- [🟨] **Tarefa 0.3.1:** Implementar `ThemeService` (Troca de tema Claro/Escuro via classe no `<body>`).
  - [🟨] **Passo 0.3.1.1:** Criar `ThemeService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.3.1.2:** Implementar um `signal()` para o tema atual (`light` | `dark`).
  - [🟨] **Passo 0.3.1.3:** Implementar detecção de preferência do SO (`prefers-color-scheme`).
  - [🟨] **Passo 0.3.1.4:** Implementar um `effect()` que aplica/remove a classe `dark` no `document.body` com base no `signal()`.

- [🟨] **Tarefa 0.3.2:** Implementar `ResponsivenessService` (Consumo do `BreakpointObserver` do CDK).
  - [🟨] **Passo 0.3.2.1:** Adicionar `@angular/cdk` ao projeto.
  - [🟨] **Passo 0.3.2.2:** Criar `ResponsivenessService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.3.2.3:** Injetar `BreakpointObserver` do CDK.
  - [🟨] **Passo 0.3.2.4:** Expor um `signal()` (ou `Observable`) com os breakpoints ativos (ex: `isHandset$`).

- [🟨] **Tarefa 0.3.3:** Implementar `I18nService` (Carregamento de traduções e `signal()` de idioma).
  - [🟨] **Passo 0.3.3.1:** Criar `I18nService` (`providedIn: 'root'`).
  - [🟨] **Passo 0.3.3.2:** Implementar um `signal()` para o idioma atual (ex: `en-US`).
  - [🟨] **Passo 0.3.3.3:** Implementar um método `loadLanguage(lang: string): Promise<void>` que usa `fetch()` para carregar o JSON de tradução.
  - [🟨] **Passo 0.3.3.4:** Implementar um `signal()` para as traduções carregadas.
  - [🟨] **Passo 0.3.3.5:** Implementar um `translate(key: string): string` (ou `Pipe`).

- [🟨] **Tarefa 0.3.4:** Configurar `provideAppInitializer` para carregar `I18nService`.
  - [🟨] **Passo 0.3.4.1:** Abrir `app.config.ts`.
  - [🟨] **Passo 0.3.4.2:** Importar `provideAppInitializer` e `inject` do `@angular/core`.
  - [🟨] **Passo 0.3.4.3:** Adicionar aos `providers`: `provideAppInitializer(() => { return inject(I18nService).loadLanguage('en-US'); })`.
  - [🟨] **Passo 0.3.4.4:** Validar que NENHUM serviço do Motor de Estilo (Parte 0.1) está sendo chamado aqui, pois eles devem operar de forma não-bloqueante.

#### [🟨] Parte 0.4: Cobertura de Testes da Fundação

- [🟨] **Tarefa 0.4.1:** Criar testes unitários para `PaletteGenerationService` (lógica pura).
  - [🟨] **Passo 0.4.1.1:** Criar `palette-generation.service.spec.ts`.
  - [🟨] **Passo 0.4.1.2:** Testar se a geração de paleta a partir de uma cor base conhecida retorna os 11 tons esperados.

- [🟨] **Tarefa 0.4.2:** Criar testes unitários para `TokenResolverService` (lógica pura).
  - [🟨] **Passo 0.4.2.1:** Criar `token-resolver.service.spec.ts`.
  - [🟨] **Passo 0.4.2.2:** Testar se a resolução de alias retorna a `var(--mlv-...)` correta.

- [🟨] **Tarefa 0.4.3:** Criar testes de integração para o pipeline de microsserviços.
  - [🟨] **Passo 0.4.3.1:** Criar `design-token.service.spec.ts`.
  - [🟨] **Passo 0.4.3.2:** Fornecer mocks para `CssGeneratorService` e `StyleInjectorService`.
  - [🟨] **Passo 0.4.3.3:** Simular uma mutação no `TokenStateService` (ou `TokenOrchestratorService`).
  - [🟨] **Passo 0.4.3.4:** Usar `fakeAsync` e `tick` (ou `waitForAsync`) para garantir que o `effect()` no `DesignTokenService` dispare.
  - [🟨] **Passo 0.4.3.5:** Verificar se `StyleInjectorService.injectCss` foi chamado com a string esperada do `CssGeneratorService`.

- [🟨] **Tarefa 0.4.4:** Criar testes para os serviços de contexto (`ThemeService`, `ResponsivenessService`, `I18nService`).
  - [🟨] **Passo 0.4.4.1:** Criar `theme.service.spec.ts` e testar a lógica de troca de classe no `document.body`.
  - [🟨] **Passo 0.4.4.2:** Criar `responsiveness.service.spec.ts` (pode exigir `TestBed` do CDK).
  - [🟨] **Passo 0.4.4.3:** Criar `i18n.service.spec.ts` (usando `HttpTestingController` para mockar `fetch()`).

---

### [🟨] Fase 1: A Forja (A "Ferramenta" - Épicos 1 & 2 do Conceito)
*Propósito: Construir a UI da Ferramenta (os "Laboratórios") que permite a visualização e mutação do DNA (Tokens) definido no Épico 0.*

#### [🟨] Parte 1.1: UI dos Laboratórios de Tokens

- [🟨] **Tarefa 1.1.1:** Construir a página de visualização da Paleta Primitiva (consumindo o `TokenStateService`).
  - [🟨] **Passo 1.1.1.1:** Criar o `PrimitiveColorsPageComponent` (ou similar) em `features/pages/`.
  - [🟨] **Passo 1.1.1.2:** Injetar o `TokenStateService` e consumir o `tokens().primitives.colors`.
  - [🟨] **Passo 1.1.1.3:** Renderizar a grade de paletas, similar ao `design-system-magic`.
  - [🟨] **Passo 1.1.1.4:** Implementar o `ColorSwatchComponent` (Átomo) para exibir visualmente cada cor.

- [🟨] **Tarefa 1.1.2:** Construir a página de visualização de Tokens Semânticos.
  - [🟨] **Passo 1.1.2.1:** Criar o `SemanticColorsPageComponent` (ou similar).
  - [🟨] **Passo 1.1.2.2:** Injetar `TokenStateService` e consumir `tokens().colors`.
  - [🟨] **Passo 1.1.2.3:** Renderizar a lista de tokens semânticos (ex: `background-primary`) mostrando seus mapeamentos para `light` e `dark`.
  - [🟨] **Passo 1.1.2.4:** Criar páginas equivalentes para outros domínios de tokens (Spacing, Typography, etc.).

- [🟨] **Tarefa 1.1.3:** Construir o `EditorPopoverComponent` (o contêiner flutuante).
  - [🟨] **Passo 1.1.3.1:** Criar o `EditorPopoverComponent` (Organismo ou Molécula) em `components/tools/`.
  - [🟨] **Passo 1.1.3.2:** Implementar a lógica de posicionamento (consumindo `PositioningService`, a ser criado se necessário, ou `CDK Overlay`).
  - [🟨] **Passo 1.1.3.3:** Injetar `OverlayStateService` (a ser criado) para gerenciar o estado (`activePopover`).
  - [🟨] **Passo 1.1.3.4:** Implementar um `NgSwitch` ou `@switch` para renderizar dinamicamente o editor correto com base no tipo de token.

#### [🟨] Parte 1.2: Componentes da Ferramenta de Edição

- [🟨] **Tarefa 1.2.1:** Implementar `ColorEditorComponent` (seletor de cor nativo).
  - [🟨] **Passo 1.2.1.1:** Criar o `ColorEditorComponent` (Molécula) em `components/tools/editors/`.
  - [🟨] **Passo 1.2.1.2:** Implementar um `input()` para o `tokenPath`.
  - [🟨] **Passo 1.2.1.3:** Renderizar um `<input type="color">`.
  - [🟨] **Passo 1.2.1.4:** No evento `(input)`, chamar `TokenOrchestratorService.updateTokenValue(path, newValue)`.

- [🟨] **Tarefa 1.2.2:** Implementar `VisualColorEditorComponent` (seletor visual de paleta).
  - [🟨] **Passo 1.2.2.1:** Criar o `VisualColorEditorComponent` em `components/tools/editors/`.
  - [🟨] **Passo 1.2.2.2:** Injetar `TokenStateService` para ler `tokens().primitives.colors`.
  - [🟨] **Passo 1.2.2.3:** Renderizar a grade de `swatches` clicáveis.
  - [🟨] **Passo 1.2.2.4:** No `(click)` de um swatch, construir o alias (ex: `'blue.500'`) e chamar `TokenOrchestratorService.updateTokenValue(path, newAlias)`.

- [🟨] **Tarefa 1.2.3:** Implementar `TextStyleEditorComponent` (editor de tipografia).
  - [🟨] **Passo 1.2.3.1:** Criar o `TextStyleEditorComponent` em `components/tools/editors/`.
  - [🟨] **Passo 1.2.3.2:** Implementar controles (`<select>`, `StepperComponent`) para cada propriedade de `ITextStyle`.
  - [🟨] **Passo 1.2.3.3:** Injetar `TokenStateService` para popular as opções dos controles (ex: `tokens().primitives.typography.fontWeight`).
  - [🟨] **Passo 1.2.3.4:** Conectar cada controle ao `TokenOrchestratorService` para atualizações de sub-propriedades (ex: `typography.heading-h1.fontWeight`).

- [🟨] **Tarefa 1.2.4:** Implementar `AliasEditorComponent` (editor de alias genérico).
  - [🟨] **Passo 1.2.4.1:** Criar o `AliasEditorComponent` em `components/tools/editors/`.
  - [🟨] **Passo 1.2.4.2:** Implementar um `<select>` ou `StepperComponent` genérico.
  - [🟨] **Passo 1.2.4.3:** Injetar `TokenStateService` para popular as opções (ex: `tokens().primitives.spacing`).
  - [🟨] **Passo 1.2.4.4:** Conectar o controle ao `TokenOrchestratorService`.

#### [🟨] Parte 1.3: Conexão da Ferramenta (Princípio da Dualidade)

- [🟨] **Tarefa 1.3.1:** Implementar a `EditableTokenDirective` (A "Ponte" que abre o Popover).
  - [🟨] **Passo 1.3.1.1:** Criar a diretiva `EditableTokenDirective` em `core/directives/` (ou `shared/directives/`).
  - [🟨] **Passo 1.3.1.2:** Definir um `input()` para o `tokenPath`.
  - [🟨] **Passo 1.3.1.3:** Injetar `OverlayStateService` (a ser criado) e `ElementRef`.
  - [🟨] **Passo 1.3.1.4:** Implementar um `@HostListener('click')` que chama `overlayStateService.openPopover(path, elementRef)`.

- [🟨] **Tarefa 1.3.2:** Conectar todos os componentes de edição (Parte 1.2) exclusivamente ao `TokenOrchestratorService` (A "Aduana").
  - [🟨] **Passo 1.3.2.1:** Auditar todos os componentes em `components/tools/editors/`.
  - [🟨] **Passo 1.3.2.2:** Verificar se NENHUM editor injeta ou chama o `TokenStateService` para mutações.
  - [🟨] **Passo 1.3.2.3:** Garantir que todas as ações de salvamento sejam delegadas ao `TokenOrchestratorService.updateTokenValue()`.

- [🟨] **Tarefa 1.3.3:** Implementar o `TokenEditGuardService` para bloquear a edição de tokens não-editáveis.
  - [🟨] **Passo 1.3.3.1:** Criar `TokenEditGuardService` (`providedIn: 'root'`).
  - [🟨] **Passo 1.3.3.2:** Injetar `ThemeService` (para lógica de tema `light/dark`).
  - [🟨] **Passo 1.3.3.3:** Implementar `isEditable(tokenPath): Signal<boolean>`.
  - [🟨] **Passo 1.3.3.4:** A lógica deve bloquear tons não-mestre (ex: `primitives.colors.blue.100`) e tokens de tema incorreto (ex: `colors.text-primary.dark` no tema `light`).
  - [🟨] **Passo 1.3.3.5:** A `EditableTokenDirective` (Tarefa 1.3.1) e os componentes de edição (Parte 1.2) devem injetar este serviço e desabilitar a interação (`[disabled]`, `[class.locked]`) se `isEditable` for `false`.

---

### [🟨] Fase 2: A Biblioteca Atômica (O "Produto" - Lei 3)
*Propósito: Construir a biblioteca de componentes puros (`components/design/`) que consomem o Motor de Estilo.*

#### [🟨] Parte 2.1: Implementação do Protocolo de Estilização

- [🟨] **Tarefa 2.1.1:** Atualizar o `CssGeneratorService` (Épico 0) para incluir a lógica de `generateButtonStyles`.
  - [🟨] **Passo 2.1.1.1:** Criar o método privado `generateButtonStyles(tokens: IDesignTokens): string`.
  - [🟨] **Passo 2.1.1.2:** Implementar a geração de regras CSS para `.ds-button` (base), variantes (`.primary`, `.secondary`) e tamanhos (`.sm`, `.md`, `.lg`).
  - [🟨] **Passo 2.1.1.3:** Garantir que as regras consumam *apenas* variáveis semânticas (ex: `var(--color-button-primary-background)`).
  - [🟨] **Passo 2.1.1.4:** Chamar `generateButtonStyles` de dentro do método principal `generateCssString`.

- [🟨] **Tarefa 2.1.2:** Atualizar o `CssGeneratorService` para `generateCardStyles`.
  - [🟨] **Passo 2.1.2.1:** Criar o método privado `generateCardStyles(tokens: IDesignTokens): string`.
  - [🟨] **Passo 2.1.2.2:** Implementar a geração de regras CSS para a classe de identidade `.ds-card` (ex: `padding`, `border-width`, `border-radius`, `box-shadow`).
  - [🟨] **Passo 2.1.2.3:** Garantir que as regras consumam *apenas* variáveis semânticas (ex: `var(--space-container-padding)`, `var(--shadow-card)`).
  - [🟨] **Passo 2.1.2.4:** Chamar `generateCardStyles` de dentro do método principal `generateCssString`.

- [🟨] **Tarefa 2.1.3:** Atualizar o `CssGeneratorService` para `generateMarkdownStyles`.
  - [🟨] **Passo 2.1.3.1:** Criar o método privado `generateMarkdownStyles(tokens: IDesignTokens): string`.
  - [🟨] **Passo 2.1.3.2:** Implementar a geração de regras CSS para tags HTML puras (ex: `h1`, `p`, `blockquote`, `ul`, `li`).
  - [🟨] **Passo 2.1.3.3:** Garantir que as regras consumam *apenas* tokens semânticos (ex: `var(--typography-heading-h1-fontFamily)`, `var(--elements-blockquote-border-left-width)`).
  - [🟨] **Passo 2.1.3.4:** Chamar `generateMarkdownStyles` de dentro do método principal `generateCssString`.

#### [🟨] Parte 2.2: Construção dos Átomos (Atoms)

- [🟨] **Tarefa 2.2.1:** Construir `ButtonComponent` (puro, com `hostClasses` e `<ng-content>`).
  - [🟨] **Passo 2.2.1.1:** Criar o `ButtonComponent` em `components/design/atoms/`.
  - [🟨] **Passo 2.2.1.2:** Definir `inputs()` para `variant` e `size`.
  - [🟨] **Passo 2.2.1.3:** Implementar `hostClasses = computed(() => \`ds-button ${this.variant()} ${this.size()}\`);`.
  - [🟨] **Passo 2.2.1.4:** O template (`.html`) deve conter *apenas* `<ng-content></ng-content>`.
  - [🟨] **Passo 2.2.1.5:** Validar que o componente não possui `.scss` e não usa classes de aparência do Tailwind.

- [🟨] **Tarefa 2.2.2:** Construir `IconComponent` (puro, via `mask-image`).
  - [🟨] **Passo 2.2.2.1:** Criar o `IconComponent` em `components/design/atoms/`.
  - [🟨] **Passo 2.2.2.2:** Implementar a arquitetura de "Ícones como Tokens" (definida no Épico 0, Tarefa 0.1.4 e 0.2.2).
  - [🟨] **Passo 2.2.2.3:** O template (`.html`) deve ser um `<span>` estilizado com `[style.mask-image]="'var(--icon-' + name() + ')'"`.
  - [🟨] **Passo 2.2.2.4:** Garantir que o `IconComponent` herde a cor via `currentColor`.

- [🟨] **Tarefa 2.2.3:** *(...outros átomos: Input, Label, Checkbox...)*
  - [🟨] **Passo 2.2.3.1:** Repetir o padrão de "Identidade vs. Estilo" para todos os outros átomos.

#### [🟨] Parte 2.3: Composição das Moléculas (Molecules)

- [🟨] **Tarefa 2.3.1:** Construir `StepperComponent`.
  - [🟨] **Passo 2.3.1.1:** Criar o `StepperComponent` em `components/design/molecules/`.
  - [🟨] **Passo 2.3.1.2:** Construir a UI usando Átomos (ex: `ButtonComponent`).
  - [🟨] **Passo 2.3.1.3:** Garantir que toda a aparência (espaçamento, cores) seja governada por tokens (`[style]` bindings).

- [🟨] **Tarefa 2.3.2:** Construir `TypographyCardComponent` (Laboratório Interativo).
  - [🟨] **Passo 2.3.2.1:** Criar o `TypographyCardComponent` em `components/design/molecules/`.
  - [🟨] **Passo 2.3.2.2:** Compor a UI usando Átomos (ex: `TextStyleShowcaseComponent`) e Moléculas (ex: `StepperComponent`).
  - [🟨] **Passo 2.3.2.3:** Conectar os controles de edição ao `TokenOrchestratorService` (Aduana).
  - [🟨] **Passo 2.3.2.4:** Garantir aderência total ao Protocolo de Estilização Inviolável (Lei nº 1).

- [🟨] **Tarefa 2.3.3:** *(...outras moléculas: SearchForm, Alert...)*
  - [🟨] **Passo 2.3.3.1:** Repetir o padrão de composição pura para todas as outras moléculas.

#### [🟨] Parte 2.4: Orquestração dos Organismos (Organisms)

- [🟨] **Tarefa 2.4.1:** Construir `HeaderComponent` (consumindo tokens de `background-secondary`).
  - [🟨] **Passo 2.4.1.1:** Criar o `HeaderComponent` em `components/design/organisms/`.
  - [🟨] **Passo 2.4.1.2:** Compor a UI usando Átomos e Moléculas.
  - [🟨] **Passo 2.4.1.3:** Conectar o `ThemeService` e `I18nService` aos controles de troca.
  - [🟨] **Passo 2.4.1.4:** Garantir que a aparência (ex: `background-color`, `border-color`) seja governada por tokens (ex: `var(--color-background-secondary)`).

- [🟨] **Tarefa 2.4.2:** Construir `SidebarComponent`.
  - [🟨] **Passo 2.4.2.1:** Criar o `SidebarComponent` em `components/design/organisms/`.
  - [🟨] **Passo 2.4.2.2:** Conectar ao `ResponsivenessService` (Lei 2) para comportamento de *drawer* móvel vs. *sidebar* estática.
  - [🟨] **Passo 2.4.2.3:** Garantir que a aparência (ex: `width`, `background-color`) seja governada por tokens.

- [🟨] **Tarefa 2.4.3:** Construir `FooterComponent`.
  - [🟨] **Passo 2.4.3.1:** Criar o `FooterComponent` em `components/design/organisms/`.
  - [🟨] **Passo 2.4.3.2:** Garantir que a aparência seja governada por tokens.

- [🟨] **Tarefa 2.4.4:** *(...outros organismos: Card, DataTable...)*
  - [🟨] **Passo 2.4.4.1:** Repetir o padrão de composição pura para todos os outros organismos.

---

### [🟨] Fase 3: A Camada de Inteligência e Entrega (O "Guardião" - Lei 4)
*Propósito: Implementar as ferramentas de validação de qualidade (Acessibilidade) e a funcionalidade de entrega (Exportar).*

#### [🟨] Parte 3.1: O Guardião da Acessibilidade

- [🟨] **Tarefa 3.1.1:** Implementar o `AccessibilityService` (lógica de cálculo de contraste).
  - [🟨] **Passo 3.1.1.1:** Criar o `AccessibilityService` (`providedIn: 'root'`).
  - [🟨] **Passo 3.1.1.2:** Adicionar `d3-color` (já instalado) para cálculos de luminância.
  - [🟨] **Passo 3.1.1.3:** Implementar métodos puros para `calculateLuminance(hex: string)` e `calculateContrastRatio(hex1: string, hex2: string)`.
  - [🟨] **Passo 3.1.1.4:** Injetar `TokenStateService` e implementar um `computed signal` (ex: `contrastAuditReport()`) que reage a mudanças nos tokens.
  - [🟨] **Passo 3.1.1.5:** O `signal` deve iterar sobre todos os tokens de cor semânticos, resolver seus valores (`light`/`dark`) e calcular o contraste contra os fundos relevantes (ex: `text-primary` vs `background-primary`).
  - [🟨] **Passo 3.1.1.6:** O relatório deve retornar uma lista de violações WCAG (abaixo de 4.5:1).

- [🟨] **Tarefa 3.1.2:** Construir a UI de Auditoria de Acessibilidade (lendo os resultados do serviço).
  - [🟨] **Passo 3.1.2.1:** Criar o `AccessibilityAuditComponent` (Página) em `features/pages/`.
  - [🟨] **Passo 3.1.2.2:** Injetar o `AccessibilityService` e consumir o `contrastAuditReport()`.
  - [🟨] **Passo 3.1.2.3:** Renderizar a lista de violações de contraste de forma clara.
  - [🟨] **Passo 3.1.2.4:** (Opcional, mas recomendado) Implementar a lógica de "auto-correção" (conforme `design-system-magic`) que sugere o próximo tom válido da paleta.

- [🟨] **Tarefa 3.1.3:** Integrar a auditoria de contraste como um "Gatekeeper" no pipeline de CI/CD.
  - [🟨] **Passo 3.1.3.1:** Criar um script de teste (ex: `npm run test:a11y`) que executa a lógica do `AccessibilityService` em um ambiente Node (ou `TestBed`).
  - [🟨] **Passo 3.1.3.2:** O script deve falhar (retornar código de saída não-zero) se qualquer violação de contraste for detectada nos tokens padrão.
  - [🟨] **Passo 3.1.3.3:** Configurar o workflow de CI (GitHub Actions, etc.) para executar este script em cada push/PR.

#### [🟨] Parte 3.2: A Funcionalidade de Entrega

- [🟨] **Tarefa 3.2.1:** Desenvolver a funcionalidade de "Exportar Artefatos".
  - [🟨] **Passo 3.2.1.1:** Criar um `ExportService` (`providedIn: 'root'`).
  - [🟨] **Passo 3.2.1.2:** Injetar `TokenStateService` e `CssGeneratorService`.
  - [🟨] **Passo 3.2.1.3:** Implementar a lógica de `downloadFile(content: string, fileName: string, mimeType: string)` para acionar o download no navegador.

- [🟨] **Tarefa 3.2.2:** Criar o exportador para `tokens.css` (a string gerada pelo `CssGeneratorService`).
  - [🟨] **Passo 3.2.2.1:** No `ExportService`, criar o método `exportCss()`.
  - [🟨] **Passo 3.2.2.2:** O método deve obter os tokens atuais do `TokenStateService`.
  - [🟨] **Passo 3.2.2.3:** Chamar `this.cssGenerator.generateCssString(tokens)` para obter a string CSS completa.
  - [🟨] **Passo 3.2.2.4:** Chamar `downloadFile(cssString, 'tokens.css', 'text/css')`.

- [🟨] **Tarefa 3.2.3:** Criar o exportador para `tokens.json` (o estado do `TokenStateService`).
  - [🟨] **Passo 3.2.3.1:** No `ExportService`, criar o método `exportJson()`.
  - [🟨] **Passo 3.2.3.2:** O método deve obter os tokens atuais do `TokenStateService`.
  - [🟨] **Passo 3.2.3.3:** Serializar o objeto de tokens: `jsonString = JSON.stringify(tokens, null, 2)`.
  - [🟨] **Passo 3.2.3.4:** Chamar `downloadFile(jsonString, 'tokens.json', 'application/json')`.

#### [🟨] Parte 3.3: Documentação Final

- [🟨] **Tarefa 3.3.1:** Gerar a documentação final de consumo e o guia de instalação para projetos externos.
  - [🟨] **Passo 3.3.1.1:** Criar um documento (ex: `CONSUMING_TOKENS.md`) na documentação do projeto.
  - [🟨] **Passo 3.3.1.2:** Detalhar como os consumidores externos devem usar os artefatos exportados (ex: importando `tokens.css` ou `tokens.json`).
  - [🟨] **Passo 3.3.1.3:** Incluir a versão do schema dos tokens exportados para garantir o versionamento correto.