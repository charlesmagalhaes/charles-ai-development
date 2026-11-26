---
name: git-commit
description: Analisa alterações Git, identifica a intenção real das modificações e propõe mensagens de commit seguindo Conventional Commits e as convenções definidas pelo projeto.
---

# Skill: Git Commit

## 1. Quando utilizar

Aplique esta Skill em atividades relacionadas a:

- Análise de alterações no Git.
- Identificação do propósito de uma implementação.
- Classificação do tipo de commit.
- Criação de mensagens Conventional Commits.
- Revisão de mensagens de commit.
- Preparação de commits para Pull Requests.

## 2. Investigue antes de sugerir

Antes de propor uma mensagem:

1. Verifique o estado atual do repositório com `git status`.
2. Analise as alterações com `git diff`.
3. Verifique arquivos novos e não rastreados.
4. Identifique o objetivo real das modificações.
5. Considere o contexto da tarefa e da subtask.
6. Verifique se existem alterações de naturezas diferentes.

Não classifique um commit apenas pela extensão dos arquivos modificados.

A classificação deve refletir a intenção e o impacto das alterações.

## 3. Padrão obrigatório

Utilize o formato:

`<tipo>(<escopo>): [<numero-da-subtask>] <título curto>`

Regras:

- Utilize títulos em português.
- Seja objetivo e específico.
- Não inclua corpo ou descrição adicional.
- O escopo é opcional.
- Quando não houver escopo claro, utilize parênteses vazios.
- Não invente números de subtasks.
- Se o número da subtask não estiver disponível, solicite a informação antes de finalizar a sugestão.

Exemplo:

`fix(inscricao): [486338] Corrige validação de endereço`

## 4. Classificação dos tipos

Utilize os seguintes critérios:

| Tipo | Quando utilizar |
|---|---|
| feat | Implementação de uma nova funcionalidade ou comportamento. |
| fix | Correção de bugs, validações, condições, regras de negócio ou tratamento de erros. |
| refactor | Alteração estrutural sem mudança no comportamento funcional. |
| perf | Melhoria de desempenho ou eficiência. |
| test | Criação, alteração ou correção exclusiva de testes. |
| build | Alterações em dependências, pacotes, SDK, framework ou processo de build. |
| ci | Alterações em pipelines, integração contínua ou entrega contínua. |
| docs | Alterações exclusivamente documentais. |
| chore | Manutenção geral que não se enquadra nos demais tipos. |

## 5. Regras importantes para classificação

### Correções de código

Utilize `fix` quando a alteração corrigir:

- Validações.
- Condições lógicas.
- Regras de negócio.
- Tratamento de exceções.
- Processamento incorreto.
- Comportamentos inesperados.
- Defeitos em métodos ou componentes.

Mesmo quando a correção envolver arquivos de configuração, a intenção principal deve determinar o tipo.

### Alterações de build

Utilize `build` somente quando o objetivo principal estiver relacionado a:

- Atualização de dependências.
- Atualização de pacotes.
- Alteração de SDK ou versão do framework.
- Configuração do processo de compilação.
- Ajustes necessários ao sistema de build.

Não utilize `build` apenas porque um arquivo `.csproj`, `.json` ou de configuração foi alterado.

### Alterações de CI/CD

Utilize `ci` quando a alteração estiver relacionada ao funcionamento de pipelines, automações de integração ou entrega contínua.

Não utilize `ci` para mudanças comuns de código executadas dentro de um pipeline.

### Alterações estruturais

Utilize `refactor` quando houver reorganização, simplificação ou melhoria interna sem mudança de comportamento funcional.

Se a alteração corrigir um defeito, priorize `fix`, mesmo que também exista alguma reorganização estrutural.

### Alterações de testes

Utilize `test` quando o objetivo principal for exclusivamente criar, corrigir ou reorganizar testes.

Se o mesmo conjunto de alterações corrigir a implementação e adicionar testes, classifique pelo objetivo principal da mudança funcional.

## 6. Separação de responsabilidades

Quando houver alterações independentes com objetivos diferentes, avalie se devem ser separadas em commits distintos.

Não misture indiscriminadamente:

- Funcionalidades.
- Correções.
- Refatorações.
- Atualizações de dependências.
- Documentação.

Entretanto, não fragmente artificialmente alterações que fazem parte de uma mesma entrega lógica.

## 7. Aprovação obrigatória

Antes de executar qualquer commit:

1. Apresente a mensagem sugerida.
2. Explique brevemente a classificação quando houver dúvida.
3. Aguarde aprovação explícita.
4. Execute o commit somente após autorização.

Nunca execute automaticamente:

- `git commit`
- `git push`
- `git reset`
- `git checkout` com descarte de alterações.
- `git clean`
- Outros comandos destrutivos.

Não descarte, sobrescreva ou inclua alterações de terceiros sem autorização.

## 8. Formato da resposta

Apresente a sugestão neste formato:

**Commit sugerido:**

`fix(inscricao): [486338] Corrige validação de endereço`

**Justificativa:**

A alteração corrige uma validação existente, portanto o tipo adequado é `fix`, e não `build` ou `refactor`.

**Ação:**

Aguarde a aprovação antes de executar.

## 9. Princípio fundamental

O tipo do commit deve representar o propósito real da alteração, não os arquivos modificados.

Priorize classificação correta, mensagens claras e integridade do histórico Git.
