## Legenda de Status
- **ÉPICO**
  - [🔘] **Épico Pendente**.
  - [🟡] **Épico em Progresso**.
  - [🟢] **Épico Concluído**.
- **Parte**
  - [⬜] **Parte Pendente**.
  - [🟨] **Parte em Progresso**.
  - [🟩] **Parte Concluída**.
- **Tarefa**
  - [🔘] **Tarefa Pendente**.
  - [🟡] **Tarefa em Progresso**.
  - [🟢] **Tarefa Concluída**.
- **Passo**
  - [◽] **Passo Pendente**.
  - [✴️] **Passo em Progresso**.
  - [✅] **Passo Concluído**.

### [🟢] Épico 0: A Fundação Inabalável (A "Máquina Invisível" - Leis 1 & 2)
*Propósito: Construir o sistema nervoso central e os serviços de contexto global. O resultado é um esqueleto de aplicação reativo, mas sem UI de Produto.*

#### [🟩] Parte 0.1: Arquitetura de Microsserviços (Lei 1 - Motor de Estilo)

- [🟢] **Tarefa 0.1.1:** Implementar `PersistenceService` (I/O com `localStorage`).
  - [✅] **Passo 0.1.1.1:** Criar o `PersistenceService` (`providedIn: 'root'`).
  - [✅] **Passo 0.1.1.2:** Implementar o método `setItem(key: string, value: any)`.
  - [✅] **Passo 0.1.1.3:** Implementar o método `getItem<T>(key: string): T | null`.
  - [✅] **Passo 0.1.1.4:** Implementar o método `removeItem(key: string)`.
  - [✅] **Passo 0.1.1.5:** Garantir que o serviço utilize `localStorage` e trate exceções.

- [🟢] **Tarefa 0.1.2:** Implementar `TokenStateService` (O "Cofre" - `signal()` SSoT).
  - [✅] **Passo 0.1.2.1:** Criar o `TokenStateService`.
  - [✅] **Passo 0.1.2.2:** Definir a `signal()` privada para o estado.
  - [✅] **Passo 0.1.2.3:** Expor a `signal()` pública `readonly`.
  - [✅] **Passo 0.1.2.4:** Injetar `PersistenceService`.
  - [✅] **Passo 0.1.2.5:** Implementar o construtor para chamar `hydrateState()`.
  - [✅] **Passo 0.1.2.6:** Implementar `hydrateState()` para ler do `PersistenceService` ou construir o estado padrão.
  - [✅] **Passo 0.1.2.7:** Implementar o método `updateTokens()`.
  - [✅] **Passo 0.1.2.8:** Implementar um `effect()` para persistir mudanças.

- [🟢] **Tarefa 0.1.3:** Implementar `TokenResolverService` (O "Dicionário" - Resolução de Alias).
  - [✅] **Passo 0.1.3.1:** Criar o `TokenResolverService`.
  - [✅] **Passo 0.1.3.2:** Implementar o método `resolveTokenValue()` como uma função pura.
  - [✅] **Passo 0.1.3.3:** Garantir que a lógica traduza um alias em sua referência de `var()` CSS.

- [🟢] **Tarefa 0.1.4:** Implementar `CssGeneratorService` (A "Fábrica" - Geração de String CSS).
  - [✅] **Passo 0.1.4.1:** Criar o `CssGeneratorService`.
  - [✅] **Passo 0.1.4.2:** Implementar o método público `generateCssString()`.
  - [✅] **Passo 0.1.4.3:** Implementar o método privado `generatePrimitiveVariables()`.
  - [✅] **Passo 0.1.4.4:** Implementar o método privado `generateSemanticVariables()`.
  - [✅] **Passo 0.1.4.5:** Incluir placeholders para `generateButtonStyles` e `generateMarkdownStyles`.
  - [✅] **Passo 0.1.4.6:** Garantir que `generateCssString` concatene todas as strings geradas.

- [🟢] **Tarefa 0.1.5:** Implementar `StyleInjectorService` (O "Injetor" - Manipulação do DOM).
  - [✅] **Passo 0.1.5.1:** Criar o `StyleInjectorService`.
  - [✅] **Passo 0.1.5.2:** Implementar o método `injectCss(cssString: string, id: string)`.
  - [✅] **Passo 0.1.5.3:** Garantir que a lógica encontre ou crie um elemento `<style>` e atualize seu `textContent`.

- [🟢] **Tarefa 0.1.6:** Implementar `DesignTokenService` (O "Maestro" - `effect()` orquestrador).
  - [✅] **Passo 0.1.6.1:** Criar o `DesignTokenService`.
  - [✅] **Passo 0.1.6.2:** Injetar `TokenStateService`, `CssGeneratorService` e `StyleInjectorService`.
  - [✅] **Passo 0.1.6.3:** Implementar o `effect()` principal no construtor.
  - [✅] **Passo 0.1.6.4:** Garantir que o `effect` orquestre o pipeline: `getState -> generateCss -> injectCss`.

- [🟢] **Tarefa 0.1.7:** Implementar `PaletteGenerationService` (Lógica de Geração Dinâmica).
  - [✅] **Passo 0.1.7.1:** Criar o `PaletteGenerationService`.
  - [✅] **Passo 0.1.7.2:** Adicionar dependências (`d3-color`, `d3-interpolate`).
  - [✅] **Passo 0.1.7.3:** Implementar o método `generatePalette()`.
  - [✅] **Passo 0.1.7.4:** Garantir que a lógica gere os 11 tons (50-950) a partir da cor base.

- [🟢] **Tarefa 0.1.8:** Implementar `TokenOrchestratorService` (A "Aduana" - Camada de Lógica de Negócios).
  - [✅] **Passo 0.1.8.1:** Criar o `TokenOrchestratorService`.
  - [✅] **Passo 0.1.8.2:** Injetar `TokenStateService` e `PaletteGenerationService`.
  - [✅] **Passo 0.1.8.3:** Implementar o método `updateTokenValue()`.
  - [✅] **Passo 0.1.8.4:** Implementar a lógica de negócios para regenerar paletas de cores.
  - [✅] **Passo 0.1.8.5:** Implementar a lógica de negócios para atualizações de tokens genéricos.

#### [🟩] Parte 0.2: Definição do DNA (A Fonte da Verdade)

- [🟢] **Tarefa 0.2.1:** Definir os Contratos de Dados (`design-tokens.interface.ts`).
  - [✅] **Passo 0.2.1.1:** Criar `design-tokens.interface.ts`.
  - [✅] **Passo 0.2.1.2:** Definir as interfaces para `IDesignTokens`, `IPrimitiveTokens`, `ISemanticTokens`, etc.

- [🟢] **Tarefa 0.2.2:** Criar arquivos de "Sementes" Primitivas.
  - [✅] **Passo 0.2.2.1:** Criar `primitive-base-colors.ts`.
  - [✅] **Passo 0.2.2.2:** Criar `primitive-spacing.ts`.
  - [✅] **Passo 0.2.2.3:** Criar `primitive-typography.ts` e `primitive-shadows.ts`.

- [🟢] **Tarefa 0.2.3:** Criar arquivos de "Decisões" Semânticas.
  - [✅] **Passo 0.2.3.1:** Criar `semantic-colors.ts`.
  - [✅] **Passo 0.2.3.2:** Criar `semantic-typography.ts`, `semantic-spacing.ts` e `semantic-shadows.ts`.

- [🟢] **Tarefa 0.2.4:** Criar o Agregador Puro (`default-tokens.ts`).
  - [✅] **Passo 0.2.4.1:** Criar `default-tokens.ts`.
  - [✅] **Passo 0.2.4.2:** Importar todos os primitivos e semânticos.
  - [✅] **Passo 0.2.4.3:** Exportar a função `buildDefaultTokens()`.
  - [✅] **Passo 0.2.4.4:** Implementar a lógica de agregação e geração de paletas.

- [🟢] **Tarefa 0.2.5:** Integrar a Geração Dinâmica de Paletas no `TokenStateService`.
  - [✅] **Passo 0.2.5.1:** Injetar `PaletteGenerationService` no `TokenStateService`.
  - [✅] **Passo 0.2.5.2:** Chamar `buildDefaultTokens()` na lógica de hidratação.
  - [✅] **Passo 0.2.5.3:** Definir o estado inicial com os tokens gerados.

#### [🟩] Parte 0.3: Serviços de Contexto Global (Lei 2)

- [🟢] **Tarefa 0.3.1:** Implementar `ThemeService` (Troca de tema Claro/Escuro via classe no `<body>`).
  - [✅] **Passo 0.3.1.1:** Criar `ThemeService`.
  - [✅] **Passo 0.3.1.2:** Implementar um `signal()` para o tema atual.
  - [✅] **Passo 0.3.1.3:** Implementar detecção de preferência do SO.
  - [✅] **Passo 0.3.1.4:** Implementar um `effect()` que aplica/remove a classe `dark` no `document.body`.

- [🟢] **Tarefa 0.3.2:** Implementar `ResponsivenessService` (Consumo do `BreakpointObserver` do CDK).
  - [✅] **Passo 0.3.2.1:** Adicionar `@angular/cdk` ao projeto.
  - [✅] **Passo 0.3.2.2:** Criar `ResponsivenessService`.
  - [✅] **Passo 0.3.2.3:** Injetar `BreakpointObserver`.
  - [✅] **Passo 0.3.2.4:** Expor um `signal()` com os breakpoints ativos.

- [🟢] **Tarefa 0.3.3:** Implementar `I18nService` (Carregamento de traduções e `signal()` de idioma).
  - [✅] **Passo 0.3.3.1:** Criar `I18nService`.
  - [✅] **Passo 0.3.3.2:** Implementar um `signal()` para o idioma atual.
  - [✅] **Passo 0.3.3.3:** Implementar o método `loadLanguage()`.
  - [✅] **Passo 0.3.3.4:** Implementar um `signal()` para as traduções carregadas.
  - [✅] **Passo 0.3.3.5:** Implementar um `translate()`.

- [🟢] **Tarefa 0.3.4:** Configurar `provideAppInitializer` para carregar `I18nService`.
  - [✅] **Passo 0.3.4.1:** Abrir `app.config.ts`.
  - [✅] **Passo 0.3.4.2:** Importar `provideAppInitializer` e `inject`.
  - [✅] **Passo 0.3.4.3:** Adicionar o `provider` para inicializar o `I18nService`.
  - [✅] **Passo 0.3.4.4:** Validar que nenhum serviço do Motor de Estilo está sendo chamado aqui.

#### [🟩] Parte 0.4: Cobertura de Testes da Fundação

- [🟢] **Tarefa 0.4.1:** Criar testes unitários para `PaletteGenerationService` (lógica pura).
  - [✅] **Passo 0.4.1.1:** Criar `palette-generation.service.spec.ts`.
  - [✅] **Passo 0.4.1.2:** Testar se a geração de paleta a partir de uma cor base conhecida retorna os 11 tons esperados.

- [🟢] **Tarefa 0.4.2:** Criar testes unitários para `TokenResolverService` (lógica pura).
  - [✅] **Passo 0.4.2.1:** Criar `token-resolver.service.spec.ts`.
  - [✅] **Passo 0.4.2.2:** Testar se a resolução de alias retorna a `var(--mlv-...)` correta.

- [🟢] **Tarefa 0.4.3:** Criar testes de integração para o pipeline de microsserviços.
  - [✅] **Passo 0.4.3.1:** Criar `design-token.service.spec.ts`.
  - [✅] **Passo 0.4.3.2:** Fornecer mocks para `CssGeneratorService` e `StyleInjectorService`.
  - [✅] **Passo 0.4.3.3:** Simular uma mutação no `TokenStateService` (ou `TokenOrchestratorService`).
  - [✅] **Passo 0.4.3.4:** Usar `fakeAsync` e `tick` para garantir que o `effect()` no `DesignTokenService` dispare.
  - [✅] **Passo 0.4.3.5:** Verificar se `StyleInjectorService.injectCss` foi chamado com a string esperada.

- [🟢] **Tarefa 0.4.4:** Criar testes para os serviços de contexto (`ThemeService`, etc.).
  - [✅] **Passo 0.4.4.1:** Criar e validar `theme.service.spec.ts`.
  - [✅] **Passo 0.4.4.2:** Criar `responsiveness.service.spec.ts`.
  - [✅] **Passo 0.4.4.3:** Criar `i18n.service.spec.ts`.
