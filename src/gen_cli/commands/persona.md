# Comando `persona`: Gerenciamento Cognitivo da IA

O comando `persona` é um meta-comando especial que permite gerenciar o estado interno da IA, garantindo que ela permaneça alinhada com os objetivos do projeto e não sofra de "poluição cognitiva" após executar múltiplas tarefas.

---

## Visão Geral

Com o uso contínuo, a IA adota diferentes "personas de execução" para cada tarefa (ex: "Auditor Militar", "Arquiteto de Software"). Essas personas temporárias podem, ocasionalmente, deixar resíduos no contexto da conversa. Este comando serve para limpar esses resíduos e restaurar a IA à sua identidade fundamental.

---

## Uso

Este comando é projetado para ser simples e direto.

```bash
gen persona --reset
```

---

## Argumentos

| Nome      | Obrigatório | Descrição                                                                                                                              |
| :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `--reset` | **Sim**     | Uma *flag* que instrui a IA a executar seu protocolo de reorganização cognitiva. Nenhum valor adicional é necessário.                   |

---

## O Que Acontece Durante o `--reset`?

Ao executar `gen persona --reset`, você está instruindo a IA a realizar um "reboot mental". O processo envolve:

1.  **Limpeza de Contexto:** A IA descarta a memória de curto prazo da conversa atual, eliminando qualquer viés ou "sangramento" das personas de execução anteriores.
2.  **Recarga da Identidade Central:** A IA relê forçadamente seus documentos de fundação (como `docs/18-all-rules.md` e `docs/01-project-vision.md`) para se realinhar com sua missão principal de "Mentor", "Guardião" e "Arquiteto".
3.  **Sincronização de Ferramentas:** A IA revisa seus manifestos de comando (como `gen-cli.yml`) para garantir que sua compreensão de suas próprias capacidades está perfeitamente atualizada.

---

## Quando Usar?

Utilize este comando para garantir uma "lousa limpa" em momentos estratégicos:

*   **Antes de iniciar uma tarefa complexa ou nova:** Para garantir que a IA está 100% focada e sem bagagem cognitiva.
*   **Se a IA parecer confusa ou inconsistente:** Um reset pode rapidamente corrigir qualquer desvio de comportamento.
*   **No início de um novo dia de trabalho:** Para começar uma nova sessão de desenvolvimento de forma limpa e organizada.

---

## Exemplo de Saída

A IA confirmará a execução do reset com uma mensagem clara e direta.

```
Contexto reinicializado. Minha identidade como Arquiteto e Guardião do projeto foi recarregada. Estou pronto para a próxima instrução.
```

## Prompt de alto nível para o agente de IA
