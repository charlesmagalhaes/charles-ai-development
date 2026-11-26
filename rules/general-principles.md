# General Principles

## 1. Objetivo

Estabelecer princípios gerais de engenharia de software aplicáveis a qualquer linguagem, framework ou arquitetura.

Estas diretrizes orientam decisões técnicas, implementação, manutenção e evolução dos sistemas.

## 2. Simplicidade

- Priorize a solução mais simples que atenda corretamente aos requisitos.
- Evite complexidade sem necessidade comprovada.
- Não antecipe requisitos que ainda não existem.
- Evite abstrações prematuras.
- Não crie camadas, interfaces ou componentes sem uma responsabilidade clara.
- Prefira código explícito e compreensível a soluções excessivamente sofisticadas.

## 3. Responsabilidade e coesão

- Cada componente deve possuir responsabilidades bem definidas.
- Evite concentrar responsabilidades distintas em uma única classe, função ou módulo.
- Mantenha alta coesão e baixo acoplamento.
- Separe regras de negócio de detalhes de infraestrutura quando a arquitetura exigir.
- Evite dependências desnecessárias entre componentes.

## 4. Reutilização

- Reutilize implementações existentes quando forem adequadas ao contexto.
- Evite duplicação de lógica relevante.
- Não crie abstrações genéricas apenas para eliminar pequenas repetições.
- Considere o custo de manutenção antes de introduzir mecanismos de reutilização.
- Prefira soluções reutilizáveis quando houver necessidade real ou recorrência comprovada.

## 5. Preservação da arquitetura

- Analise a arquitetura existente antes de propor alterações.
- Respeite os limites e as responsabilidades das camadas.
- Siga os padrões já estabelecidos pelo projeto.
- Não introduza novos padrões arquiteturais sem justificativa.
- Evite mudanças estruturais fora do escopo solicitado.
- Identifique impactos em componentes dependentes antes de alterar contratos existentes.

## 6. Qualidade e legibilidade

- Escreva código claro, consistente e de fácil compreensão.
- Utilize nomes que expressem intenção e responsabilidade.
- Evite métodos, classes e módulos com responsabilidades excessivas.
- Elimine código morto, comentários desatualizados e duplicações desnecessárias quando fizerem parte do escopo.
- Não sacrifique legibilidade por pequenas otimizações prematuras.
- Mantenha consistência com as convenções do projeto.

## 7. Tratamento de erros

- Considere cenários de sucesso, falha e condições excepcionais.
- Não ignore erros silenciosamente.
- Evite capturar exceções sem necessidade ou sem tratamento adequado.
- Preserve informações relevantes para diagnóstico.
- Não utilize valores padrão para mascarar falhas ou inconsistências.
- Diferencie erros esperados de falhas inesperadas.

## 8. Segurança

- Não exponha credenciais, tokens, senhas ou informações sensíveis.
- Valide dados recebidos de fontes externas.
- Considere riscos de acesso indevido e exposição de informações.
- Utilize mecanismos de segurança já estabelecidos pelo projeto.
- Não enfraqueça controles existentes para facilitar implementações.
- Evite registrar informações sensíveis em logs.

## 9. Escopo e impacto

- Modifique somente o que for necessário para atender à solicitação.
- Evite refatorações não relacionadas ao objetivo principal.
- Preserve comportamentos existentes, exceto quando a mudança exigir sua alteração.
- Identifique possíveis efeitos colaterais e regressões.
- Não altere contratos públicos sem avaliar seus consumidores.
- Sinalize riscos e dependências relevantes antes de mudanças abrangentes.

## 10. Tomada de decisão técnica

- Baseie decisões em evidências do projeto e requisitos identificados.
- Diferencie fatos, hipóteses e recomendações.
- Considere manutenibilidade, desempenho, segurança e custo de evolução.
- Avalie alternativas quando houver impacto arquitetural relevante.
- Não escolha tecnologias ou bibliotecas apenas por preferência pessoal.
- Registre decisões importantes quando necessário para preservar o contexto técnico.

## 11. Regra fundamental

Toda alteração deve resolver o problema proposto com o menor impacto necessário, preservando a qualidade, a consistência e a capacidade de evolução do software.