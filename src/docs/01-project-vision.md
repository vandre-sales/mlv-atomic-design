# Manifesto da Arquitetura `mlv-atomic-design`: A Fonte Única da Verdade
**Versão:** 1.0 (Canônica)
**Status:** Inviolável
**Público-alvo:** Liderança de Produto, Gerentes de Projeto, Arquitetos de Software

Este documento é a constituição que governa a **construção** do `mlv-atomic-design`, a materialização da nossa arquitetura unificada de excelência. Ele é a fonte canônica e absoluta da nossa filosofia, nossas leis de engenharia e nossa visão inabalável.

Para a equipe que inicia esta jornada de construção, estas palavras são a diretriz primária.

---

## Parte I: A Filosofia — A Alma Inegociável da Nossa Arquitetura

Antes que uma única linha de código seja escrita, esta mentalidade deve ser adotada. Nossa arquitetura é construída sobre pilares filosóficos que definem cada decisão.

### 1.1. A Diretriz Primária: A Obsessão pela Redução do Esforço Cognitivo
Nosso objetivo final é construir produtos que se sintam **intuitivos, previsíveis e sem esforço**. Cada decisão de design e cada fluxo de interação devem ser medidos contra uma única pergunta: **"Isso está tornando a vida do nosso usuário mais fácil ou mais difícil?"**.

### 1.2. O Princípio da Dualidade: A Ferramenta vs. O Produto
Nós construímos dois produtos que coexistem de forma simbiótica, mas devem permanecer independentes:
1.  **A Ferramenta:** A "casca" da aplicação (cabeçalhos, navegação, painéis).
2.  **O Produto:** A área de conteúdo principal, a "vitrine" da proposta de valor.
**A Ferramenta pode agir sobre o Produto, mas o Produto nunca deve ter conhecimento da Ferramenta**. Manter essa pureza é nossa principal diretriz arquitetural.

### 1.3. A Filosofia da Interação: Guardiões da Consistência
Nós construímos **assistentes inteligentes** que previnem erros. O princípio é inegociável: **Nós oferecemos seleções guiadas, não campos de texto livres**. A interface deve consumir uma "paleta de opções" pré-aprovadas (tokens de design) e restringir a escolha do usuário a esse universo.

### 1.4. A Filosofia da Tutela: Guardiões Preditivos da Acessibilidade
A acessibilidade é um pilar da nossa arquitetura. Nossas ferramentas não são auditoras passivas; elas são **guardiãs preditivas** que previnem o erro antes que ele aconteça, garantindo que o resultado seja, por padrão, inclusivo.

---

## Parte II: As Leis da Engenharia — Os Pilares da Execução

Nossa filosofia é sustentada por leis de engenharia inegociáveis. Elas garantem que nossa base de código seja robusta, resiliente e elegante. A ordem destas leis reflete a **ordem cronológica obrigatória de implementação**.

### 2.1. Lei nº 1: O Motor de Estilo Como Alicerce Absoluto
A primeira fase do projeto é construir o motor que governa a aparência visual. Este motor é composto pela **Arquitetura de Microsserviços** (que gerencia o estado dos tokens) e pela **Blindagem de Tokens (`--mlv-`)**, que garante que nosso sistema seja a única fonte da verdade. **Toda a aparência visual DEVE ser controlada por este motor**. Iniciar pela UI antes deste motor é uma violação arquitetural.

### 2.2. Lei nº 2: O Gerenciamento de Contexto Como Estrutura Global
Com o motor de estilo funcional, a segunda fase é construir os serviços que gerenciam os **contextos globais**:
-   **Multi-tema (Claro/Escuro)**
-   **Responsividade**
-   **Internacionalização (i18n)**
Estes são propriedades intrínsecas da fundação, não "features".

### 2.3. Lei nº 3: O Cânone do Atomic Design Como Vocabulário Universal
Apenas com as Leis 1 e 2 em vigor, estamos prontos para construir a biblioteca de componentes de UI. A metodologia **Atomic Design** é o nosso vocabulário canônico:
-   **Átomos** (botões, inputs)
-   **Moléculas** (um campo de busca)
-   **Organismos** (o cabeçalho do site)
Cada componente deve ser puro e construído sobre a fundação estabelecida.

### 2.4. Lei nº 4: A Auditoria Ativa Como Guardiã da Qualidade
A camada final é a de **assistência e auditoria**. Serviços (ex: `AccessibilityService`) operam sobre o sistema existente para analisar, validar e ajudar o usuário. Esta camada depende logicamente da existência das três primeiras.

---

## Parte III: O Roteiro Mestre de Implementação — A "Missão Gênesis"

A "Missão Gênesis" é o roteiro mestre conceitual para a construção do `mlv-atomic-design`. Ele traduz as Leis da Engenharia em um plano de ação.

-   **Épico 0: A Fundação Inabalável (A Máquina Invisível)**
    -   **Foco:** Implementar as Leis nº 1 e nº 2. Construir todos os microsserviços de tokens, o gerador de CSS, e os serviços de tema, responsividade e i18n. O resultado é o esqueleto funcional da aplicação.

-   **Épico 1: A Forja dos Primitivos (A Paleta de Opções)**
    -   **Foco:** Construir as interfaces que permitem a visualização e edição dos tokens primitivos (as "opções" de design, como paletas de cores e escalas de espaçamento).

-   **Épico 2: O Nascimento da Semântica (As Decisões de Design)**
    -   **Foco:** Construir "laboratórios interativos" para aplicar as "decisões" de design (ex: mapear `blue-500` para `background-primary`) de forma visual e intuitiva.

-   **Épico 3: A Biblioteca Atômica (O Produto Final)**
    -   **Foco:** Implementar a Lei nº 3. Construir a biblioteca completa de componentes de UI (Átomos, Moléculas, Organismos) sobre a fundação de tokens.

-   **Épico 4: A Camada de Inteligência e Entrega**
    -   **Foco:** Implementar a Lei nº 4. Construir as ferramentas de auditoria (acessibilidade) e implementar a funcionalidade de **Exportar**, que gera os artefatos de engenharia (`.css`, `.json`) para consumo externo.

---

## Parte IV: O Contrato de Conformidade e a Definição de "Pronto"

-   **Fonte Única da Verdade:** Este documento e seus irmãos na pasta `docs/` são a fonte canônica e absoluta da verdade.

-   **O Mandato:** A conformidade com os princípios e leis aqui descritos não é opcional. É o contrato que garante que o `mlv-atomic-design` atinja seu objetivo de excelência unificada.

-   **Definição de "Pronto" (v1.0):** O `mlv-atomic-design` é considerado "Pronto" quando:
    1.  Toda a sua aparência visual é governada pelo seu próprio motor de tokens (Lei nº 1).
    2.  Suporta nativamente os contextos globais de tema, responsividade e internacionalização (Lei nº 2).
    3.  A biblioteca de componentes (Átomos, Moléculas, Organismos) está implementada, validada e segue os padrões de pureza (Lei nº 3).
    4.  As ferramentas de auditoria de acessibilidade estão ativas e o sistema atende, no mínimo, aos padrões WCAG 2.1 nível AA (Lei nº 4).
    5.  A funcionalidade de "Exportar" (Épico 4) está gerando artefatos de engenharia estáveis e consumíveis.