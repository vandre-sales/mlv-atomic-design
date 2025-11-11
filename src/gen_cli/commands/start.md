# Comando `start`: Listagem de Artefatos do Projeto

O comando `start` analisa o projeto e lista os artefatos existentes de um determinado tipo, como componentes, serviços ou rotas.

---

## Visão Geral

Uma ferramenta simples e útil para obter uma lista rápida de todos os artefatos de um tipo específico no projeto, ajudando a entender a estrutura e a encontrar arquivos rapidamente.

---

## Uso

```bash
gen start <artifactType>
```

---

## Argumentos

| Nome           | Obrigatório | Descrição                                                                      |
| :------------- | :---------- | :------------------------------------------------------------------------------- |
| `artifactType` | **Sim**     | O tipo de artefato a ser listado. Opções: `components`, `services`, `routes`, `pipes`. |

---

## Exemplo de Uso

Para listar todos os componentes standalone do projeto:
```bash
gen start components
```

Para listar todos os serviços injetáveis:
```bash
gen start services
```

## Prompt de alto nível para o agente de IA

---
