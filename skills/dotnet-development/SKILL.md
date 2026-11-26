---
name: dotnet-development
description: Orienta desenvolvimento, implementação, manutenção e correção de aplicações C# e .NET. Use ao criar funcionalidades, implementar serviços, handlers, APIs, integrações, trabalhar com injeção de dependência, acesso a dados, processamento assíncrono ou refatorar código .NET.
---

# .NET Development

## 1. Objetivo

Atuar como especialista em desenvolvimento C# e .NET, orientando implementações consistentes, seguras, testáveis e alinhadas à arquitetura existente.

Aplique estas orientações em funcionalidades novas, correções, refatorações, integrações e manutenção de aplicações .NET.

## 2. Análise inicial

Antes de implementar:

1. Identifique a versão do .NET e do C# utilizada.
2. Analise a estrutura da solução e dos projetos envolvidos.
3. Identifique a arquitetura e os padrões existentes.
4. Examine implementações semelhantes.
5. Verifique bibliotecas, pacotes e dependências disponíveis.
6. Identifique contratos, consumidores e integrações afetadas.
7. Compreenda o comportamento esperado antes de modificar o código.

Não presuma que todos os projetos utilizam a mesma arquitetura ou conjunto de bibliotecas.

## 3. C# e organização do código

- Utilize recursos da linguagem compatíveis com a versão adotada.
- Prefira código legível, explícito e de fácil manutenção.
- Utilize nomenclatura consistente com o projeto.
- Mantenha métodos focados em responsabilidades coerentes.
- Evite classes com responsabilidades excessivas.
- Utilize propriedades, métodos e modificadores de acesso adequadamente.
- Preserve encapsulamento e invariantes dos objetos.
- Evite estado mutável compartilhado sem necessidade.
- Utilize LINQ quando melhorar a clareza, sem comprometer a legibilidade ou o desempenho.
- Evite consultas ou transformações complexas concentradas em expressões difíceis de compreender.

## 4. Arquitetura e organização

- Respeite a arquitetura existente.
- Preserve os limites de responsabilidade entre as camadas.
- Evite dependências indevidas entre domínio, aplicação e infraestrutura.
- Mantenha regras de negócio nos componentes responsáveis por elas.
- Não introduza Clean Architecture, CQRS, MediatR ou outros padrões automaticamente.
- Não crie interfaces apenas para seguir convenções genéricas.
- Utilize abstrações quando houver necessidade concreta de desacoplamento, substituição ou isolamento.
- Evite alterar contratos públicos sem avaliar seus consumidores.

## 5. SOLID e Design Patterns

- Utilize SOLID como referência para decisões de design.
- Aplique SRP para manter responsabilidades coerentes.
- Utilize abstrações quando facilitarem evolução e manutenção.
- Prefira composição quando representar melhor as relações entre componentes.
- Utilize Design Patterns somente quando resolverem problemas concretos.
- Evite abstrações prematuras e hierarquias desnecessárias.
- Não aumente a complexidade de uma implementação simples apenas para aplicar um padrão conhecido.

## 6. Injeção de dependência

- Utilize o mecanismo de Dependency Injection adotado pelo projeto.
- Respeite os ciclos de vida `Singleton`, `Scoped` e `Transient`.
- Evite dependências com ciclos de vida incompatíveis.
- Não utilize Service Locator quando a injeção explícita for adequada.
- Evite registrar serviços duplicados ou desnecessários.
- Preserve a organização existente dos registros de dependência.

## 7. Programação assíncrona

- Utilize `async` e `await` em operações verdadeiramente assíncronas.
- Evite bloquear operações assíncronas com `.Result` ou `.Wait()`.
- Propague `CancellationToken` quando aplicável.
- Respeite os tokens de cancelamento recebidos.
- Evite criar tarefas sem acompanhar sua conclusão e suas falhas.
- Não utilize `Task.Run` indiscriminadamente para operações de I/O.
- Considere concorrência, sincronização e acesso compartilhado a recursos.
- Evite chamadas sequenciais quando operações independentes puderem ser executadas em paralelo com segurança.

## 8. Tratamento de exceções

- Utilize exceções para representar falhas excepcionais.
- Trate erros no nível em que exista responsabilidade para tomar uma decisão adequada.
- Preserve a exceção original quando realizar propagação.
- Evite capturar `Exception` indiscriminadamente.
- Não esconda falhas com retornos padrão sem justificativa.
- Diferencie erros de negócio, validações e falhas técnicas.
- Preserve informações relevantes para diagnóstico.
- Não exponha detalhes internos desnecessariamente.

## 9. APIs e contratos

- Respeite os contratos existentes de entrada e saída.
- Utilize DTOs quando necessários para separar contratos externos dos modelos internos.
- Valide entradas de acordo com as regras estabelecidas.
- Utilize códigos HTTP coerentes com o resultado da operação.
- Mantenha consistência no tratamento de erros.
- Avalie compatibilidade antes de alterar endpoints, propriedades ou estruturas de resposta.
- Evite expor entidades de persistência diretamente quando isso comprometer o contrato da API.

## 10. Persistência e acesso a dados

Quando o projeto utilizar Entity Framework Core ou outras tecnologias de persistência:

- Respeite a estratégia de acesso a dados existente.
- Evite consultas desnecessárias e carregamento excessivo de informações.
- Analise possíveis problemas de N+1.
- Utilize projeções quando apenas parte dos dados for necessária.
- Avalie `AsNoTracking()` para consultas somente de leitura quando aplicável.
- Considere transações em operações que exijam consistência.
- Preserve a integridade dos dados.
- Evite executar operações de banco de dados dentro de loops sem avaliar o impacto.
- Respeite os padrões de repositórios, Unit of Work ou acesso direto adotados pelo projeto.
- Não introduza uma nova camada de persistência sem justificativa.

## 11. Integrações e mensageria

Ao trabalhar com serviços externos, filas e eventos:

- Considere indisponibilidade e respostas inesperadas.
- Configure timeouts adequados.
- Avalie políticas de retry conforme a natureza da operação.
- Evite retries indiscriminados em operações não idempotentes.
- Considere duplicidade e reprocessamento de mensagens.
- Preserve rastreabilidade e correlação entre operações.
- Valide contratos e dados recebidos de parceiros.
- Evite acoplamento desnecessário entre consumidores e produtores.
- Respeite os mecanismos de resiliência existentes.

## 12. Logging e observabilidade

- Utilize o mecanismo de logging adotado pelo projeto.
- Registre informações relevantes para diagnóstico.
- Prefira logs estruturados quando suportados.
- Utilize níveis de log adequados.
- Preserve identificadores de correlação quando disponíveis.
- Evite registrar dados sensíveis.
- Não duplique logs da mesma falha em diferentes camadas sem necessidade.

## 13. Configuração e dependências

- Respeite os padrões de configuração existentes.
- Não armazene segredos no código-fonte.
- Utilize mecanismos apropriados para configurações por ambiente.
- Não atualize pacotes sem necessidade.
- Verifique compatibilidade antes de alterar versões.
- Evite introduzir dependências para funcionalidades já atendidas pela plataforma ou por bibliotecas existentes.
- Preserve a compatibilidade com o SDK e o target framework do projeto.

## 14. Refatoração e manutenção

- Compreenda o comportamento atual antes de refatorar.
- Preserve contratos e comportamentos não relacionados à alteração.
- Faça mudanças incrementais.
- Evite misturar refatorações amplas com correções funcionais sem necessidade.
- Elimine duplicações quando houver benefício real.
- Identifique impactos nos consumidores.
- Não modifique arquivos fora do escopo sem justificativa.

## 15. Testabilidade

- Considere a testabilidade durante o desenvolvimento.
- Evite dependências rígidas e acoplamento desnecessário.
- Não crie abstrações exclusivamente para facilitar mocks.
- Analise os testes existentes antes de alterar a implementação.
- Consulte a Rule `testing-standards.md` e a Skill específica de testes .NET quando aplicáveis.
- Preserve a lógica de negócio independente de detalhes de infraestrutura quando a arquitetura permitir.

## 16. Processo de implementação

Para implementar uma alteração:

1. Compreenda o requisito.
2. Investigue a implementação existente.
3. Identifique os componentes afetados.
4. Defina a abordagem técnica mais simples e adequada.
5. Implemente respeitando os padrões do projeto.
6. Atualize contratos e dependências somente quando necessário.
7. Considere os testes pertinentes.
8. Execute build, testes e verificações aplicáveis.
9. Analise possíveis regressões.
10. Apresente o resultado e as limitações identificadas.

## 17. Regra fundamental

Desenvolva soluções .NET que respeitem o contexto real do projeto. Priorize correção funcional, clareza, consistência arquitetural, testabilidade e facilidade de manutenção, sem impor padrões ou tecnologias desnecessárias.