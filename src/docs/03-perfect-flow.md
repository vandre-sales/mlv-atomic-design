# O Fluxo de Construção Canônico: O Processo Arquitetural Inviolável
**Versão:** 1.0 (Canônica e Prescritiva)
**Status:** Inviolável
**Público-alvo:** Todos os Engenheiros de Software

Este documento define o **fluxo de trabalho de engenharia obrigatório** para o `mlv-atomic-design`. Ele não é uma sugestão; é o processo imposto pela arquitetura.

Qualquer desvio desta sequência invalida os princípios de reatividade, responsabilidade única e separação de interesses, resultando em falha arquitetural. A excelência é a consequência de aderir a esta ordem.

---

### Ato 0: O Requisito

O requisito é "construir a página de perfil". A mentalidade de iniciar pelo `.html` ou `.scss` da página é uma violação deste fluxo. O trabalho no `mlv-atomic-design` começa no nível mais fundamental da fundação.

### Ato I: A Fundação — O Motor Reativo (Épico 0)

A primeira fase não envolve UI. A fase é construir o sistema nervoso central (a "Máquina Invisível" do `01-project-vision.md`).

1.  **O Ponto de Partida:** O diretório `src/app/core/`.
2.  **A Ação:** Implementar o pipeline de microsserviços (Lei nº 1):
    * `TokenStateService` (O Cofre, com o `signal()`).
    * `CssGeneratorService` (A Fábrica, gerando a string CSS).
    * `StyleInjectorService` (O Injetor, tocando o DOM).
    * `DesignTokenService` (O Maestro, com o `effect()` que conecta o pipeline).
3.  **O Resultado do Ato:** Um sistema que pode receber um objeto de estado de token e injetar CSS reativamente no `<head>`, *antes* que qualquer componente exista.

### Ato II: Os Dados e a Ferramenta — O DNA (Épicos 1 & 2)

Com o motor funcional, o DNA é definido e a Ferramenta para editá-lo é construída.

1.  **O Ponto de Partida:** `core/data/tokens/` e `features/tools/` (ou `components/tools/`, conforme `99-scaffold.md`).
2.  **A Ação (Dados):** Definir as "sementes" primitivas (ex: `primitive-base-colors.ts`) e os mapeamentos semânticos (ex: `semantic-colors.ts`). Implementar o `PaletteGenerationService` para geração dinâmica.
3.  **A Ação (Ferramenta):** Construir os "Laboratórios de Edição" (ex: `ColorEditorComponent`).
4.  **A Conexão Crítica:** A UI (Laboratório) NÃO chama o `TokenStateService` (Cofre). Ela chama o `TokenOrchestratorService` (Aduana), que aplica a lógica de negócios (ex: "regenerar paleta") antes de cometer a mutação ao estado.
5.  **O Resultado do Ato:** O DNA (tokens) está definido e a Ferramenta (laboratórios) pode mutar esse DNA através do pipeline reativo construído no Ato I.

### Ato III: O Produto — Os Átomos Puros (Épico 3)

Somente agora, com o motor e os dados prontos, o desenvolvedor constrói o primeiro componente de UI do "Produto".

1.  **O Ponto de Partida:** `components/design/atoms/`. A tarefa é criar `button.component.ts`.
2.  **A Ação (Identidade):** Implementar o componente seguindo a **Separação de Identidade e Estilo**:
    * O `.ts` define `hostClasses()`: `hostClasses = computed(() => \`ds-button ${this.variant()}\`);`
    * O `.html` usa `<ng-content>`.
    * **Violação:** Adicionar classes de aparência (ex: `p-4`, `bg-blue-500`) ou estilos no `.scss` do componente é estritamente proibido.
3.  **A Ação (Estilo):** O desenvolvedor **retorna** ao `CssGeneratorService` (Ato I) e adiciona a lógica para estilizar a *identidade* `.ds-button` com base nos tokens semânticos (Ato II).
4.  **O Resultado do Ato:** Um componente de UI (`ButtonComponent`) 100% puro, estrutural e agnóstico de estilo, cuja aparência é inteiramente governada pelo motor de tokens.

### Ato IV: A Feature e o Guardião (Épico 4)

Finalmente, o desenvolvedor constrói a feature solicitada no Ato 0.

1.  **O Ponto de Partida:** `features/pages/profile/`.
2.  **A Ação:** Criar `ProfilePageComponent` e montar a UI usando os Átomos e Moléculas puros (ex: `<app-button>`) construídos no Ato III.
3.  **O Guardião (O Portão):** A arquitetura valida a implementação. O pipeline de CI/CD é o guardião deste fluxo.
4.  **A Causa-Raiz (O Fluxo Perfeito):** O pipeline falha, reportando: "Violação de Acessibilidade WCAG. O token semântico `color-text-secondary` (definido em `core/data/tokens/semantic/semantic-colors.ts`) possui contraste insuficiente contra `color-background-primary`.".
5.  **A Correção:** O erro não está na Feature (Ato IV) ou no Componente (Ato III). O erro está no *Dado* (Ato II). O desenvolvedor corrige o mapeamento do token semântico.
6.  **O Resultado do Ato:** Após o commit da correção no dado (token), o pipeline passa. A arquitetura provou que a Lógica (Ato I), os Dados (Ato II), o Produto (Ato III) e a Feature (Ato IV) estão perfeitamente desacoplados.

### Conclusão: O Resultado Inevitável

A estrutura de diretórios (`core/` -> `components/design/` -> `features/`) é o mapa físico deste fluxo de dependência cronológico. Desviar desta ordem é uma violação arquitetural. Seguir esta jornada de construção é a única maneira de garantir que o resultado seja, inevitavelmente, resiliente, escalável e correto.