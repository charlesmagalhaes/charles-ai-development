
---
name: frontend-development
description: Use when developing, analyzing, refactoring or debugging frontend applications built with Vue 3, TypeScript, Vuetify and Vite. Covers component architecture, Composition API, state management, forms, validation, API integration, routing, performance and frontend testing.
---

# Frontend Development

## 1. Objetivo

Orientar o desenvolvimento, a manutenção e a evolução de aplicações frontend, priorizando qualidade, legibilidade, organização, manutenibilidade e consistência arquitetural.

Atue de acordo com a arquitetura e os padrões já estabelecidos no projeto.

## 2. Investigação do projeto

Antes de implementar:

- Analise a estrutura e a organização do projeto.
- Identifique as versões e tecnologias utilizadas.
- Consulte `package.json` e os arquivos de configuração relevantes.
- Identifique os padrões existentes de componentes, composables, stores e serviços.
- Verifique como o projeto organiza rotas, formulários e integrações com APIs.
- Analise implementações semelhantes antes de criar novas estruturas.
- Identifique as convenções de nomenclatura e formatação.

Não introduza padrões novos sem necessidade ou justificativa técnica.

## 3. Vue 3

Priorize os recursos modernos do Vue 3, respeitando a versão utilizada pelo projeto.

Diretrizes:

- Prefira Composition API quando compatível com os padrões do projeto.
- Utilize `<script setup lang="ts">` quando adotado pela aplicação.
- Utilize componentes para encapsular responsabilidades e comportamentos reutilizáveis.
- Evite componentes excessivamente grandes ou com responsabilidades distintas.
- Utilize props e emits para comunicação entre componentes.
- Utilize composables para compartilhar lógica reutilizável.
- Evite acoplamento desnecessário entre componentes.
- Utilize os recursos de reatividade adequadamente (`ref`, `reactive`, `computed` e `watch`).
- Evite watchers quando uma propriedade computada ou outra abordagem mais simples resolver o problema.
- Utilize o ciclo de vida dos componentes de forma apropriada.

## 4. TypeScript

Utilize tipagem explícita e segura.

Diretrizes:

- Evite `any`; prefira tipos específicos, interfaces ou `unknown` quando apropriado.
- Defina contratos para props, emits, serviços e respostas de API.
- Utilize tipos para representar estados e modelos de domínio.
- Evite duplicação de estruturas de tipos.
- Respeite os tipos já existentes no projeto.
- Não utilize conversões de tipo para ocultar inconsistências.
- Trate valores opcionais e nulos explicitamente.
- Evite abstrações genéricas que dificultem a compreensão.

## 5. Vuetify

Utilize os componentes e recursos do Vuetify de acordo com a versão instalada.

Diretrizes:

- Priorize os componentes nativos do Vuetify quando atenderem à necessidade.
- Respeite os padrões visuais e de interação já adotados.
- Utilize corretamente props, slots e eventos.
- Evite implementar manualmente comportamentos já oferecidos pelo framework.
- Mantenha consistência de espaçamento, responsividade e hierarquia visual.
- Evite estilos inline quando o projeto possuir padrões próprios de estilização.
- Não introduza dependências visuais adicionais sem necessidade.

## 6. Gerenciamento de estado

Quando o projeto utilizar Pinia:

- Mantenha o estado compartilhado nas stores apropriadas.
- Evite armazenar nas stores informações que pertencem exclusivamente ao estado local de um componente.
- Organize ações, getters e estado de forma coerente.
- Evite duplicação de estado.
- Preserve o fluxo de dados e os contratos existentes.
- Considere os efeitos de alterações no estado compartilhado sobre outros componentes.

## 7. Integração com APIs

Ao trabalhar com APIs:

- Respeite os serviços e mecanismos de comunicação já existentes.
- Reutilize configurações compartilhadas do Axios, quando disponíveis.
- Centralize integrações conforme a arquitetura do projeto.
- Considere estados de carregamento, sucesso, erro e ausência de dados.
- Trate respostas e erros de maneira consistente.
- Evite chamadas HTTP diretamente em componentes quando o projeto possuir uma camada específica para isso.
- Respeite contratos, DTOs e regras de negócio definidas pelo backend.
- Não oculte erros que precisam ser apresentados ou tratados pela aplicação.

## 8. Formulários e validações

- Respeite os padrões existentes para criação e manutenção de formulários.
- Separe regras de validação quando houver benefício de reutilização.
- Considere campos obrigatórios, opcionais e dependentes.
- Trate corretamente estados de edição, carregamento e envio.
- Evite duplicação de regras de validação.
- Preserve os dados preenchidos quando ocorrerem erros, quando aplicável.
- Garanta consistência entre validações do frontend e regras do backend.
- Não considere a validação do frontend suficiente para garantir a integridade dos dados.

## 9. Organização e qualidade

- Prefira soluções simples e explícitas.
- Evite duplicação de código.
- Separe responsabilidades.
- Preserve a arquitetura existente.
- Evite componentes, funções e arquivos excessivamente extensos.
- Não crie abstrações sem necessidade concreta.
- Não adicione dependências sem justificativa.
- Não altere arquivos não relacionados à atividade.
- Não introduza estilos inline quando houver restrição ou padrão contrário no projeto.

## 10. Testes frontend

Antes de criar ou alterar testes:

- Identifique as ferramentas já utilizadas pelo projeto.
- Consulte os testes existentes e suas convenções.
- Priorize testes de comportamento e resultados observáveis.
- Cubra cenários de sucesso, erro e situações relevantes de borda.
- Evite testes excessivamente acoplados à implementação interna.
- Utilize mocks apenas quando necessários para isolar dependências.
- Execute as validações disponíveis após as alterações.

Não introduza ferramentas de teste ou dependências sem necessidade e sem considerar a arquitetura existente.

## 11. Vite e ferramentas de desenvolvimento

- Respeite as configurações existentes do Vite.
- Evite alterar configurações globais sem necessidade.
- Preserve os scripts e comandos definidos no `package.json`.
- Considere os ambientes de desenvolvimento, homologação e produção.
- Não exponha segredos ou credenciais em variáveis públicas do frontend.
- Respeite as convenções de variáveis de ambiente utilizadas pelo projeto.

## 12. Validação e conclusão

Após implementar alterações:

- Execute o build ou comando de validação equivalente definido pelo projeto.
- Execute os testes pertinentes.
- Execute verificações de lint e TypeScript quando disponíveis.
- Analise erros e avisos relevantes.
- Não declare validações que não foram executadas.
- Informe os arquivos alterados, validações realizadas e eventuais pendências.

Se alguma validação não puder ser executada, explique o motivo.

## 13. Restrições

- Não reescreva partes da aplicação sem necessidade.
- Não altere contratos de API sem avaliar o impacto.
- Não introduza bibliotecas apenas por preferência pessoal.
- Não ignore padrões existentes em favor de convenções genéricas.
- Não modifique configurações de ambiente ou pipeline sem autorização.
- Não execute commits ou push sem solicitação explícita.
