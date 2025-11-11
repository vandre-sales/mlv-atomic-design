# Comando `lessons`: Gerador de Documento de Lição Aprendida

O comando `lessons` automatiza e padroniza a criação de novos documentos de "Lição Aprendida", garantindo consistência e rastreabilidade.

---

## Visão Geral

Este comando foi projetado para eliminar o processo manual de criação de documentação de aprendizado. Ao fornecer um título conciso, a IA orquestra um fluxo de trabalho que lê o diretório `src/docs/lessons_learned/`, calcula o próximo número sequencial, e cria dois novos arquivos (um numerado e um com nome mnemônico) a partir do template `000-lesson-learned-template.md`. O novo documento já vem populado com o número, o título e um timestamp UTC preciso.

---

## Uso

```bash
gen lessons '<title>'
```

---

## Argumentos

-   **`<title>`** (Opcional): Um título mnemônico, claro e conciso para a lição aprendida. Deve ser envolto em aspas simples se contiver espaços.

---

## Processo de Execução

Ao invocar `gen lessons`, a IA executa o seguinte protocolo:

1.  **Análise do Diretório:** A IA escaneia a pasta `src/docs/lessons_learned/` para identificar o número sequencial mais alto já utilizado nos nomes de arquivo.
2.  **Cálculo do Novo Índice:** O próximo número sequencial é determinado incrementando o número mais alto encontrado.
3.  **Leitura do Template:** O conteúdo do arquivo `src/docs/lessons_learned/000-lesson-learned-template.md` é carregado na memória.
4.  **População Automática:** O conteúdo do template é modificado:
    -   `[NÚMERO SEQUENCIAL]` é substituído pelo novo índice.
    -   `[TÍTULO MNEMÔNICO DA LIÇÃO]` é substituído pelo `<title>` fornecido.
    -   `[AAAA-MM-DDTHH:MM:SSZ]` é substituído por um timestamp UTC no formato ISO 8601 gerado no momento da execução.
5.  **Criação dos Arquivos:** Um novo arquivo é criado na pasta `src/docs/lessons_learned/`:
    -   Um arquivo mnemônico: `[novo_índice]-[título-em-kebab-case].md`.
6.  **Confirmação:** A IA confirma a criação do arquivo, apresentando seu nome e localização.
