# Lição Aprendida 001: Auditoria Estratégica e Refatoração do Roadmap

**Timestamp (UTC):** `2024-07-29T18:00:00Z`

---

### 1. O Problema

<!-- 
Descreva o problema técnico ou conceitual de forma precisa e concisa. 
Qual foi a discrepância entre o comportamento esperado e o comportamento real? 
Seja o mais específico possível, incluindo a causa raiz se já for conhecida.
-->

A tentativa de refatorar o documento `src/docs/05-roadmap.md` de forma monolítica falhou repetidamente, indicando uma provável deriva de contexto devido ao tamanho do artefato. Mais criticamente, a auditoria militar do próprio documento revelou três vulnerabilidades estratégicas que comprometiam seu alinhamento com a arquitetura canônica do projeto:

1.  **Acoplamento Perigoso:** A validação de design (Épico 2) estava acoplada à UI, violando a separação de responsabilidades.
2.  **Ambiguidade de Ferramenta:** O papel do Storybook (Épico 3) estava subestimado como um "catálogo final" em vez de uma ferramenta de desenvolvimento essencial.
3.  **Contrato Frágil:** A criticidade do Versionamento Semântico (SemVer) para os artefatos exportados (Épico 4) não estava enfatizada, arriscando a estabilidade dos projetos consumidores.

### 2. O Impacto Gerado

<!--
Liste as consequências negativas diretas e indiretas do problema. 
O impacto pode ser técnico (ex: build quebrado, bug em produção), de processo (ex: horas de debug perdidas) ou de negócio (ex: funcionalidade atrasada). 
Quantifique o impacto sempre que possível.
-->

-   **Impacto 1: Bloqueio Operacional.** A falha na refatoração monolítica impediu o progresso e consumiu tempo, forçando uma mudança de estratégia para uma abordagem granular.
-   **Impacto 2: Risco de Dívida Arquitetural.** Se as vulnerabilidades do roadmap não fossem corrigidas, a implementação seguiria um plano falho, resultando em um sistema frágil, difícil de manter e desalinhado com a visão do projeto.
-   **Impacto 3: Risco de Quebra de Contrato.** Falhas no versionamento dos artefatos exportados poderiam quebrar aplicações consumidoras, minando a confiança de toda a organização no Design System.

### 3. A Resolução

<!--
Detalhe a solução técnica que foi implementada. 
Descreva os passos específicos, as mudanças no código, e a lógica por trás da correção. 
Se foi uma operação em fases, descreva cada fase.
-->

A resolução foi uma mudança tática imediata para mitigar os riscos e registrar o conhecimento adquirido:

1.  **Documentação do Dossiê:** Em vez de manter o dossiê da auditoria apenas no histórico do chat, a análise foi persistida de forma estruturada neste documento (`001-dossie-roadmap.md`), transformando um diagnóstico volátil em um artefato de engenharia permanente.
2.  **Plano de Refatoração Granular:** A refatoração do `05-roadmap.md` será executada em fases, ponto a ponto, tratando cada vulnerabilidade do dossiê como uma alteração atômica e separada, a ser comandada pelo usuário.

### 4. Prevenção Futura

<!--
Esta é a seção mais importante. Descreva as mudanças sistêmicas ou de processo que serão adotadas para garantir que este problema não ocorra novamente. 
Pense em termos de "Poka-yoke" (à prova de erros).
-->

-   **Protocolo para Artefatos Extensos:** Para qualquer documento com mais de ~1000 linhas ou alta complexidade, operações de escrita monolítica devem ser evitadas. A estratégia padrão passará a ser a refatoração granular e focada (por seção ou por ponto de ação).
-   **Auditoria como Pré-requisito Formal:** A auditoria militar (validação cruzada contra documentos canônicos como a visão e o conceito) torna-se um pré-requisito formal antes de iniciar a implementação de qualquer épico ou documento de planejamento crítico.
-   **Dossiês como Lições Aprendidas:** Todas as auditorias e análises críticas devem, por padrão, ser formalizadas como documentos de "Lição Aprendida" para criar uma base de conhecimento persistente, rastreável e que sirva de guia para futuras decisões de arquitetura.
