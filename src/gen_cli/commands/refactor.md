# Comando `refactor`: Refatoração de Código Automatizada

O comando `refactor` aplica as melhores práticas de codificação e padrões de arquitetura definidos no projeto a um arquivo de código específico.

---

## Visão Geral

Esta ferramenta automatiza o processo de limpeza e modernização do código, aplicando regras como a troca de `Promise` por `async/await`, a conversão para componentes standalone, a utilização de `signals`, entre outras.

---

## Uso

```bash
gen refactor <targetPath>
```

---

## Argumentos

| Nome         | Obrigatório | Descrição                                                       |
| :----------- | :---------- | :-------------------------------------------------------------- |
| `targetPath` | **Sim**     | O caminho relativo para o arquivo de código a ser refatorado.   |

---

## Exemplo de Uso

Para refatorar um componente Angular para usar as práticas mais recentes:
```bash
gen refactor src/app/components/old.component.ts
```

---

## Ação

O comando modificará o arquivo diretamente no disco. Recomenda-se o uso com um sistema de controle de versão (Git).

## Prompt de alto nível para o agente de IA
