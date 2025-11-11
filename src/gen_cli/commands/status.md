# Comando `status`: Relatório de Progresso do Projeto

O comando `status` fornece uma visão geral do estado atual do projeto, lendo e interpretando o arquivo `src/docs/06-status.md`. Ele serve como um "pulso" rápido para entender o progresso, identificar bloqueios e alinhar os próximos passos.

---

## Visão Geral

Use este comando para obter um resumo conciso do andamento do projeto sem precisar navegar por múltiplos arquivos. Ele é especialmente útil em cenários de desenvolvimento ágil para manter a equipe sincronizada. O comando também oferece uma funcionalidade de "sincronização" para garantir que o arquivo de status reflita a realidade do código-fonte.

---

## Modos de Operação

### `gen status` (Modo Padrão)
-   **Leitura e Análise:** Lê o arquivo `src/docs/06-status.md`.
-   **Relatório Conciso:** Informa o estado geral (ex: "Em andamento", "Bloqueado").
-   **Próximos Passos:** Lista as próximas tarefas planejadas se o projeto estiver em andamento.
-   **Análise de Bloqueio:** Se bloqueado, explica a causa e sugere os passos necessários para o desbloqueio.

### `gen status --sync`
-   Executa todas as ações do comando base.
-   Adicionalmente, escaneia o código-fonte para verificar se as tarefas marcadas como "concluídas" no `.md` correspondem a funcionalidades implementadas.
-   Gera a árvore de diretórios e arquivos de `/home/user/mlv-atomic-angular/*` e atualiza o arquivo `src/docs/07-project-tree.md`.
-   Atualiza o arquivo `src/docs/06-status.md` para corrigir discrepâncias.

---

## Exemplo de Uso

Para obter um relatório do status atual do projeto:
```bash
gen status
```

Para ler o status e sincronizá-lo com o código:
```bash
gen status --sync
```

## Prompt de alto nível para o agente de IA

Sua tarefa é atuar como um Gerente de Projeto.

1.  **Leia e Analise:** Leia o conteúdo do arquivo `src/docs/06-status.md`.
2.  **Reporte o Status:**
    -   Informe se o projeto está `em andamento` ou `bloqueado`.
    -   Se `em andamento`, liste os próximos passos.
    -   Se `bloqueado`, explique a causa e sugira ações para desbloqueio.
3.  **Sincronize (se `--sync` for usado):**
    -   Compare o status das tarefas no arquivo de status com o código-fonte real.
    -   Gere a árvore de diretórios e arquivos do projeto e atualize `src/docs/07-project-tree.md`.
    -   Atualize o arquivo `src/docs/06-status.md` para refletir com precisão o estado de implementação das funcionalidades.
