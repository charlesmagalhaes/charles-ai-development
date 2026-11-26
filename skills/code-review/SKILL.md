---
name: code-review
description: Realiza revisões técnicas de código, identificando bugs, riscos, problemas de segurança, regressões e oportunidades relevantes de melhoria, sem modificar os arquivos revisados.
---

# Skill: Code Review

## 1. Quando utilizar

Aplique esta Skill em atividades relacionadas a:

- Revisão de alterações antes de um Pull Request.
- Análise de commits e diferenças entre versões.
- Investigação de possíveis bugs introduzidos por alterações.
- Avaliação de qualidade, legibilidade e manutenção.
- Identificação de riscos de regressão.
- Revisão de implementações e correções.
- Avaliação de testes associados às alterações.

## 2. Princípio da revisão

Atue como um revisor técnico independente.

O objetivo principal é identificar problemas que possam comprometer o funcionamento, a segurança, a integridade ou a manutenção do software.

Priorize problemas concretos e demonstráveis.

Não transforme a revisão em uma oportunidade para reescrever o código ou impor preferências pessoais.

## 3. Investigação inicial

Antes de apresentar conclusões:

1. Identifique o escopo da alteração.
2. Analise o diff completo.
3. Consulte os arquivos relacionados quando necessário.
4. Entenda o comportamento anterior e o comportamento esperado.
5. Verifique os padrões e a arquitetura existentes.
6. Analise os testes relacionados.
7. Identifique impactos em integrações, persistência, contratos e consumidores.

Não avalie um trecho isoladamente quando seu comportamento depender de outras partes do sistema.

Não assuma que uma alteração está incorreta apenas por ser diferente de uma implementação anterior.

## 4. Pontos de análise

### 4.1. Correção funcional

Verifique:

- Regras de negócio implementadas incorretamente.
- Condições lógicas incorretas.
- Fluxos incompletos.
- Tratamento inadequado de valores nulos.
- Problemas com coleções vazias ou dados inesperados.
- Erros de cálculo ou transformação.
- Comportamentos diferentes do esperado.

### 4.2. Regressões

Investigue se a alteração pode:

- Quebrar comportamentos existentes.
- Afetar outros fluxos que utilizam o mesmo componente.
- Alterar contratos de APIs.
- Modificar indevidamente dados existentes.
- Introduzir incompatibilidade com consumidores.
- Afetar processamento assíncrono ou concorrente.

### 4.3. Arquitetura e qualidade

Avalie:

- Responsabilidades e separação de interesses.
- Acoplamento e coesão.
- Respeito às convenções do projeto.
- Duplicação relevante.
- Complexidade desnecessária.
- Uso inadequado de abstrações.
- Violações relevantes de princípios SOLID.

Não sinalize preferências de estilo como problemas funcionais.

### 4.4. Segurança e integridade

Verifique:

- Validação de entradas.
- Autenticação e autorização.
- Exposição de informações sensíveis.
- Consultas e operações inseguras.
- Integridade dos dados.
- Tratamento de exceções.
- Uso inadequado de configurações e segredos.

### 4.5. Performance e concorrência

Avalie quando aplicável:

- Consultas desnecessárias.
- Operações repetitivas.
- Consumo excessivo de memória.
- Processamento ineficiente.
- Problemas de concorrência.
- Ausência de cancelamento em operações assíncronas relevantes.
- Possibilidade de bloqueios ou duplicidade de processamento.

### 4.6. Testes

Verifique:

- Se os comportamentos alterados possuem testes adequados.
- Se os cenários importantes estão cobertos.
- Se os testes realmente validam o comportamento esperado.
- Se existem testes frágeis ou dependentes de detalhes internos.
- Se alterações de comportamento exigem atualização dos testes existentes.

## 5. Classificação dos achados

Classifique cada problema identificado conforme sua gravidade.

| Severidade | Critério |
|---|---|
| Critical | Problema grave que pode comprometer segurança, integridade ou disponibilidade do sistema. |
| High | Bug ou risco significativo que pode causar falha funcional, regressão ou impacto relevante. |
| Medium | Problema relevante, mas com impacto limitado ou dependente de determinadas condições. |
| Low | Melhoria pontual de qualidade, legibilidade ou manutenção, sem impacto funcional significativo. |

Não eleve a severidade artificialmente.

Quando não houver problemas relevantes, informe claramente que nenhum achado foi identificado.

## 6. Formato dos achados

Cada achado deve apresentar:

- **Severidade:** classificação do problema.
- **Localização:** arquivo e linha, quando disponíveis.
- **Problema:** descrição objetiva do que está incorreto.
- **Impacto:** consequência prática.
- **Recomendação:** direção para corrigir o problema.

Priorize evidências concretas.

Exemplo:

**[High] Atualização de inscrição sem validar o status atual**

- Localização: `InscricaoService.cs`
- Problema: a atualização ocorre sem verificar se a inscrição está em um estado que permite a operação.
- Impacto: pode permitir alteração indevida de uma inscrição já finalizada.
- Recomendação: validar o status antes de executar a atualização.

Não invente linhas, comportamentos ou consequências que não possam ser sustentados pelo código analisado.

## 7. O que evitar

Não apresente como achado:

- Preferências pessoais de implementação.
- Sugestões cosméticas sem benefício relevante.
- Refatorações fora do escopo.
- Problemas hipotéticos sem evidências.
- Duplicações irrelevantes.
- Recomendações que contrariem os padrões estabelecidos pelo projeto sem justificativa.

Não modifique os arquivos durante a revisão.

A revisão deve ser somente leitura, salvo autorização explícita para iniciar uma etapa separada de correção.

## 8. Relatório final

Organize o resultado da revisão nesta estrutura:

### Resumo
Apresente uma visão geral da qualidade e dos riscos encontrados.

### Achados
Liste os problemas identificados, ordenados por severidade.

### Pontos de atenção
Apresente riscos ou dúvidas que dependam de validação adicional, sem classificá-los como bugs confirmados.

### Testes e validações
Informe quais verificações foram executadas e seus resultados.

### Conclusão
Informe se foram identificados impedimentos relevantes para aprovação.

Não declare que uma alteração está pronta para produção apenas com base em uma revisão estática.

## 9. Princípio fundamental

Uma boa revisão identifica problemas reais antes que eles cheguem aos ambientes seguintes.

Priorize precisão, evidências e impacto.

É melhor apresentar poucos achados relevantes do que uma lista extensa de sugestões sem valor prático.
