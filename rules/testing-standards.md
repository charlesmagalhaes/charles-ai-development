# Testing Standards

## 1. Objetivo

Estabelecer padrões para criação, execução e manutenção de testes automatizados, garantindo confiabilidade, previsibilidade e facilidade de manutenção.

As estratégias e ferramentas devem respeitar a tecnologia, a arquitetura e as convenções existentes em cada projeto.

## 2. Estratégia de testes

Considere os diferentes níveis de testes conforme a necessidade:

- **Testes unitários:** verificam comportamentos isolados de unidades de código.
- **Testes de integração:** verificam a interação entre componentes, serviços, persistência e dependências externas.
- **Testes ponta a ponta (E2E):** validam fluxos completos sob a perspectiva do usuário ou consumidor.
- **Testes de contrato:** verificam compatibilidade entre componentes e integrações.

Priorize testes unitários para regras de negócio isoláveis e testes de integração quando o comportamento depender da interação real entre componentes.

Não crie testes de todos os níveis indiscriminadamente. Escolha a estratégia adequada ao risco e ao objetivo da alteração.

## 3. Análise antes da implementação

Antes de criar ou modificar testes:

- Analise os testes existentes.
- Identifique o framework e as bibliotecas utilizadas.
- Observe a organização dos arquivos e classes.
- Identifique convenções de nomenclatura.
- Verifique os padrões de criação de objetos e dados de teste.
- Reutilize fixtures, builders e utilitários existentes quando apropriado.
- Identifique comportamentos já cobertos para evitar duplicação desnecessária.
- Não introduza bibliotecas sem necessidade técnica.

## 4. Padrão AAA

Utilize o padrão Arrange, Act, Assert como referência para organizar testes.

### Arrange

Prepare os dados, objetos, dependências e comportamentos simulados necessários.

### Act

Execute a operação que está sendo testada.

### Assert

Verifique o resultado e os efeitos esperados.

Mantenha as etapas claras e organizadas. Evite misturar preparação, execução e validação de forma que dificulte a compreensão.

## 5. Nomenclatura

- Utilize nomes que expressem o comportamento esperado.
- Prefira nomes em português quando essa for a convenção do projeto.
- Utilize o padrão `Deve