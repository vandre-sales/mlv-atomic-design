# Desenvolvendo a Extensão VS Code "Project Sentinel" (md2checklist)

**ID do Tutorial:** `005`
**Timestamp (UTC):** `2024-05-21T20:45:00Z`
**Versão:** 2.1.0

---

## Objetivo do Tutorial

Criar uma extensão para o Visual Studio Code, batizada de "Project Sentinel", que adota o paradigma de "Documentação como Código" para o gerenciamento de projetos. A extensão irá escanear arquivos Markdown, extrair itens de trabalho (Épicos, Partes, Tarefas, Passos) a partir de uma microssintaxe hierárquica, e sincronizá-los com um banco de dados SQLite local. O resultado é uma `TreeView` interativa na Activity Bar do VS Code que serve como um reflexo em tempo real do plano do projeto.

## Conceito de Pronto

-   A extensão é instalável e ativável no VS Code.
-   **Fonte da Verdade:** Os arquivos `.md` são a única fonte da verdade. Qualquer alteração neles (adição, remoção, edição de tarefas) é refletida na UI da extensão após salvar.
-   **CRUD Robusto:** A sincronização entre o Markdown e o banco de dados lida de forma transparente com todas as operações CRUD (Create, Read, Update, Delete) através de uma lógica de reconciliação.
-   **UI Hierárquica:** A `TreeView` da extensão exibe corretamente a estrutura aninhada de Épicos, Partes, Tarefas e Passos.

---

## Sumário

### Épico 1: Fundação Arquitetural e Contrato de Dados
- **Parte 1.1:** Gerando o Esqueleto da Extensão com `yo code`.
- **Parte 1.2:** Definindo a Microssintaxe Hierárquica (O Contrato).
- **Parte 1.3:** Projetando o Esquema do Banco de Dados para a Hierarquia.
- **Parte 1.4:** Adicionando Dependências Essenciais (`better-sqlite3`).

### Épico 2: O Núcleo de Sincronização
- **Parte 2.1:** Implementando o `FileSystemWatcher` para Detecção de Mudanças.
- **Parte 2.2:** Criando o `ParserService` para a Microssintaxe Hierárquica.
- **Parte 2.3:** Desenvolvendo o `DatabaseService` com Lógica de Reconciliação (CRUD).

### Épico 3: Interface com o Usuário
- **Parte 3.1:** Registrando a `TreeView` na Activity Bar.
- **Parte 3.2:** Implementando um `TreeDataProvider` para Exibir os Itens de Trabalho.
- **Parte 3.3:** Adicionando Comandos e Interatividade (ex: Ir para a Linha no Arquivo).

---

## Detalhes do Tutorial

### Épico 1: Fundação Arquitetural e Contrato de Dados

**Objetivo do Épico:** Estabelecer a base do projeto, as dependências e, mais importante, o "contrato" que define como os dados serão estruturados no Markdown e no banco de dados.

#### Parte 1.2: Definindo a Microssintaxe Hierárquica (O Contrato)

**Propósito:** Formalizar a sintaxe exata dentro dos arquivos Markdown que a extensão reconhecerá como itens de trabalho. Esta é a regra mais importante do sistema.

**Passo 1.2.1:** Estabelecer a Estrutura Hierárquica e de Status.
1.  **Ação:** Definir os níveis (Épico, Parte, Tarefa, Passo) e seus respectivos indicadores de status.
2.  **Sintaxe Oficial:**
    ```markdown
    ## Legenda de Status
    - **ÉPICO**
      - [💙] **Épico Pendente**.
      - [🧡] **Épico em Progresso**.
      - [💚] **Épico Concluído**.
    - **Parte**
      - [🟦] **Parte Pendente**.
      - [🟧] **Parte em Progresso**.
      - [🟩] **Parte Concluída**.
    - **Tarefa**
      - [🔵] **Tarefa Pendente**.
      - [🟠] **Tarefa em Progresso**.
      - [🟢] **Tarefa Concluída**.
    - **Passo**
      - [🔷] **Passo Pendente**.
      - [🔶] **Passo em Progresso**.
      - [✅] **Passo Concluído**.

    ### [🧡] TÍTULO DO ÉPICO
    *Propósito: O propósito do épico.*

    #### [🟩] Parte 1.1: NOME DA PARTE
    - [🟢] **Tarefa 1.1.1:** DESCRIÇÃO DA TAREFA.
      - [✅] **Passo 1.1.1.1:** DESCRIÇÃO DO PASSO.
    ```
3.  **Checkpoint:** A sintaxe é clara, legível por humanos e estruturada para parsing, usando cabeçalhos (`###`, `####`) e listas (`-`, `  -`) para definir a hierarquia.

#### Parte 1.3: Projetando o Esquema do Banco de Dados para a Hierarquia

**Propósito:** Criar uma estrutura de tabela no SQLite que possa armazenar com eficiência os itens de trabalho e suas relações hierárquicas.

**Passo 1.3.1:** Desenhar a Tabela `work_items`.
1.  **Ação:** Definir a estrutura da tabela que espelhará a microssintaxe.
2.  **SQL `CREATE TABLE`:**
    ```sql
    CREATE TABLE work_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_id INTEGER, -- Chave estrangeira para si mesma, define a hierarquia
        level TEXT NOT NULL CHECK(level IN ('EPIC', 'PART', 'TASK', 'STEP')),
        status TEXT NOT NULL, -- O emoji de status
        title TEXT NOT NULL,
        purpose TEXT, -- Aplicável a épicos
        source_file TEXT NOT NULL,
        source_line INTEGER NOT NULL,
        is_stale INTEGER DEFAULT 0, -- Flag para a lógica de reconciliação
        FOREIGN KEY (parent_id) REFERENCES work_items(id) ON DELETE CASCADE
    );
    ```
3.  **Checkpoint:** O esquema com `parent_id` permite reconstruir a árvore de tarefas. O campo `is_stale` é crucial para a lógica de CRUD.

### Épico 2: O Núcleo de Sincronização

**Objetivo do Épico:** Implementar a lógica central que detecta mudanças, analisa o conteúdo dos arquivos e sincroniza o estado do banco de dados para refletir a verdade contida no Markdown.

#### Parte 2.3: Desenvolvendo o `DatabaseService` com Lógica de Reconciliação (CRUD)

**Propósito:** Garantir que o banco de dados seja um espelho fiel do arquivo Markdown, lidando com todas as formas de mudança (adição, edição, exclusão) de forma atômica e eficiente.

**Passo 2.3.1:** Implementar a Estratégia de Sincronização "Mark and Sweep".
1.  **Ação:** Criar um método `synchronize(filePath, parsedItems)` que orquestra a lógica de CRUD.
2.  **Pseudo-código do Fluxo:**
    ```typescript
    function synchronize(filePath, parsedItems) {
      db.transaction(() => {
        // 1. MARK: Marcar todos os itens existentes do arquivo como obsoletos.
        db.prepare("UPDATE work_items SET is_stale = 1 WHERE source_file = ?").run(filePath);

        // 2. SWEEP (UPSERT): Iterar sobre os itens recém-parseados.
        for (const item of parsedItems) {
          const existing = db.prepare("SELECT id FROM work_items WHERE source_file = ? AND source_line = ?").get(filePath, item.line);
          if (existing) {
            // UPDATE: Se existe, atualize-o e remova a marca de obsoleto.
            db.prepare("UPDATE work_items SET ..., is_stale = 0 WHERE id = ?").run(..., existing.id);
          } else {
            // CREATE: Se não existe, insira-o.
            db.prepare("INSERT INTO work_items (...) VALUES (...)").run(...);
          }
        }

        // 3. SWEEP (DELETE): Remover todos os itens que ainda estão marcados como obsoletos.
        db.prepare("DELETE FROM work_items WHERE source_file = ? AND is_stale = 1").run(filePath);
      })();
    }
    ```
3.  **Checkpoint:** A lógica de transação garante a atomicidade, e o fluxo de `Mark -> Upsert -> Delete` lida de forma robusta com todas as operações CRUD em uma única passagem.
