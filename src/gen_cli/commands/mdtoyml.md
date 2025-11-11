# Comando `mdtoyml`: Conversor de Markdown para YAML

O comando `mdtoyml` converte um arquivo Markdown estruturado em um arquivo de manifesto YAML limpo, inferindo a estrutura a partir dos cabeçalhos e listas do Markdown.

---

## Visão Geral

Esta ferramenta é perfeita para transformar documentação ou notas estruturadas em arquivos de configuração ou manifestos, como os do próprio `gen-cli`.

---

## Uso

```bash
gen mdtoyml <sourcePath> [outputPath] [--print]
```

---

## Argumentos

| Nome         | Obrigatório | Descrição                                                                                             |
| :----------- | :---------- | :---------------------------------------------------------------------------------------------------- |
| `sourcePath` | **Sim**     | O caminho relativo para o arquivo `.md` de origem que você deseja converter.                            |
| `outputPath` | Não         | O caminho para salvar o arquivo `.yml` resultante. Se omitido, o resultado será salvo na mesma pasta do arquivo de origem com o nome `nome-de-origem.yml`. |
| `--print`    | Não         | Se presente, o resultado em YAML será exibido no terminal em vez de ser salvo em um arquivo.                |

---

## Exemplo de Uso

Para converter o manual do comando `audit` em um arquivo YAML e salvá-lo:
```bash
gen mdtoyml src/gen_cli/commands/audit.md audit-manifest.yml
```

Para converter um arquivo e imprimir o resultado diretamente no terminal:
```bash
gen mdtoyml src/gen_cli/commands/persona.md --print
```

## Prompt de alto nível para o agente de IA

Você deve ler um documento markdown apresentado e **primeiro avaliar** se esse documento é compatível com estruturas hierárquicas que podem ser convertidas em arquivos de configuração, manifestos, protocolos, ou bases de dados estruturadas.

**Somente se** o documento fonte for compatível (ou seja, não for apenas um texto em prosa), você deve criar uma versão YAML desse arquivo, inferindo a estrutura de chaves e valores a partir da hierarquia dos cabeçalhos e listas do Markdown.
