# Comando `tutorial`: Gerador de Documento de Tutorial

O comando `tutorial` automatiza e padroniza a criação de novos tutoriais, garantindo consistência e rastreabilidade.

---

## Visão Geral

Este comando foi projetado para eliminar o processo manual de criação de documentação técnica. O usuário fornece um `topic` e a IA orquestra um fluxo de trabalho que lê o diretório `src/docs/tutorials/`, calcula o próximo número sequencial, e cria dois novos arquivos (um numerado e um com nome mnemônico) a partir do template `000-tutorial-template.md`. O novo documento já vem populado com o ID, o título e um timestamp UTC preciso, pronto para que a IA gere o conteúdo do tutorial.

---

## Uso

```bash
gen tutorial <topic> [sourcePath]
```

---

## Argumentos

-   **`<topic>`** (Obrigatório): O tema central ou o título do tutorial a ser criado.
-   **`[sourcePath]`** (Opcional): O caminho para um arquivo que servirá de contexto ou base para o conteúdo do tutorial.

---

## Processo de Execução

Ao invocar `gen tutorial`, a IA executa o seguinte protocolo:

1.  **Análise do Diretório:** A IA escaneia a pasta `src/docs/tutorials/` para identificar o número sequencial mais alto já utilizado.
2.  **Cálculo do Novo Índice:** O próximo número sequencial é determinado incrementando o número mais alto encontrado.
3.  **Leitura do Template:** O conteúdo do arquivo `src/docs/tutorials/000-tutorial-template.md` é carregado na memória.
4.  **População de Metadados:** O conteúdo do template é modificado:
    -   `[NÚMERO SEQUENCIAL]` é substituído pelo novo índice.
    -   `[TÍTULO DO TUTORIAL]` é substituído pelo `<topic>` fornecido.
    -   `[AAAA-MM-DDTHH:MM:SSZ]` é substituído por um timestamp UTC no formato ISO 8601.
5.  **Geração do Conteúdo:** A IA, atuando como um Escritor Técnico, gera o restante do conteúdo do tutorial com base no `<topic>` e no `[sourcePath]` (se fornecido).
6.  **Criação dos Arquivos:** Um novoo arquivo é criado na pasta `src/docs/tutorials/`:
    -   Um arquivo mnemônico: `[novo_índice]-[tópico-em-kebab-case].md`.
7.  **Confirmação:** A IA confirma a criação dos arquivos, apresentando seus nomes e localização.
