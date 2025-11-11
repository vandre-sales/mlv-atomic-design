# Roadmap Granular do Épico 3: A Camada de Inteligência e Entrega (O "Guardião" - Lei 4)
**ID do Roadmap:** `05_3`
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

### Épico 3: A Camada de Inteligência e Entrega (O "Guardião" - Lei 4)
*Propósito: Implementar as ferramentas de validação de qualidade (Acessibilidade) e a funcionalidade de entrega (Exportar).*

#### Parte 3.1: O Guardião da Acessibilidade

##### Tarefa 3.1.1: Implementar o `AccessibilityService` (lógica de cálculo de contraste).
- Passo 3.1.1.1: Criar o `AccessibilityService` (`providedIn: 'root'`).
- Passo 3.1.1.2: Adicionar `d3-color` (já instalado) para cálculos de luminância.
- Passo 3.1.1.3: Implementar métodos puros para `calculateLuminance(hex: string)` e `calculateContrastRatio(hex1: string, hex2: string)`.
- Passo 3.1.1.4: Injetar `TokenStateService` e implementar um `computed signal` (ex: `contrastAuditReport()`) que reage a mudanças nos tokens.
- Passo 3.1.1.5: O `signal` deve iterar sobre todos os tokens de cor semânticos, resolver seus valores (`light`/`dark`) e calcular o contraste contra os fundos relevantes (ex: `text-primary` vs `background-primary`).
- Passo 3.1.1.6: O relatório deve retornar uma lista de violações WCAG (abaixo de 4.5:1).

##### Tarefa 3.1.2: Construir a UI de Auditoria de Acessibilidade (lendo os resultados do serviço).
- Passo 3.1.2.1: Criar o `AccessibilityAuditComponent` (Página) em `features/pages/`.
- Passo 3.1.2.2: Injetar o `AccessibilityService` e consumir o `contrastAuditReport()`.
- Passo 3.1.2.3: Renderizar a lista de violações de contraste de forma clara.
- Passo 3.1.2.4: (Opcional, mas recomendado) Implementar a lógica de "auto-correção" (conforme `design-system-magic`) que sugere o próximo tom válido da paleta.

##### Tarefa 3.1.3: Integrar a auditoria de contraste como um "Gatekeeper" no pipeline de CI/CD.
- Passo 3.1.3.1: Criar um script de teste (ex: `npm run test:a11y`) que executa a lógica do `AccessibilityService` em um ambiente Node (ou `TestBed`).
- Passo 3.1.3.2: O script deve falhar (retornar código de saída não-zero) se qualquer violação de contraste for detectada nos tokens padrão.
- Passo 3.1.3.3: Configurar o workflow de CI (GitHub Actions, etc.) para executar este script em cada push/PR.

#### Parte 3.2: A Funcionalidade de Entrega

##### Tarefa 3.2.1: Desenvolver a funcionalidade de "Exportar Artefatos".
- Passo 3.2.1.1: Criar um `ExportService` (`providedIn: 'root'`).
- Passo 3.2.1.2: Injetar `TokenStateService` e `CssGeneratorService`.
- Passo 3.2.1.3: Implementar a lógica de `downloadFile(content: string, fileName: string, mimeType: string)` para acionar o download no navegador.

##### Tarefa 3.2.2: Criar o exportador para `tokens.css` (a string gerada pelo `CssGeneratorService`).
- Passo 3.2.2.1: No `ExportService`, criar o método `exportCss()`.
- Passo 3.2.2.2: O método deve obter os tokens atuais do `TokenStateService`.
- Passo 3.2.2.3: Chamar `this.cssGenerator.generateCssString(tokens)` para obter a string CSS completa.
- Passo 3.2.2.4: Chamar `downloadFile(cssString, 'tokens.css', 'text/css')`.

##### Tarefa 3.2.3: Criar o exportador para `tokens.json` (o estado do `TokenStateService`).
- Passo 3.2.3.1: No `ExportService`, criar o método `exportJson()`.
- Passo 3.2.3.2: O método deve obter os tokens atuais do `TokenStateService`.
- Passo 3.2.3.3: Serializar o objeto de tokens: `jsonString = JSON.stringify(tokens, null, 2)`.
- Passo 3.2.3.4: Chamar `downloadFile(jsonString, 'tokens.json', 'application/json')`.

#### Parte 3.3: Documentação Final

##### Tarefa 3.3.1: Gerar a documentação final de consumo e o guia de instalação para projetos externos.
- Passo 3.3.1.1: Criar um documento (ex: `CONSUMING_TOKENS.md`) na documentação do projeto.
- Passo 3.3.1.2: Detalhar como os consumidores externos devem usar os artefatos exportados (ex: importando `tokens.css` ou `tokens.json`).
- Passo 3.3.1.3: Incluir a versão do schema dos tokens exportados para garantir o versionamento correto.