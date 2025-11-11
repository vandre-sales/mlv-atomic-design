# Hierarquia Ágil: Da Visão Estratégica à Execução Granular

Para criar uma arquitetura de projetos com alta agilidade, adaptação e compartimentação, a hierarquia de conceitos deve ser estruturada para permitir o detalhamento progressivo, desde a visão estratégica até a execução diária.

A estrutura a seguir atende a esses requisitos, alinhando-se a práticas ágeis modernas.

---

# 1. Épico (Epic)
* **Foco:** Médio a Longo Prazo, Valor para o Cliente.
* **Propósito:** Define o bloco de trabalho de alto nível ou uma grande funcionalidade que agrega valor estratégico significativo. Um Épico é, por definição, muito grande para ser concluído em uma única iteração (Sprint) e serve como um contêiner para "Partes" mais gerenciáveis. O "storytelling" da funcionalidade reside aqui.

## 1.1. Parte (Part / Feature)
* **Foco:** Médio Prazo, Entregas de Valor.
* **Propósito:** Representa a decomposição primária de um Épico. É um componente de funcionalidade menor e mais gerenciável, servindo como um "capítulo" na história do Épico. Uma Parte deve ser entregável em um período de tempo razoável (como um trimestre ou um conjunto de Sprints) e é composta por "Tarefas".

### 1.1.1. Tarefa (Task / User Story)
* **Foco:** Curto Prazo, Iteração (Sprint).
* **Propósito:** É a unidade de trabalho fundamental que entrega valor perceptível ao usuário final. Geralmente formulada como uma História de Usuário (ex: "Como um [usuário], eu quero [ação], para que [benefício]"), ela deve ser dimensionada para ser concluída dentro de uma única iteração. É a base do Backlog da Sprint.

#### 1.1.1.1. Passo (Step / Sub-task)
* **Foco:** Diário/Horas, Ação Individual.
* **Propósito:** É a decomposição técnica e granular de uma Tarefa. Passos são as atividades operacionais (ex: "Criar o método `xyz()`", "Atualizar o endpoint", "Escrever teste unitário para o serviço") necessárias para completar a Tarefa, facilitando o acompanhamento diário e a transparência.

---

## Como essa Hierarquia Atende aos Requisitos

* **Alta Agilidade e Adaptação:** A estrutura é inerentemente flexível. O planejamento de alto nível (Épicos, Partes) define a direção, mas o foco de execução está no curto prazo (Tarefas, Passos), permitindo que a equipe responda a mudanças sem invalidar a estratégia maior.
* **Alta Capacidade de Adaptação:** O backlog (a lista priorizada de Épicos, Partes e Tarefas) é um artefato vivo, constantemente revisado. A equipe pode reprioritizar "Partes" dentro de um "Épico" sem que a meta do Épico seja perdida.
* **Ultra Compartimentação (Escala):** A separação clara permite que diferentes equipes trabalhem em "Partes" distintas de um mesmo "Épico" ou em Épicos diferentes simultaneamente, mantendo o alinhamento. A Definição de "Pronto" (Definition of Done - DoD) em cada nível garante a qualidade da entrega em cada compartimento.
* **Storytelling:** A estrutura suporta o "storytelling" ao garantir que cada Passo se conecte a uma Tarefa, cada Tarefa a uma Parte, e cada Parte à narrativa maior do Épico.