# Roadmap Granular do Épico 1: A Forja (A "Ferramenta" - Épicos 1 & 2 do Conceito)
**ID do Roadmap:** `05_1`
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

### Épico 1: A Forja (A "Ferramenta" - Épicos 1 & 2 do Conceito)
*Propósito: Construir a UI da Ferramenta (os "Laboratórios") que permite a visualização e mutação do DNA (Tokens) definido no Épico 0.*

#### Parte 1.1: UI dos Laboratórios de Tokens

##### Tarefa 1.1.1: Construir a página de visualização da Paleta Primitiva (consumindo o `TokenStateService`).
- Passo 1.1.1.1: Criar o `PrimitiveColorsPageComponent` (ou similar) em `features/pages/`.
- Passo 1.1.1.2: Injetar o `TokenStateService` e consumir o `tokens().primitives.colors`.
- Passo 1.1.1.3: Renderizar a grade de paletas, similar ao `design-system-magic`.
- Passo 1.1.1.4: Implementar o `ColorSwatchComponent` (Átomo) para exibir visualmente cada cor.

##### Tarefa 1.1.2: Construir a página de visualização de Tokens Semânticos.
- Passo 1.1.2.1: Criar o `SemanticColorsPageComponent` (ou similar).
- Passo 1.1.2.2: Injetar `TokenStateService` e consumir `tokens().colors`.
- Passo 1.1.2.3: Renderizar a lista de tokens semânticos (ex: `background-primary`) mostrando seus mapeamentos para `light` e `dark`.
- Passo 1.1.2.4: Criar páginas equivalentes para outros domínios de tokens (Spacing, Typography, etc.).

##### Tarefa 1.1.3: Construir o `EditorPopoverComponent` (o contêiner flutuante).
- Passo 1.1.3.1: Criar o `EditorPopoverComponent` (Organismo ou Molécula) em `components/tools/`.
- Passo 1.1.3.2: Implementar a lógica de posicionamento (consumindo `PositioningService`, a ser criado se necessário, ou `CDK Overlay`).
- Passo 1.1.3.3: Injetar `OverlayStateService` (a ser criado) para gerenciar o estado (`activePopover`).
- Passo 1.1.3.4: Implementar um `NgSwitch` ou `@switch` para renderizar dinamicamente o editor correto com base no tipo de token.

#### Parte 1.2: Componentes da Ferramenta de Edição

##### Tarefa 1.2.1: Implementar `ColorEditorComponent` (seletor de cor nativo).
- Passo 1.2.1.1: Criar o `ColorEditorComponent` (Molécula) em `components/tools/editors/`.
- Passo 1.2.1.2: Implementar um `input()` para o `tokenPath`.
- Passo 1.2.1.3: Renderizar um `<input type="color">`.
- Passo 1.2.1.4: No evento `(input)`, chamar `TokenOrchestratorService.updateTokenValue(path, newValue)`.

##### Tarefa 1.2.2: Implementar `VisualColorEditorComponent` (seletor visual de paleta).
- Passo 1.2.2.1: Criar o `VisualColorEditorComponent` em `components/tools/editors/`.
- Passo 1.2.2.2: Injetar `TokenStateService` para ler `tokens().primitives.colors`.
- Passo 1.2.2.3: Renderizar a grade de `swatches` clicáveis.
- Passo 1.2.2.4: No `(click)` de um swatch, construir o alias (ex: `'blue.500'`) e chamar `TokenOrchestratorService.updateTokenValue(path, newAlias)`.

##### Tarefa 1.2.3: Implementar `TextStyleEditorComponent` (editor de tipografia).
- Passo 1.2.3.1: Criar o `TextStyleEditorComponent` em `components/tools/editors/`.
- Passo 1.2.3.2: Implementar controles (`<select>`, `StepperComponent`) para cada propriedade de `ITextStyle`.
- Passo 1.2.3.3: Injetar `TokenStateService` para popular as opções dos controles (ex: `tokens().primitives.typography.fontWeight`).
- Passo 1.2.3.4: Conectar cada controle ao `TokenOrchestratorService` para atualizações de sub-propriedades (ex: `typography.heading-h1.fontWeight`).

##### Tarefa 1.2.4: Implementar `AliasEditorComponent` (editor de alias genérico).
- Passo 1.2.4.1: Criar o `AliasEditorComponent` em `components/tools/editors/`.
- Passo 1.2.4.2: Implementar um `<select>` ou `StepperComponent` genérico.
- Passo 1.2.4.3: Injetar `TokenStateService` para popular as opções (ex: `tokens().primitives.spacing`).
- Passo 1.2.4.4: Conectar o controle ao `TokenOrchestratorService`.

#### Parte 1.3: Conexão da Ferramenta (Princípio da Dualidade)

##### Tarefa 1.3.1: Implementar a `EditableTokenDirective` (A "Ponte" que abre o Popover).
- Passo 1.3.1.1: Criar a diretiva `EditableTokenDirective` em `core/directives/` (ou `shared/directives/`).
- Passo 1.3.1.2: Definir um `input()` para o `tokenPath`.
- Passo 1.3.1.3: Injetar `OverlayStateService` (a ser criado) e `ElementRef`.
- Passo 1.3.1.4: Implementar um `@HostListener('click')` que chama `overlayStateService.openPopover(path, elementRef)`.

##### Tarefa 1.3.2: Conectar todos os componentes de edição (Parte 1.2) exclusivamente ao `TokenOrchestratorService` (A "Aduana").
- Passo 1.3.2.1: Auditar todos os componentes em `components/tools/editors/`.
- Passo 1.3.2.2: Verificar se NENHUM editor injeta ou chama o `TokenStateService` para mutações.
- Passo 1.3.2.3: Garantir que todas as ações de salvamento sejam delegadas ao `TokenOrchestratorService.updateTokenValue()`.

##### Tarefa 1.3.3: Implementar o `TokenEditGuardService` para bloquear a edição de tokens não-editáveis.
- Passo 1.3.3.1: Criar `TokenEditGuardService` (`providedIn: 'root'`).
- Passo 1.3.3.2: Injetar `ThemeService` (para lógica de tema `light/dark`).
- Passo 1.3.3.3: Implementar `isEditable(tokenPath): Signal<boolean>`.
- Passo 1.3.3.4: A lógica deve bloquear tons não-mestre (ex: `primitives.colors.blue.100`) e tokens de tema incorreto (ex: `colors.text-primary.dark` no tema `light`).
- Passo 1.3.3.5: A `EditableTokenDirective` (Tarefa 1.3.1) e os componentes de edição (Parte 1.2) devem injetar este serviço e desabilitar a interação (`[disabled]`, `[class.locked]`) se `isEditable` for `false`.