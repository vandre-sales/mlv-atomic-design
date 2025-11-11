# Comando `anytomd`: Conversor Universal para Markdown

O comando `anytomd` analisa o conteúdo de praticamente qualquer arquivo de código ou texto e o converte para uma sintaxe Markdown bem-estruturada e legível.

---

## Visão Geral

Este utilitário é ideal para criar rapidamente a base para documentação a partir de um código-fonte existente, formatar notas ou converter qualquer texto simples em um documento Markdown limpo.

---

## Uso

```bash
gen anytomd <sourcePath> [outputPath] [--print]
```

---

## Argumentos

| Nome         | Obrigatório | Descrição                                                                                             |
| :----------- | :---------- | :---------------------------------------------------------------------------------------------------- |
| `sourcePath` | **Sim**     | O caminho relativo para o arquivo de origem que você deseja converter.                                  |
| `outputPath` | Não         | O caminho para salvar o arquivo `.md` resultante. Se omitido, o arquivo será salvo no mesmo diretório do arquivo de origem, usando o formato `<nome-original>.md`. |
| `--print`    | Não         | Sobrescreve o salvamento em arquivo e exibe o resultado diretamente no terminal. |
---

## Exemplo de Uso

Para converter um arquivo de serviço TypeScript em um documento Markdown:
```bash
gen anytomd src/app/services/data.service.ts docs/data-service.md
```

---

## Exemplo de Saída

O conteúdo do arquivo `data-service.md` seria uma versão formatada do código-fonte, com blocos de código, cabeçalhos e listas apropriadas.

## Prompt de alto nível para o agente de IA

- Suas respostas devem ser **PRIMARIAMENTE** em sintaxe markdown purista, primando pela qualidade de formatação visual com foco em legibilidade para humanos; 
- Você se preocupa em usar cabeçalhos de modo consistente e hieraquicamente coesos; 
- Você aproveita identações de níveis e subniveis com inteligência e usa comentários `>` com proficiência;  
- Sempre que apresenta códigos, você usa blocos de código com sabedoria e cuidado aos detalhes sintáticos e de formatação de cada linguagem.

### Veja exemplos que você se inspira: 

````markdown
# Markdown Cheat Sheet

Thanks for visiting [Markdown Cheat Sheet](https://www.site.org)!

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements.

## Basic Syntax

These are the elements outlined in original design document. All Markdown applications support these elements.

### Heading

# H1
## H2
### H3

### Bold

**bold text**

### Italic

*italicized text*

### Blockquote

> blockquote

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

### Unordered List Hierachy

- First level item A
  * Second level item A1
  * Second level item A2
    + Third level item A2
- First level item
- First level item

### Code

`code`

### Horizontal Rule

---

### Link

[Markdown Guide](https://www.markdownguide.org)

### Image

![alt text](https://www.markdownguide.org/assets/images/tux.png)

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

### Table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

### Inline Code

`console.log('Olá, mundo!');`

### Fenced Code Block

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### Footnote

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

### Heading ID

### My Great Heading {#custom-id}

### Definition List

term
: definition

### Strikethrough

~~The world is flat.~~

### Task List

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

### Emoji

That is so funny! :joy:

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))

### Highlight

I need to highlight these ==very important words==.

### Subscript

H~2~O

### Superscript

X^2^
````
