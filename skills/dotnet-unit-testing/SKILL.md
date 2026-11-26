---
name: dotnet-unit-testing
description: Orienta a criação, manutenção e análise de testes em projetos C# e .NET, respeitando os padrões, frameworks, bibliotecas, fixtures e organização já adotados pelo projeto.
---

# Skill: .NET Unit Testing

## 1. Quando utilizar

Aplique esta Skill em atividades relacionadas a:

- Criação de testes unitários em projetos C# e .NET.
- Manutenção e correção de testes existentes.
- Análise de cobertura e cenários não testados.
- Testes de métodos assíncronos.
- Testes de serviços, handlers, validadores e componentes de aplicação.
- Utilização de mocks, stubs e objetos de teste.
- Identificação de testes frágeis, redundantes ou pouco representativos.
- Testes que utilizam fixtures, repositórios reais ou dependências de infraestrutura.

## 2. Investigue antes de implementar

Antes de criar ou modificar testes:

1. Identifique o projeto de testes correspondente à implementação.
2. Verifique o framework de testes utilizado.
3. Identifique as bibliotecas de mocking e assertions disponíveis.
4. Analise testes existentes da mesma classe ou responsabilidade.
5. Observe como dependências, objetos e dados de teste são construídos.
6. Verifique configurações, fixtures, builders, constantes e utilitários já disponíveis.
7. Identifique a organização de pastas e namespaces adotada pelo projeto.
8. Identifique se o cenário exige mocks, dependências reais ou uma combinação dos dois.
9. Identifique os cenários de negócio que precisam ser cobertos.

Não introduza novas bibliotecas quando as existentes forem suficientes.

**Princípio:** os testes existentes no projeto são a principal referência de implementação. Não imponha padrões genéricos quando houver convenções estabelecidas.

## 3. Classificação e estratégia dos testes

Antes de implementar, identifique a natureza do teste e escolha a estratégia adequada.

### 3.1. Testes isolados

Utilize quando o comportamento puder ser validado sem acessar banco de dados ou infraestrutura real.

Características:

- xUnit para execução.
- Moq para simular dependências.
- FluentAssertions para validação de resultados, quando adotado pelo projeto.
- AAA para organização.
- Configuração explícita dos comportamentos relevantes das dependências.

### 3.2. Testes com dependências reais

Utilize quando o comportamento depender efetivamente de repositórios, banco de dados ou infraestrutura.

Características:

- Reutilize `DatabaseFixture` ou a fixture equivalente existente.
- Utilize `[Collection]` quando necessário para compartilhar contexto e controlar a execução.
- Resolva as dependências reais pelo mecanismo de configuração já utilizado pelo projeto.
- Utilize dados controlados e conhecidos.
- Considere o estado compartilhado do banco e a independência entre os testes.
- Não classifique automaticamente esse cenário como teste unitário: pode representar um teste de integração ou de componente.

### 3.3. Testes híbridos

Utilize quando for necessário combinar dependências reais com dependências simuladas.

Características:

- Mantenha repositórios reais quando o comportamento deles fizer parte da validação.
- Utilize mocks para dependências externas ou cujo comportamento precise ser controlado.
- Preserve a estratégia de construção de dependências utilizada nos testes existentes.
- Evite substituir indiscriminadamente todas as dependências por mocks.

Não escolha uma estratégia apenas por conveniência. Considere o comportamento que precisa ser validado.

## 4. Estrutura e organização dos testes

Respeite a organização existente no projeto.

Quando houver uma estrutura semelhante à seguinte, utilize as pastas correspondentes:

- `ApplicationValidators`: testes dos validadores da camada Application.
- `DomainValidators`: testes dos validadores de domínio.
- `UseCases`: testes dos casos de uso e handlers.
- `DomainSpecifications`: testes das especificações de domínio.
- `InfraServices`: testes dos serviços de infraestrutura.
- `Publishes`: testes relacionados a publicações.
- `_Shared/Constants`: constantes compartilhadas.
- `_Shared/Fixture`: fixtures e configurações compartilhadas.

Reutilize também `Builder`, `Cache`, `CrossCutting`, `Extensions` e `Utils` quando forem aplicáveis.

Não crie novas pastas ou estruturas sem necessidade. Respeite os namespaces e a organização dos arquivos existentes.

## 5. Padrões por tipo de componente

### 5.1. Application Validators

Para validadores da camada Application que utilizam FluentValidation:

- Utilize Moq para simular as dependências.
- Utilize `FluentValidation.TestHelper` para validar os resultados das regras.
- Utilize `TestValidate` para validações síncronas.
- Utilize `TestValidateAsync` quando houver regras assíncronas.
- Utilize `ShouldHaveValidationErrorFor` para verificar erros de propriedades.
- Utilize `WithErrorMessage` quando a mensagem fizer parte do comportamento esperado.
- Valide propriedades aninhadas utilizando os caminhos correspondentes, conforme o padrão do projeto.

Exemplo:

```csharp
var resultado = await _validator.TestValidateAsync(command);

resultado.ShouldHaveValidationErrorFor(x => x.Key)
    .WithErrorMessage("Mensagem esperada");
```

Configure explicitamente os retornos das dependências quando forem relevantes para o cenário.

Não dependa implicitamente dos valores padrão retornados pelos mocks para representar regras de negócio importantes.

Considere cenários de sucesso, campos obrigatórios, valores inválidos, limites de tamanho, registros inexistentes e validações de coleções.

### 5.2. Domain Validators

Para validadores de domínio:

- Identifique se o validador depende de repositórios ou serviços reais.
- Quando houver dependência do banco, reutilize `DatabaseFixture`.
- Utilize `[Collection]` conforme a configuração existente.
- Resolva os repositórios reais pelo `ServiceProvider` da fixture, quando esse for o padrão do projeto.
- Utilize FluentAssertions para validar os resultados.
- Utilize dados conhecidos e controlados.

Não substitua repositórios reais por mocks quando o objetivo do teste for verificar o comportamento integrado com a persistência.

### 5.3. UseCases e Command Handlers

Para handlers e casos de uso:

- Utilize xUnit e AAA.
- Utilize Moq para controlar as dependências simuladas.
- Configure os retornos necessários com `Setup` e `ReturnsAsync`.
- Utilize `Verify` para validar interações relevantes.
- Utilize `It.Is<T>()` quando precisar verificar propriedades ou condições específicas dos argumentos.
- Utilize `Times.Once`, `Times.Never` ou `Times.Exactly` conforme o comportamento esperado.
- Valide tanto o resultado quanto os efeitos esperados nas dependências.

Quando houver muitas dependências, considere um método auxiliar como `ObterUseCase()` para centralizar a instanciação do Handler.

Se o projeto utilizar uma combinação de repositórios reais e mocks, preserve essa abordagem quando fizer sentido para o cenário.

Evite validar detalhes internos de implementação que não representem um comportamento relevante.

## 6. Convenção de nomenclatura

Priorize nomes em português, seguindo o padrão:

`Deve[Comportamento]Quando[Condição]`

Exemplos:

- `DeveAtualizarInscricaoQuandoDadosForemValidosAsync`
- `DeveRetornarErroQuandoInscricaoNaoExistir`
- `DeveAdicionarContatosQuandoListaPossuirItensAsync`
- `NaoDeveAtualizarInscricaoQuandoStatusForInvalido`

O nome deve comunicar claramente o comportamento e a condição do cenário.

Respeite eventuais convenções já estabelecidas pelo projeto, inclusive o sufixo `Async` quando adotado para métodos de teste assíncronos.

## 7. Cenários de teste

Avalie os cenários relevantes para o comportamento:

- Caminho de sucesso.
- Dados inválidos ou incompletos.
- Valores nulos ou coleções vazias.
- Entidades ou registros inexistentes.
- Exceções e falhas de dependências.
- Regras de negócio e condições específicas.
- Comportamentos alternativos.
- Chamadas e interações com dependências externas.
- Limites e condições de validação.
- Persistência e efeitos colaterais relevantes.

Não crie testes apenas para aumentar a quantidade de casos. Cada teste deve validar um comportamento relevante.

## 8. Mocking e dependências

Utilize mocks para isolar dependências externas ao comportamento testado.

Boas práticas:

- Configure apenas os comportamentos necessários ao cenário.
- Utilize `Setup` para configurar dependências.
- Utilize `ReturnsAsync` para retornos assíncronos quando aplicável.
- Utilize `It.IsAny<T>()` somente quando o valor não for relevante para o cenário.
- Utilize `It.Is<T>()` quando for necessário validar argumentos específicos.
- Utilize `Verify` para verificar interações relevantes.
- Utilize `Times.Once`, `Times.Never` ou `Times.Exactly` conforme o comportamento esperado.
- Evite mocks excessivamente complexos.
- Configure explicitamente os retornos importantes para evitar que o teste dependa de comportamentos padrão do Moq.

Não utilize mocks para substituir entidades de domínio ou objetos simples quando uma instância real for suficiente.

Não introduza interfaces, abstrações ou alterações na implementação apenas para facilitar a criação de testes, salvo quando houver uma justificativa arquitetural.

## 9. Testes assíncronos

Ao testar métodos assíncronos:

- Utilize `async Task` nos métodos de teste.
- Utilize `await` na execução do método testado.
- Configure corretamente os retornos assíncronos das dependências.
- Valide resultados e exceções de forma apropriada.
- Evite `.Result`, `.Wait()` e bloqueios desnecessários.

Em validadores FluentValidation, utilize `TestValidateAsync` quando houver regras assíncronas ou quando o padrão do projeto exigir a execução assíncrona.

## 10. Assertions

As validações devem demonstrar claramente o comportamento esperado.

Priorize assertions específicas e expressivas.

Quando o projeto utilizar FluentAssertions, aproveite seus recursos de legibilidade.

Exemplos:

```csharp
resultado.Should().NotBeNull();

resultado.IsSuccess.Should().BeTrue();

resultado.Errors.Should().ContainSingle();
```

Para validadores FluentValidation, utilize preferencialmente os recursos do `FluentValidation.TestHelper`.

Não adicione FluentAssertions ou outra biblioteca apenas por preferência pessoal se o projeto já adotar uma alternativa.

## 11. Cuidados com banco de dados e consultas

Ao testar operações com `IQueryable`, considere a estratégia já utilizada pelo projeto.

Quando houver utilização de MockQueryable ou ferramentas equivalentes:

- Reutilize a abordagem existente.
- Evite simular manualmente comportamentos complexos de provedores de consulta.
- Não confunda testes unitários com validações reais de banco de dados.
- Utilize testes de integração quando o comportamento depender efetivamente do provedor de persistência.

Ao utilizar `DatabaseFixture`:

- Entenda como o banco é inicializado e compartilhado.
- Verifique se os dados necessários já existem.
- Evite depender da ordem de execução dos testes.
- Não modifique dados compartilhados sem compreender os impactos.
- Reutilize constantes e builders existentes.
- Considere o isolamento e a limpeza dos dados conforme a estratégia do projeto.

Não altere dados de ambientes externos ou compartilhados sem autorização.

## 12. Qualidade e manutenção

Um bom teste deve:

- Ser determinístico.
- Ser independente dos demais testes, sempre que possível.
- Ter objetivo claro.
- Validar comportamento observável.
- Evitar dependência de ordem de execução.
- Evitar dados externos ou ambientes reais sem necessidade.
- Ser simples de entender e manter.

Evite:

- Testes que apenas repetem a implementação.
- Assertions genéricas ou insuficientes.
- Múltiplos cenários independentes no mesmo teste sem justificativa.
- Dados aleatórios sem controle.
- Dependência de horário, rede ou estado externo.
- Configurações de mocks desnecessárias.
- Testes frágeis que falham por detalhes internos irrelevantes.
- Criação de fixtures, builders ou abstrações que já existem no projeto.

## 13. Execução e validação

Após criar ou modificar os testes:

1. Execute os testes específicos alterados.
2. Verifique se os testes compilam.
3. Execute testes relacionados quando necessário.
4. Analise falhas e identifique se são causadas pela implementação, pelo teste ou pelo ambiente.
5. Não altere a implementação de produção apenas para fazer um teste passar sem investigar a causa.

Utilize comandos direcionados sempre que possível:

```bash
dotnet test caminho/do/projeto.csproj
```

Não afirme que os testes passaram sem executar a validação.

## 14. Critérios de conclusão

Considere a atividade concluída quando:

- Os cenários relevantes estiverem cobertos.
- Os testes seguirem os padrões do projeto.
- As assertions validarem o comportamento esperado.
- Não houver dependências ou abstrações desnecessárias.
- Os testes alterados compilarem e executarem com sucesso, quando o ambiente permitir.
- As limitações de execução estiverem claramente informadas.

## 15. Princípio fundamental

O objetivo dos testes é oferecer confiança sobre o comportamento do software.

Priorize testes que protejam regras de negócio e comportamentos relevantes, não testes criados apenas para atingir métricas de cobertura.

**Respeite o padrão real do projeto antes de aplicar qualquer convenção genérica.**