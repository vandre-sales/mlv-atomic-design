# Roadmap Granular do Épico 0: A Fundação Inabalável (A "Máquina Invisível" - Leis 1 & 2)
**ID do Roadmap:** `05_0`
**Versão:** 2.0 (Canônica, com Passos)

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

### Épico 0: A Fundação Inabalável (A "Máquina Invisível" - Leis 1 & 2)
*Propósito: Construir o sistema nervoso central e os serviços de contexto global. O resultado é um esqueleto de aplicação reativo, mas sem UI de Produto.*

#### Parte 0.1: Arquitetura de Microsserviços (Lei 1 - Motor de Estilo)

##### Tarefa 0.1.1: Implementar `PersistenceService` (I/O com `localStorage`).
- Passo 0.1.1.1: Criar o `PersistenceService` (`providedIn: 'root'`).
- Passo 0.1.1.2: Implementar o método `setItem(key: string, value: any)`.
- Passo 0.1.1.3: Implementar o método `getItem<T>(key: string): T | null`.
- Passo 0.1.1.4: Implementar o método `removeItem(key: string)`.
- Passo 0.1.1.5: Garantir que o serviço utilize `localStorage` e trate exceções (ex: modo `private`).

##### Tarefa 0.1.2: Implementar `TokenStateService` (O "Cofre" - `signal()` SSoT).
- Passo 0.1.2.1: Criar o `TokenStateService` (`providedIn: 'root'`).
- Passo 0.1.2.2: Definir a `signal()` privada: `private tokens = signal<IDesignTokens>({});`.
- Passo 0.1.2.3: Expor a `signal()` pública: `public readonly tokens = this.tokens.asReadonly();`.
- Passo 0.1.2.4: Injetar `PersistenceService`.
- Passo 0.1.2.5: Implementar o construtor para chamar `hydrateState()`.
- Passo 0.1.2.6: Implementar `hydrateState()`: tentar ler do `PersistenceService` (`getItem`). Se falhar, chamar `buildDefaultTokens()` (a ser criado na Parte 0.2).
- Passo 0.1.2.7: Implementar o método `updateTokens(newTokens: IDesignTokens)` (que chama `this.tokens.set(newTokens)`).
- Passo 0.1.2.8: Implementar um `effect()` que observa `this.tokens()` e chama `PersistenceService.setItem()` para persistir mudanças.

##### Tarefa 0.1.3: Implementar `TokenResolverService` (O "Dicionário" - Resolução de Alias).
- Passo 0.1.3.1: Criar o `TokenResolverService` (`providedIn: 'root'`).
- Passo 0.1.3.2: Implementar o método `resolveTokenAlias(alias: string, tokens: IDesignTokens)` como uma função pura.
- Passo 0.1.3.3: A lógica deve traduzir um alias (ex: `'blue.500'`) em sua referência de variável CSS privada (ex: `'var(--mlv-color-blue-500)'`).

##### Tarefa 0.1.4: Implementar `CssGeneratorService` (A "Fábrica" - Geração de String CSS, incluindo a blindagem `--mlv-`).
- Passo 0.1.4.1: Criar o `CssGeneratorService` (`providedIn: 'root'`).
- Passo 0.1.4.2: Implementar o método público `generateCssString(tokens: IDesignTokens): string`.
- Passo 0.1.4.3: Implementar o método privado `generatePrimitiveVariables(tokens: IDesignTokens)` (Camada Privada `--mlv-`).
- Passo 0.1.4.4: Implementar o método privado `generateSemanticVariables(tokens: IDesignTokens, resolver: TokenResolverService)` (Camada Pública `--color-`, usando o resolver).
- Passo 0.1.4.5: Implementar métodos privados de geração de estilo de componente (ex: `generateButtonStyles`, `generateMarkdownStyles`), que serão expandidos no Épico 2.
- Passo 0.1.4.6: Garantir que `generateCssString` concatene todas as strings geradas.

##### Tarefa 0.1.5: Implementar `StyleInjectorService` (O "Injetor" - Manipulação do DOM).
- Passo 0.1.5.1: Criar o `StyleInjectorService` (`providedIn: 'root'`).
- Passo 0.1.5.2: Implementar o método `injectCss(cssString: string, id: string)`.
- Passo 0.1.5.3: A lógica deve buscar um `<style>` elemento pelo `id` no `<head>`, criá-lo se não existir, e atualizar seu `textContent` com `cssString`.

##### Tarefa 0.1.6: Implementar `DesignTokenService` (O "Maestro" - `effect()` orquestrador).
- Passo 0.1.6.1: Criar o `DesignTokenService` (`providedIn: 'root'`).
- Passo 0.1.6.2: Injetar `TokenStateService`, `CssGeneratorService` e `StyleInjectorService`.
- Passo 0.1.6.3: Implementar o `effect()` principal no construtor.
- Passo 0.1.6.4: O `effect` deve: 1. Obter `currentTokens = this.tokenState.tokens()`. 2. Gerar `cssString = this.cssGenerator.generateCssString(currentTokens)`. 3. Injetar `this.styleInjector.injectCss(cssString, 'design-tokens')`.

##### Tarefa 0.1.7: Implementar `PaletteGenerationService` (Lógica de Geração Dinâmica).
- Passo 0.1.7.1: Criar o `PaletteGenerationService` (`providedIn: 'root'`).
- Passo 0.1.7.2: Adicionar `d3-color` como dependência.
- Passo 0.1.7.3: Implementar o método `generatePalette(baseColorHex: string): { [key: string]: string }`.
- Passo 0.1.7.4: A lógica deve gerar os 11 tons (50-950) a partir da cor base (tom 500) usando `d3-color` para interpolação.

##### Tarefa 0.1.8: Implementar `TokenOrchestratorService` (A "Aduana" - Camada de Lógica de Negócios).
- Passo 0.1.8.1: Criar o `TokenOrchestratorService` (`providedIn: 'root'`).
- Passo 0.1.8.2: Injetar `TokenStateService` e `PaletteGenerationService`.
- Passo 0.1.8.3: Implementar o método `updateTokenValue(path: string, newValue: any)`.
- Passo 0.1.8.4: Implementar a lógica de negócios: Se o `path` for uma cor "semente" (ex: `primitives.colors.blue.500`), chamar o `PaletteGenerationService` para gerar a paleta completa e atualizar o estado (via `TokenStateService.updateTokens`).
- Passo 0.1.8.5: Se for qualquer outro `path`, apenas atualizar o valor correspondente no objeto de tokens e chamar `TokenStateService.updateTokens`.

#### Parte 0.2: Definição do DNA (A Fonte da Verdade)

##### Tarefa 0.2.1: Definir os Contratos de Dados (`design-tokens.interface.ts`).
- Passo 0.2.1.1: Criar `design-tokens.interface.ts`.
- Passo 0.2.1.2: Definir as interfaces para `IDesignTokens`, `IPrimitiveTokens`, `ISemanticTokens`, etc.

##### Tarefa 0.2.2: Criar arquivos de "Sementes" Primitivas (`primitive-base-colors.ts`, `primitive-spacing.ts`).
- Passo 0.2.2.1: Criar `primitive-base-colors.ts` e exportar apenas os tons `500` (cores mestras).
- Passo 0.2.2.2: Criar `primitive-spacing.ts` e exportar a escala de espaçamento.
- Passo 0.2.2.3: Criar `primitive-typography.ts`, `primitive-shadows.ts`, etc.

##### Tarefa 0.2.3: Criar arquivos de "Decisões" Semânticas (`semantic-colors.ts`, `semantic-typography.ts`).
- Passo 0.2.3.1: Criar `semantic-colors.ts` e exportar os mapeamentos (ex: `backgroundPrimary: 'white'`).
- Passo 0.2.3.2: Criar `semantic-typography.ts` e exportar os mapeamentos (ex: `heading1: '...'`).

##### Tarefa 0.2.4: Criar o Agregador Puro (`default-tokens.ts`).
- Passo 0.2.4.1: Criar `default-tokens.ts`.
- Passo 0.2.4.2: Importar todos os primitivos (sementes) e semânticos.
- Passo 0.2.4.3: Exportar uma função `buildDefaultTokens(paletteGenerator: PaletteGenerationService): IDesignTokens`.
- Passo 0.2.4.4: A lógica desta função deve usar o `paletteGenerator` para construir as paletas completas a partir das sementes e agregá-las com os tokens semânticos.

##### Tarefa 0.2.5: Integrar a Geração Dinâmica de Paletas no `TokenStateService` (hidratação inicial).
- Passo 0.2.5.1: No `TokenStateService` (Tarefa 0.1.2), injetar `PaletteGenerationService`.
- Passo 0.2.5.2: Na função `hydrateState()`, quando o `PersistenceService` falhar, chamar `buildDefaultTokens(this.paletteGenerator)` (da Tarefa 0.2.4) para obter o estado inicial.
- Passo 0.2.5.3: Definir o estado inicial com `this.tokens.set(...)`.

#### Parte 0.3: Serviços de Contexto Global (Lei 2)

##### Tarefa 0.3.1: Implementar `ThemeService` (Troca de tema Claro/Escuro via classe no `<body>`).
- Passo 0.3.1.1: Criar `ThemeService` (`providedIn: 'root'`).
- Passo 0.3.1.2: Implementar um `signal()` para o tema atual (`light` | `dark`).
- Passo 0.3.1.3: Implementar detecção de preferência do SO (`prefers-color-scheme`).
- Passo 0.3.1.4: Implementar um `effect()` que aplica/remove a classe `dark` no `document.body` com base no `signal()`.

##### Tarefa 0.3.2: Implementar `ResponsivenessService` (Consumo do `BreakpointObserver` do CDK).
- Passo 0.3.2.1: Adicionar `@angular/cdk` ao projeto.
- Passo 0.3.2.2: Criar `ResponsivenessService` (`providedIn: 'root'`).
- Passo 0.3.2.3: Injetar `BreakpointObserver` do CDK.
- Passo 0.3.2.4: Expor um `signal()` (ou `Observable`) com os breakpoints ativos (ex: `isHandset$`).

##### Tarefa 0.3.3: Implementar `I18nService` (Carregamento de traduções e `signal()` de idioma).
- Passo 0.3.3.1: Criar `I18nService` (`providedIn: 'root'`).
- Passo 0.3.3.2: Implementar um `signal()` para o idioma atual (ex: `en-US`).
- Passo 0.3.3.3: Implementar um método `loadLanguage(lang: string): Promise<void>` que usa `fetch()` para carregar o JSON de tradução.
- Passo 0.3.3.4: Implementar um `signal()` para as traduções carregadas.
- Passo 0.3.3.5: Implementar um `translate(key: string): string` (ou `Pipe`).

##### Tarefa 0.3.4: Configurar `provideAppInitializer` para carregar `I18nService`.
- Passo 0.3.4.1: Abrir `app.config.ts`.
- Passo 0.3.4.2: Importar `provideAppInitializer` e `inject` do `@angular/core`.
- Passo 0.3.4.3: Adicionar aos `providers`: `provideAppInitializer(() => { return inject(I18nService).loadLanguage('en-US'); })`.
- Passo 0.3.4.4: Validar que NENHUM serviço do Motor de Estilo (Parte 0.1) está sendo chamado aqui, pois eles devem operar de forma não-bloqueante.

#### Parte 0.4: Cobertura de Testes da Fundação

##### Tarefa 0.4.1: Criar testes unitários para `PaletteGenerationService` (lógica pura).
- Passo 0.4.1.1: Criar `palette-generation.service.spec.ts`.
- Passo 0.4.1.2: Testar se a geração de paleta a partir de uma cor base conhecida retorna os 11 tons esperados.

##### Tarefa 0.4.2: Criar testes unitários para `TokenResolverService` (lógica pura).
- Passo 0.4.2.1: Criar `token-resolver.service.spec.ts`.
- Passo 0.4.2.2: Testar se a resolução de alias retorna a `var(--mlv-...)` correta.

##### Tarefa 0.4.3: Criar testes de integração para o pipeline de microsserviços.
- Passo 0.4.3.1: Criar `design-token.service.spec.ts`.
- Passo 0.4.3.2: Fornecer mocks para `CssGeneratorService` e `StyleInjectorService`.
- Passo 0.4.3.3: Simular uma mutação no `TokenStateService` (ou `TokenOrchestratorService`).
- Passo 0.4.3.4: Usar `fakeAsync` e `tick` (ou `waitForAsync`) para garantir que o `effect()` no `DesignTokenService` dispare.
- Passo 0.4.3.5: Verificar se `StyleInjectorService.injectCss` foi chamado com a string esperada do `CssGeneratorService`.

##### Tarefa 0.4.4: Criar testes para os serviços de contexto (`ThemeService`, `ResponsivenessService`, `I18nService`).
- Passo 0.4.4.1: Criar `theme.service.spec.ts` e testar a lógica de troca de classe no `document.body`.
- Passo 0.4.4.2: Criar `responsiveness.service.spec.ts` (pode exigir `TestBed` do CDK).
- Passo 0.4.4.3: Criar `i18n.service.spec.ts` (usando `HttpTestingController` para mockar `fetch()`).