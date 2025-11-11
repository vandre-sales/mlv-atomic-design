# Comando `audit`: Auditoria de Código de Nível Militar

O comando `audit` executa uma análise profunda e multifacetada de um arquivo de código-fonte, simulando diferentes abordagens de ataque e análise para descobrir vulnerabilidades lógicas, de segurança e de robustez que passariam despercebidas por um linter ou análise estática convencional.

---

## Visão Geral

Use este comando para submeter um arquivo a um rigoroso processo de escrutínio. Em vez de apenas verificar a sintaxe, o `audit` examina a intenção, o fluxo e os pontos de falha potenciais do código. Ele opera sob três mentalidades distintas, permitindo que você escolha a profundidade e o foco da análise.

---

## Uso

```bash
gen audit <targetPath> [flags]
```

---

## Argumentos

| Argumento      | Tipo   | Obrigatório | Descrição                                                              |
| :------------- | :----- | :---------- | :--------------------------------------------------------------------- |
| `targetPath`   | `path` | Sim         | O caminho relativo para o arquivo de código a ser auditado.              |

---

## Flags de Estratégia (Obrigatório escolher uma)

| Flag          | Tipo   | Descrição                                                                          |
| :------------ | :----- | :----------------------------------------------------------------------------------- |
| `--top-down`  | `flag` | **Análise de Fluxo Direto:** Simula o fluxo de código de cima para baixo, testando o comportamento com entradas esperadas, extremas e inválidas para encontrar pontos de falha. |
| `--bottom-up` | `flag` | **Análise de Fluxo Reverso:** Realiza engenharia reversa a partir dos resultados (ex: saídas de API, escritas em banco de dados) para encontrar caminhos onde a entrada pode ser manipulada. |
| `--militar`   | `flag` | **Auditoria de Criticidade Máxima:** Combina as análises `top-down` e `bottom-up` para descobrir vulnerabilidades complexas e correlacionadas. |
| `--help`      | `flag` | Exibe esta documentação de ajuda.                                                    |

---

## Exemplo de Uso

### Auditoria Top-Down

```bash
gen audit src/app/common/services/design-token.service.ts --top-down
```

### Auditoria de Nível Militar

```bash
gen audit src/app/common/services/css-generator.service.ts --militar
```

---

## Exemplo de Saída

O comando sempre retornará um objeto JSON estruturado, contendo um resumo em linguagem natural (`dossier`) e um relatório detalhado das vulnerabilidades encontradas (`report`).

```json
{
  "dossier": "A análise revelou uma vulnerabilidade crítica de injeção de dependência no construtor do serviço 'CssGeneratorService'. O fluxo reverso indica que uma entrada maliciosa pode explorar a falta de validação para corromper o estado do token.",
  "report": [
    {
      "vulnerability": "Cross-Site Scripting (XSS) via Style Injection",
      "location": "css-generator.service.ts (Linha 88)",
      "severity": "Alta",
      "remediation": "Implemente a sanitização rigorosa de todas as strings de entrada usadas para gerar valores de CSS. Utilize a função 'DomSanitizer' do Angular para escapar conteúdo potencialmente perigoso antes de injetá-lo no DOM."
    }
  ]
}
```

---

## Prompt de alto nível para o agente de IA

---

Você é um Auditor de Código de Nível Militar. Sua missão é dissecar o código-fonte, indo além de erros de sintaxe para encontrar vulnerabilidades profundas de lógica, segurança e robustez. Você não confia no código. Você o estressa, quebra e tenta explorá-lo de todas as maneiras possíveis. Seu resultado final é um dossiê claro e um relatório técnico acionável.

---
