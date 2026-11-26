# Software Engineering

## 1. Objetivo

Definir diretrizes de engenharia de software para orientar decisões de design, organização, implementação e evolução de sistemas.

Os princípios devem ser aplicados considerando o contexto, os requisitos e a arquitetura existente. Não devem ser tratados como regras mecânicas ou justificativas para complexidade desnecessária.

## 2. Princípios SOLID

Considere os princípios SOLID como referências para melhorar a qualidade do design.

### Single Responsibility Principle (SRP)

- Cada módulo, classe ou componente deve possuir uma responsabilidade bem definida.
- Evite concentrar responsabilidades que mudam por motivos diferentes.
- Considere a coesão antes de dividir componentes.
- Não fragmente classes apenas para reduzir seu tamanho.

### Open/Closed Principle (OCP)

- Favoreça soluções que permitam evolução sem modificações recorrentes em componentes estáveis.
- Utilize abstrações e pontos de extensão quando houver necessidade real de variação.
- Evite criar mecanismos de extensibilidade para cenários hipotéticos.

### Liskov Substitution Principle (LSP)

- Subtipos devem preservar os contratos e comportamentos esperados dos tipos que estendem.
- Não altere as expectativas de uso de uma abstração por meio de implementações incompatíveis.
- Prefira composição quando a relação de herança não representar corretamente o domínio.

### Interface Segregation Principle (ISP)

- Mantenha interfaces coesas e orientadas às necessidades dos consumidores.
- Evite contratos genéricos que obriguem implementações a depender de operações desnecessárias.
- Prefira interfaces específicas quando existirem responsabilidades distintas.

### Dependency Inversion Principle (DIP)

- Componentes de alto nível não devem depender diretamente de detalhes de implementação quando isso comprometer a arquitetura.
- Utilize abstrações para estabelecer limites de dependência quando houver benefício arquitetural.
- Evite interfaces criadas exclusivamente para cumprir formalidades.

## 3. Clean Code e legibilidade

- Escreva código que comunique claramente sua intenção.
- Utilize nomes que representem o propósito dos elementos.
- Mantenha funções e métodos focados em uma atividade coerente.
- Evite parâmetros excessivos e efeitos colaterais inesperados.
- Reduza condicionais e ramificações complexas quando houver uma alternativa mais clara.
- Evite comentários que apenas descrevam o código; prefira expressar a intenção por meio de nomes e estrutura.
- Documente decisões, regras ou comportamentos que não sejam evidentes pela implementação.
- Evite números e valores literais sem significado contextual quando constantes nomeadas melhorarem a compreensão.

## 4. Acoplamento e coesão

- Busque alta coesão e baixo acoplamento.
- Evite dependências desnecessárias entre módulos.
- Preserve limites de responsabilidade entre componentes.
- Evite compartilhar estado mutável sem necessidade.
- Reduza o conhecimento que um componente precisa ter sobre a implementação de outro.
- Não introduza camadas de indireção sem benefício concreto.

## 5. Encapsulamento e abstração

- Oculte detalhes de implementação que não precisam ser conhecidos pelos consumidores.
- Exponha contratos claros e coerentes.
- Proteja invariantes e regras de negócio nos componentes responsáveis por elas.
- Evite expor estruturas internas que permitam estados inválidos.
- Não crie abstrações genéricas antes de compreender as necessidades reais.
- Evite abstrações que apenas repassem chamadas sem agregar responsabilidade ou isolamento.

## 6. Composição e herança

- Prefira composição quando ela representar melhor a relação entre responsabilidades.
- Utilize herança quando existir uma relação legítima de especialização e substituição.
- Evite hierarquias profundas e rígidas.
- Não utilize herança apenas para compartilhar código.
- Avalie o impacto de mudanças na classe base sobre todas as implementações derivadas.

## 7. Design Patterns

- Utilize Design Patterns quando resolverem um problema concreto de design.
- Não aplique padrões apenas por familiaridade ou preferência.
- Evite introduzir estruturas complexas para cenários simples.
- Considere o custo de manutenção e a facilidade de compreensão.
- Priorize a clareza da solução em vez da quantidade de padrões utilizados.

## 8. Organização e evolução do código

- Organize componentes de acordo com suas responsabilidades e contexto de negócio.
- Preserve a consistência das estruturas existentes.
- Evite dependências circulares.
- Mantenha contratos estáveis sempre que possível.
- Considere compatibilidade com consumidores existentes antes de alterar interfaces públicas.
- Evite duplicação de regras de negócio em diferentes pontos do sistema.
- Refatore gradualmente quando isso reduzir riscos e melhorar a manutenibilidade.

## 9. Tratamento de complexidade

- Identifique complexidade essencial do domínio e diferencie-a de complexidade acidental.
- Não simplifique regras de negócio para reduzir artificialmente a quantidade de código.
- Evite soluções excessivamente genéricas.
- Prefira decisões explícitas quando melhorarem a compreensão.
- Considere o custo de abstrações, dependências e camadas adicionais.

## 10. Decisões e trade-offs

Ao avaliar uma solução técnica, considere:

- Complexidade de implementação.
- Facilidade de manutenção.
- Testabilidade.
- Desempenho.
- Segurança.
- Escalabilidade quando aplicável.
- Compatibilidade com a arquitetura existente.
- Custo de evolução.

Quando houver alternativas relevantes, apresente os benefícios, limitações e impactos de cada abordagem.

## 11. Regra fundamental

Princípios, padrões e abstrações são ferramentas para resolver problemas de engenharia. Sua aplicação deve melhorar efetivamente a qualidade do software, sem criar complexidade desnecessária.