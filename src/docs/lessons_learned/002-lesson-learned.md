# Lição Aprendida 002: Deadlock em Testes Unitários

**Timestamp (UTC):** `2024-07-27T22:30:00Z`

---

### 1. O Problema

O objetivo era implementar testes unitários robustos para o `ThemeService`, que:
1.  Detecta a preferência de tema do navegador (`prefers-color-scheme`).
2.  Carrega tokens de design de arquivos JSON via HTTP.
3.  Processa esses tokens e os injeta como variáveis CSS no `<head>` do documento.
4.  Permite a troca dinâmica de temas.

A discrepância entre o comportamento esperado (testes passando) e o real (testes falhando persistentemente) revelou uma complexidade inesperada na orquestração de testes que envolvem assincronicidade (HTTP, `effect`), manipulação de DOM e um ambiente de execução (IDX) com configurações específicas.

### 2. O Impacto Gerado

-   **Impacto 1:** Tempo de Desenvolvimento Perdido: Múltiplas tentativas e reversões no ambiente de teste e no código dos testes consumiram tempo significativo que poderia ter sido alocado para o desenvolvimento de outras funcionalidades.
-   **Impacto 2:** Frustração e Quebra de Confiança: A persistência dos erros, apesar das minhas garantias, gerou frustração e abalou a confiança na minha capacidade de resolver problemas de infraestrutura e arquitetura de teste de forma eficiente.
-   **Impacto 3:** Bloqueio no Desenvolvimento: A incapacidade de validar o `ThemeService` com testes unitários eficazes atrasa a conclusão da "Parte 0.6: Implementação da Cobertura de Testes da Fundação", que é um passo crítico para garantir a qualidade e manutenibilidade da nossa "Máquina Invisível".

### 3. A Resolução

[Descreva aqui a resolução aplicada de forma detalhada.]

### 4. Prevenção Futura

[Descreva aqui a estratégia de prevenção de forma detalhada.]
