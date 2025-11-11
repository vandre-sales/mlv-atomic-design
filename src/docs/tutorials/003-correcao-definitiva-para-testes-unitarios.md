# Tutorial: Construção da Suíte de Testes Robusta para o ThemeService

**ID do Tutorial:** `003`
**Timestamp (UTC):** `2024-07-28T03:40:48Z`
**Versão:** 2.0.0 (Refatorado)

---

## 1. Objetivo

Este tutorial descreve o processo de construção de uma suíte de testes unitários à prova de falhas para o `ThemeService`. O objetivo é garantir a funcionalidade, a reatividade e, mais criticamente, a segurança do serviço contra ataques de injeção (XSS).

## 2. Conceito de Pronto

-   O `ThemeService` é refatorado para ser mais testável e seguro.
-   A suíte de testes `theme.service.spec.ts` é criada com cobertura para:
    -   Inicialização de tema com base na preferência do SO.
    -   Troca dinâmica de tema.
    -   Sanitização de valores de tokens para prevenir XSS.
-   Todos os testes são executados com sucesso (`ng test`).

---

## 3. Rota de Implementação (O Caminho Feliz)

Para evitar os problemas comuns de concorrência em testes e garantir a segurança desde o início, a implementação seguirá duas fases estratégicas: primeiro, fortalecer o serviço; segundo, construir os testes sobre essa base sólida.

### Fase 1: Refatorar o `ThemeService` para Testabilidade e Segurança

**Propósito:** Modificar o `ThemeService` para expor um método de aplicação de tema controlável e implementar uma estratégia de sanitização de duas camadas.

#### Passo 1.1: Expor um `Observable` para a Aplicação de Tema

**Ação:** Modifique o `ThemeService` para que a lógica de carregamento e injeção de CSS retorne um `Observable`, permitindo que os testes aguardem a conclusão da operação.

```typescript
// Em: src/app/core/services/theme/theme.service.ts

// ... outras importações
import { Observable } from 'rxjs';

// ... dentro da classe ThemeService

public applyTheme(theme: Theme): Observable<string> {
    const primitiveTokens$ = this.PRIMITIVE_TOKEN_FILES.map(file => this.http.get(`/assets/tokens/${file}`));
    const semanticTheme$ = this.http.get(`/assets/tokens/semantics/${theme}.json`);

    return forkJoin([...primitiveTokens$, semanticTheme$]).pipe(
      map(results => {
        const primitiveTokens = results.slice(0, -1);
        const semanticTokens = results[results.length - 1];
        const cssVariables = this.resolveAndProcessTokens(primitiveTokens, semanticTokens);
        this.injectCssVariables(cssVariables);
        return cssVariables;
      })
    );
}

// Modifique o construtor para usar o novo método
constructor() {
    effect(() => {
        this.applyTheme(this.activeTheme()).subscribe();
    });
}
```

#### Passo 1.2: Implementar a Estratégia de Sanitização em Duas Camadas

**Ação:** Implemente uma defesa robusta contra XSS, tratando os dados na origem (escapando valores) e sinalizando confiança no final (usando `bypassSecurityTrustHtml`).

```typescript
// Em: src/app/core/services/theme/theme.service.ts

// ... dentro da classe ThemeService

private resolveAndProcessTokens(primitives: any[], semantics: any): string {
    // ... (lógica do primitiveMap, corrigida para o aninhamento)
    const primitiveMap = new Map<string, string>();
    primitives.forEach(tokenObject => {
      for (const category in tokenObject) {
        for (const tokenName in tokenObject[category]) {
          for (const subTokenName in tokenObject[category][tokenName]) {
            primitiveMap.set(
              `${category}.${tokenName}.${subTokenName}`,
              tokenObject[category][tokenName][subTokenName].value
            );
          }
        }
      }
    });

    let cssString = ':root {\n';
    for (const category in semantics) {
      for (const tokenName in semantics[category]) {
        let value = semantics[category][tokenName].value as string;
  
        const reference = value.match(/\{([^}]+)\}/);
        if (reference) {
          const resolvedValue = primitiveMap.get(reference[1]);
          if (resolvedValue) {
            value = resolvedValue;
          }
        }
  
        // 1. Sanitização na Origem
        const sanitizedValue = this.escapeCss(value);
        cssString += `  --${tokenName}: ${sanitizedValue};\n`;
      }
    }
  
    cssString += '}';
    return cssString;
}

private escapeCss(value: string): string {
    return value.replace(/</g, '\\<').replace(/>/g, '\\>');
}

private injectCssVariables(cssVariables: string): void {
    let styleElement = this.document.getElementById(this.THEME_STYLE_ELEMENT_ID) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = this.document.createElement('style');
      styleElement.id = this.THEME_STYLE_ELEMENT_ID;
      this.document.head.appendChild(styleElement);
    }

    // 2. Confiança no Final
    styleElement.innerHTML = this.sanitizer.bypassSecurityTrustHtml(cssVariables) as string;
}
```

### Fase 2: Construir a Suíte de Testes

**Propósito:** Criar a suíte de testes `theme.service.spec.ts` que valida a funcionalidade e a segurança do serviço já refatorado.

#### Passo 2.1: Estrutura do Teste e Mocks

**Ação:** Crie o arquivo `theme.service.spec.ts` e configure o `TestBed`, os mocks e uma função auxiliar `flushThemeRequests` que fornece os mocks como objetos, não como strings.

```typescript
// Em: src/app/core/services/theme/theme.service.spec.ts

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DOCUMENT } from '@angular/common';
import { ThemeService, Theme } from './theme.service';
import { first } from 'rxjs';

describe('ThemeService', () => {
  let httpTestingController: HttpTestingController;
  let service: ThemeService;
  let document: Document;

  const MOCK_PRIMITIVES = { /* ... seu mock de primitivos ... */ };
  const MOCK_SEMANTICS = { /* ... seu mock de semânticos ... */ };

  // Helper que fornece mocks como objetos
  const flushThemeRequests = (theme: Theme) => {
    const requests = httpTestingController.match(req => req.url.includes('/assets/tokens/'));
    requests.forEach(req => {
      if (req.request.url.includes(`semantics/${theme}.json`)) {
        req.flush(MOCK_SEMANTICS[theme]);
      } else {
        const fileName = req.request.url.split('/').slice(-2).join('/');
        req.flush((MOCK_PRIMITIVES as any)[fileName]);
      }
    });
  };
  
  // ... (configuração do beforeEach e afterEach)
});
```

#### Passo 2.2: Implementar os Testes

**Ação:** Adicione os testes para inicialização, troca de tema e o teste adversário de XSS. As asserções devem ser feitas dentro do `subscribe` do `applyTheme`.

```typescript
// Em: src/app/core/services/theme/theme.service.spec.ts

// ... dentro do describe()

it('should initialize with dark theme and apply styles', fakeAsync(() => {
    service.applyTheme('dark').pipe(first()).subscribe(() => {
        const styleElement = document.getElementById('dynamic-theme-styles') as HTMLStyleElement;
        expect(styleElement).toBeTruthy();
        expect(styleElement.innerHTML).toContain('--primary: #ef4444'); // Assumindo valor do mock
    });
    flushThemeRequests('dark');
    tick();
}));

it('should switch to light theme and apply new styles', fakeAsync(() => {
    // ... teste para troca de tema
}));

it('should sanitize potentially malicious token values to prevent XSS', fakeAsync(() => {
    const MOCK_MALICIOUS_SEMANTICS = {
        light: { color: { primary: { value: '</style><script>alert("XSS")</script>' } } }
    };

    service.applyTheme('light').pipe(first()).subscribe(() => {
        const styleElement = document.getElementById('dynamic-theme-styles') as HTMLStyleElement;
        expect(styleElement).toBeTruthy();
        expect(styleElement.innerHTML).not.toContain('<script>alert("XSS")</script>');
    });

    const requests = httpTestingController.match(req => req.url.includes('/assets/tokens/'));
    requests.forEach(req => {
      if (req.request.url.includes(`semantics/light.json`)) {
        req.flush(MOCK_MALICIOUS_SEMANTICS.light);
      } else { /* ... flush primitivos ... */ }
    });
    tick();
}));
```

## 4. Verificação Final

Execute a suíte de testes com o comando `ng test`. Todos os testes devem passar, confirmando que o `ThemeService` é funcional, testável e seguro. Esta abordagem elimina a necessidade de depuração reativa e constrói a qualidade desde o início.
