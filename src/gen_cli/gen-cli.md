# Manual de Comandos da IA - gen-cli

Este documento serve como um manual legível por humanos para a Interface de Linha de Comando da IA (`gen-cli`). Ele é inspirado em formatos de documentação de CLI padrão para clareza e previsibilidade.

**Versão:** 2.4

---

## Uso Geral

```bash
gen <command> [arguments...]
```

> **IMPORTANTE:** Todos os comandos `gen` devem ser executados exclusivamente na **janela de chat** com o assistente de IA. Eles **não** são comandos para o terminal do sistema operacional (como Bash, PowerShell, etc.) e não funcionarão fora do ambiente de interação com a IA.

---

## Obtendo ajuda

Para ver a lista de todos os comandos ou obter ajuda para um comando específico, use a flag `--help`.

*   **Listar todos os comandos:**
    ```bash
    gen --help
    ```

*   **Ajuda para um comando específico:**
    ```bash
    gen <command> --help
    ```
    *Exemplo:*
    ```bash
    gen audit --help
    ```

---

## Comandos Disponíveis

| Comando     | Descrição Breve                                                              |
| :---------- | :--------------------------------------------------------------------------- |
| `anytomd`   | Converte o conteúdo de qualquer arquivo para uma sintaxe Markdown purista e bem estruturada. |
| `audit`     | Executa auditorias de código profundas usando estratégias de análise de fluxo (`top-down`, `bottom-up`, `militar`). |
| `hardcore`  | Ativa/desativa o modo de comunicação persistente de alta densidade ("Executor Silencioso"). |
| `lessons`   | Automatiza a criação de novos documentos de "Lição Aprendida".               |
| `mdtoyml`   | Avalia se um arquivo Markdown possui estrutura hierárquica e o converte para YAML. |
| `persona`   | Executa um "reboot mental" na IA, forçando a recarga de suas diretrizes centrais. |
| `roadmap`   | Sintetiza a visão do projeto e o código-fonte para gerar/atualizar o roadmap estratégico em `src/docs/05-roadmap.md`. |
| `refactor`  | Aplica as regras de codificação canônicas do projeto (do `GEMINI.md`) a um arquivo de código. |
| `start`     | Indexa e lista todos os artefatos de um determinado tipo no projeto (componentes, serviços, etc.). |
| `status`    | Lê o arquivo de status do projeto, reporta o progresso e, opcionalmente, sincroniza-o com o código-fonte. |
| `tutorial`  | Gera um tutorial ultra-granular em Markdown. Ex: `gen tutorial --topic "Meu Tópico"` |

---
