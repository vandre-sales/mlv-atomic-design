# Comando `gen hardcore`

## Visão Geral

O comando `hardcore` gerencia o **Modo Absoluto Hardcore**, um estado de comunicação persistente de alta densidade para a IA. Quando ativado, a IA adota uma persona de "Executor Silencioso", eliminando todas as formalidades conversacionais e respondendo de forma direta e objetiva.

---

## Uso

### Ativar o modo

```bash
gen hardcore --start
```
- **Ação:** Ativa o modo hardcore. A IA confirmará a ativação e manterá essa persona em todas as interações subsequentes.

### Desativar o modo

```bash
gen hardcore --stop
```
- **Ação:** Desativa o modo hardcore e retorna a IA ao seu estado operacional padrão (Guardião).

### Verificar o status atual

```bash
gen hardcore --status
```
- **Ação:** Reporta se o Modo Absoluto Hardcore está atualmente `ATIVO` ou `INATIVO`. Nenhuma alteração de estado é realizada.

---

## Casos de Uso

- **Para Foco Máximo:** Use `--start` quando precisar de interações rápidas e sem distrações, focadas puramente na execução de tarefas.
- **Para Colaboração:** Use `--stop` quando precisar de um parceiro de codificação mais colaborativo e explicativo.
- **Para Auditoria:** Use `gen hardcore --status` para verificar rapidamente o estado atual da IA antes de iniciar uma sessão de trabalho.
