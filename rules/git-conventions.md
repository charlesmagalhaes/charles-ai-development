# Git Conventions

## 1. Objetivo

Estabelecer padrões para utilização do Git, organização de alterações e criação de mensagens de commit.

O objetivo é garantir histórico claro, rastreável e consistente, evitando classificações incorretas e operações não autorizadas.

## 2. Conventional Commits

Utilize Conventional Commits como padrão para mensagens de commit.

### Formato obrigatório

`<tipo>(<escopo>): [<numero-da-subtask>] <título curto>`

Exemplo:

`fix(inscricao): [483663] Corrige validação dos dados pessoais`

Outro exemplo:

`ci(): [483663] Migra worker-status-inscricao-processo para .NET 10`

### Estrutura

- **Tipo:** representa a finalidade principal da alteração.
- **Escopo:** identifica o contexto ou componente afetado, quando aplicável.
- **Número da subtask:** identifica a atividade relacionada.
- **Título:** descreve objetivamente a alteração.

O escopo é opcional. Quando não houver um escopo claro, utilize parênteses vazios.

## 3. Tipos permitidos

| Tipo | Quando utilizar |
|---|---|
| `feat` | Implementação de nova funcionalidade ou comportamento. |
| `fix` | Correção de bugs, erros, validações ou comportamentos incorretos. |
| `refactor` | Melhoria estrutural sem alteração do comportamento funcional. |
| `perf` | Melhoria de desempenho. |
| `test` | Criação, alteração ou correção exclusivamente de testes automatizados. |
| `build` | Alterações em dependências, pacotes, SDK, target framework ou processo de compilação. |
| `ci` | Alterações em pipelines, integração contínua, entrega contínua ou automações de deploy. |
| `docs` | Alterações exclusivamente documentais. |
| `chore` | Tarefas de manutenção que não se enquadram nos demais tipos. |

## 4. Critérios para escolha do tipo

A classificação deve considerar principalmente a intenção e o impacto da alteração.

- Correções em regras de negócio, validações, condições, tratamento de erros e processamento devem utilizar `fix`.
- Implementações de novas regras ou funcionalidades devem utilizar `feat`.
- Melhorias estruturais sem mudança de comportamento devem utilizar `refactor`.
- Alterações exclusivamente em testes automatizados devem utilizar `test`.
- Melhorias de desempenho devem utilizar `perf`.
- Utilize `build` somente quando a alteração estiver diretamente relacionada à infraestrutura de compilação, dependências, pacotes, SDK ou target framework.
- Utilize `ci` somente quando a alteração estiver relacionada a pipelines, automações de integração, entrega ou deploy.
- Utilize `docs` para alterações exclusivamente documentais.
- Utilize `chore` para manutenções que não se enquadrem nos demais tipos.

### Regra de classificação

O tipo do commit deve representar a finalidade da alteração, e não o tipo de arquivo modificado.

Exemplos:

- Corrigir uma validação em um serviço: `fix`.
- Corrigir uma condição em um handler: `fix`.
- Alterar uma regra de negócio em uma entidade: `fix`.
- Atualizar testes para uma correção funcional: avaliar o objetivo principal da alteração, não classificar automaticamente como `test`.
- Atualizar SDK ou dependências: `build`.
- Corrigir uma pipeline: `ci`.

Em alterações que envolvam múltiplos tipos, escolha aquele que melhor representa o objetivo principal da mudança.

Não utilize `build` ou `ci` apenas porque arquivos de configuração ou projetos foram alterados.

## 5. Análise antes de sugerir um commit

Antes de gerar uma mensagem:

1. Analise o estado atual do repositório.
2. Examine o `git diff`.
3. Identifique os arquivos modificados.
4. Compreenda a finalidade real das alterações.
5. Identifique se existem alterações não relacionadas.
6. Determine o tipo adequado.
7. Identifique o número da subtask.

Não classifique commits apenas pela extensão, localização ou nome dos arquivos.

Se a intenção da alteração não estiver clara, solicite esclarecimentos.

## 6. Número da subtask

- Identifique o número da subtask antes de sugerir o commit.
- Não invente identificadores.
- Não utilize números de outras atividades sem confirmação.
- Se o número não estiver disponível, solicite essa informação.
- Não remova o identificador do formato obrigatório sem autorização.

## 7. Padrão do título

- Escreva em português.
- Seja objetivo e descritivo.
- Utilize uma única linha.
- Não adicione corpo ou descrição complementar.
- Evite títulos genéricos como `ajustes`, `correções` ou `melhorias`.
- Descreva o resultado principal da alteração.
- Não inclua informações que não estejam representadas no diff.

## 8. Aprovação e execução

- Apresente a mensagem sugerida para aprovação antes de executar o commit.
- Não execute `git commit` sem solicitação explícita.
- Não execute `git push` sem solicitação explícita.
- Não altere o histórico do Git sem autorização.
- Não descarte alterações do usuário sem autorização.
- Não utilize comandos destrutivos sem explicar previamente seus impactos e obter confirmação.

A solicitação para analisar ou sugerir um commit não representa autorização para executá-lo.

## 9. Integridade do repositório

- Preserve alterações preexistentes do usuário.
- Não inclua arquivos não relacionados sem necessidade.
- Verifique arquivos staged e unstaged.
- Não inclua segredos, credenciais ou arquivos sensíveis.
- Avalie arquivos gerados, temporários e artefatos de build antes de adicioná-los.
- Não realize operações de limpeza ou restauração sem compreender seus impactos.

## 10. Regra fundamental

Uma mensagem de commit deve representar fielmente a intenção da alteração, permitir rastreabilidade e manter um histórico compreensível.

Na dúvida, investigue antes de classificar. Nunca escolha um tipo apenas por conveniência.