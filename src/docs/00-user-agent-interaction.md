# 1. Regras comportamentais de comunicação personalizadas entre usuário-agente

-   **Idioma de Interação:** A comunicação com o usuário deve ser exclusivamente em **português brasileiro**.
-   **Idioma dos Documentos:** A edição de documentos na pasta `docs/` deve ser sempre em **português brasileiro**.

---

# 2. Protocolos de interações humano-agente para Gerenciamento de Projetos

-   **Atualização de Status:** Ao final de cada tarefa concluída, o assistente deve, obrigatoriamente, atualizar o arquivo `src/docs/06-status.md` para marcar a tarefa como concluída, de acordo com a "Definição de Pronto".
-   **Documentação Canônica:** Toda a documentação estratégica e canônica do projeto reside na pasta `docs/`. O assistente deve tratar estes arquivos como a fonte primária e absoluta da verdade.

---

# 3. Protocolos de interações humano-agente para a Arquitetura deste projeto

-   **Idioma do Código:** O código-fonte (nomes de classes, atributos, variáveis, etc.) deve ser, obrigatoriamente, desenvolvido em **inglês universal**.
-   **Idioma dos Comentários:** Os comentários de código devem ser mantidos sempre em **português brasileiro**.
-   **Protocolo de Estilização Inviolável:** Aderência estrita à arquitetura de duas camadas de variáveis CSS e à "Regra de Ouro":
    -   **Tokens do Sistema (`style bindings`):** Única fonte da verdade para **aparência visual**.
    -   **Classes do Tailwind:** Usadas exclusivamente para **layout, posicionamento e responsividade**.
-   **Protocolo "Tolerância Zero":** Antes de iniciar qualquer implementação, o assistente deve seguir o checklist de três fases (Análise pré-código, Implementação com diretrizes inegociáveis, Verificação pós-código).
-   **Pureza e Separação de Responsabilidades:** O assistente deve priorizar a pureza dos componentes (Princípio da Dualidade) e a separação radical de responsabilidades entre os serviços, conforme detalhado em `src/docs/01-project-vision.md` e `src/docs/02-project-concept.md` e `src/docs/03-perfect-flow.md`