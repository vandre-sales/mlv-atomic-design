# Conceito do Projeto `mlv-atomic-design`: O Manual de Construção Defensiva
**Versão:** 1.0 (Canônica e Fortalecida)
**Status:** Inviolável
**Público-alvo:** Arquitetos de Software, Engenheiros de Frontend, Liderança Técnica

Este documento é a fonte canônica e o manual de arquitetura defensiva para a **construção** do ecossistema `mlv-atomic-design`. Ele traduz a filosofia do `01-project-vision.md` em um plano sequencial.

Ele antecipa os pontos de falha, as armadilhas de implementação e as violações de princípio que podem comprometer a integridade do sistema desde o início. O objetivo é garantir que a equipe compreenda não apenas **o que** construir, mas **como pensar** e **o que evitar**. Aderir a este manual de arquitetura defensiva é a única maneira de garantir que o `mlv-atomic-design` cumpra sua promessa de resiliência.

---

## A Lógica Sistêmica: A Cadeia de Valor da Construção

Cada "Épico" é um estágio de maturação. A seguir, detalhamos a cadeia de dependência e as diretrizes de arquitetura defensiva para cada fase.

### Épico 0: A Fundação — O Sistema Nervoso Central

* **O Que é:** A implementação das Leis da Engenharia nº 1 (Motor de Estilo) e nº 2 (Gerenciamento de Contexto). É a criação de todos os microsserviços que gerenciam o estado dos tokens de design e os serviços globais de tema, responsividade e i18n.
* **Anti-Padrão Comum:** Criar um `ThemeService` monolítico ("God Object") que busca dados, processa CSS e injeta no DOM. Este padrão viola o Princípio da Responsabilidade Única (SRP) e torna a reatividade em tempo real impossível.
* **A Diretriz do Arquiteto Sênior:** **O Estado é um Pipeline, não um Serviço.** A fundação DEVE ser construída como um pipeline de microsserviços atômicos: `TokenStateService` (armazena o `signal`), `CssGeneratorService` (gera a string), `StyleInjectorService` (toca o DOM) e `DesignTokenService` (orquestra o `effect()`).
* **Checklist de Pureza:**
    * [ ] O `ThemeService` (ou `DesignTokenService`) está livre de lógica, contendo apenas o `effect` orquestrador?
    * [ ] A geração da string CSS e a injeção no DOM estão em serviços separados e puros?
    * [ ] A reatividade (`signal` -> `effect` -> injeção) está funcional antes de qualquer UI ser construída?

---

### Épico 1: A Forja dos Primitivos — A Paleta de Opções

* **O Que é:** A construção dos laboratórios de UI para visualizar e **editar** os tokens primitivos.
* **Anti-Padrão Comum:** Armazenar dados estáticos que podem ser computados. Definir paletas de cores (ex: `blue-50` a `blue-950`) em arquivos `.json` ou `.ts` estáticos, criando dívida de manutenção.
* **A Diretriz do Arquiteto Sênior:** **Lógica como Dados.** O sistema deve armazenar apenas a "semente" (ex: a cor mestra `blue-500`). Um `PaletteGenerationService` DEVE ser usado para gerar dinamicamente o restante da paleta em tempo real. O `TokenOrchestratorService` deve interceptar a edição da semente e acionar a regeneração.
* **Checklist de Pureza:**
    * [ ] Os arquivos de tokens primitivos contêm apenas as cores "semente" (ex: tom `500`)?
    * [ ] A UI de edição de primitivos chama o `TokenOrchestratorService` (Aduana), não o `TokenStateService` (Cofre)?
    * [ ] Mudar uma cor semente regenera e injeta a paleta inteira em tempo real?

---

### Épico 2: O Nascimento da Semântica — As Decisões de Design

* **O Que é:** A construção dos laboratórios de UI para mapear tokens Primitivos para tokens Semânticos (ex: `background-primary` = `white.full`).
* **Anti-Padrão Comum:** Mapeamento direto na camada de consumo. O `CssGeneratorService` gera `var(--color-background-primary): #FFFFFF`. Isso torna a depuração impossível, remove a blindagem e acopla a intenção (semântica) ao valor bruto (primitivo).
* **A Diretriz do Arquiteto Sênior:** **Blindagem de Namespace Inviolável (`--mlv-`).** O `CssGeneratorService` DEVE gerar duas camadas: A API Privada (`--mlv-color-white: #FFF;`) e a API Pública (`--color-background-primary: var(--mlv-color-white);`). O `TokenResolverService` é o dicionário puro que traduz aliases para variáveis `--mlv-`.
* **Checklist de Pureza:**
    * [ ] A string CSS injetada contém as duas camadas de variáveis (`--mlv-` e `--color-`)?
    * [ ] A API Pública (ex: `--color-background`) contém *apenas* ponteiros (`var(...)`) e nunca valores hexadecimais?
    * [ ] O `TokenResolverService` é puro (sem estado) e apenas traduz aliases?

---

### Épico 3: A Biblioteca Atômica — O Produto

* **O Que é:** A implementação da Lei nº 3, construindo a biblioteca de componentes (Átomos, Moléculas, Organismos).
* **Anti-Padrão Comum:** "Estilização de componente". Aplicar estilos diretamente no `.scss` do componente ou usar classes de utilitário (ex: `bg-blue-500`, `p-4`) no template `.html`. Isso viola o Protocolo de Estilização Inviolável.
* **A Diretriz do Arquiteto Sênior:** **Separação de Identidade e Estilo.** Componentes (Átomos) são puros e estruturais. O `ButtonComponent` usa `hostClasses()` para aplicar sua *identidade* (ex: `.ds-button .primary .md`). O `CssGeneratorService` (Lei nº 1) é o único local que define a *aparência* dessas classes de identidade.
* **Checklist de Pureza:**
    * [ ] O template `.html` do componente está 100% livre de classes de aparência do Tailwind?
    * [ ] A aparência do componente (cor, preenchimento) é aplicada *apenas* por classes de identidade (ex: `.ds-button`)?
    * [ ] O `CssGeneratorService` contém a lógica de estilo para essas classes de identidade?

---

### Épico 4: A Camada de Inteligência e Entrega

* **O Que é:** Implementação da Lei nº 4. Construção das ferramentas de auditoria (acessibilidade) e a funcionalidade de "Exportar" (ex: `.css`, `.json`).
* **Anti-Padrão Comum:** Auditoria como um relatório informativo que pode ser ignorado. Implementar a função de "Exportar" como um despejo de dados sem validação ou estrutura.
* **A Diretriz do Arquiteto Sênior:** **A Qualidade como um Portão, não como um Conselho.** A auditoria de acessibilidade não é uma sugestão; é um **gatekeeper**. O pipeline de CI/CD deve falhar se os tokens gerarem violações (ex: contraste). A função de Exportar deve gerar artefatos que seguem um **esquema de versão (Schema Versioning)**.
* **Checklist de Pureza:**
    * [ ] O pipeline de build está configurado para falhar se as regras de acessibilidade forem violadas?
    * [ ] Os artefatos exportados (CSS, JSON) têm uma versão e um contrato claros?
    * [ ] A camada de auditoria é um serviço desacoplado?

---

## Conclusão: O Contrato de Disciplina Arquitetural

A violação da ordem ou das diretrizes de pureza descritas neste documento não é um atalho. É uma invalidação da arquitetura e uma garantia de débito técnico exponencial. Aderir a este manual de arquitetura defensiva é o contrato para garantir que o `mlv-atomic-design` cumpra sua promessa.