# Code Quality

## 1. Objetivo

Estabelecer critérios objetivos para avaliar a qualidade do código durante o desenvolvimento, manutenção e revisão de software.

Estas diretrizes devem orientar tanto a implementação quanto a identificação de problemas em código existente.

## 2. Legibilidade

- O código deve ser compreensível sem exigir esforço desnecessário.
- Utilize nomes claros e representativos da intenção.
- Evite abreviações sem significado evidente.
- Mantenha uma organização consistente.
- Evite expressões excessivamente longas ou complexas.
- Prefira estruturas explícitas quando melhorarem a compreensão.
- Evite comentários redundantes ou desatualizados.
- Documente comportamentos complexos e decisões não evidentes.

## 3. Complexidade

- Mantenha métodos e funções focados em responsabilidades coerentes.
- Evite condicionais profundamente aninhadas.
- Reduza ramificações desnecessárias.
- Evite métodos com quantidade excessiva de parâmetros.
- Identifique trechos cuja complexidade dificulte testes e manutenção.
- Extraia responsabilidades quando isso melhorar efetivamente a compreensão.
- Não divida métodos artificialmente apenas para reduzir seu tamanho.

## 4. Duplicação

- Identifique duplicações de regras de negócio e comportamentos relevantes.
- Reutilize implementações existentes quando apropriado.
- Evite replicar validações e transformações em diferentes componentes.
- Não crie abstrações genéricas apenas para eliminar pequenas repetições.
- Avalie se a duplicação é realmente problemática antes de propor refatoração.

## 5. Tratamento de erros e exceções

- Trate erros de acordo com sua natureza e contexto.
- Não ignore exceções silenciosamente.
- Evite capturar exceções sem necessidade.
- Não utilize exceções como substitutas de fluxos normais de controle.
- Preserve informações relevantes para diagnóstico.
- Evite expor detalhes internos ou sensíveis em mensagens apresentadas aos usuários.
- Garanta que falhas sejam propagadas ou tratadas adequadamente.

## 6. Validação de dados

- Valide entradas conforme os requisitos e contratos estabelecidos.
- Não confie automaticamente em dados recebidos de sistemas externos.
- Considere valores nulos, vazios, inválidos e fora dos limites esperados.
- Evite validações redundantes em diferentes camadas sem justificativa.
- Mantenha regras de validação próximas da responsabilidade correspondente.
- Diferencie validações de formato, consistência e regras de negócio.

## 7. Logging e observabilidade

- Registre eventos relevantes para diagnóstico e acompanhamento do sistema.
- Utilize níveis de log adequados à natureza do evento.
- Evite logs excessivos ou sem valor operacional.
- Inclua contexto suficiente para investigar falhas.
- Não registre senhas, tokens, credenciais ou dados pessoais sensíveis.
- Evite registrar a mesma falha repetidamente em diferentes camadas sem necessidade.
- Preserve correlação entre operações distribuídas quando os mecanismos do projeto permitirem.

## 8. Segurança

- Considere vulnerabilidades relacionadas às entradas, permissões e exposição de dados.
- Evite SQL Injection, XSS, CSRF e outras vulnerabilidades aplicáveis à tecnologia utilizada.
- Não armazene segredos diretamente no código-fonte.
- Utilize mecanismos seguros de autenticação e autorização.
- Não exponha informações internas em respostas ou logs.
- Respeite os controles de segurança já existentes.
- Não desabilite validações ou proteções para contornar problemas de implementação.

## 9. Desempenho

- Evite operações desnecessárias e processamento redundante.
- Identifique consultas, chamadas externas e operações potencialmente custosas.
- Considere uso de memória, processamento e recursos externos.
- Evite otimizações prematuras sem evidências.
- Priorize otimizações baseadas em medições ou problemas identificados.
- Considere o impacto de operações repetidas, processamento em lote e concorrência quando aplicável.

## 10. Manutenibilidade

- Preserve consistência com os padrões do projeto.
- Evite dependências desnecessárias.
- Reduza efeitos colaterais inesperados.
- Mantenha contratos e responsabilidades bem definidos.
- Evite código morto e implementações obsoletas.
- Considere o impacto de alterações em consumidores existentes.
- Prefira mudanças incrementais e de baixo risco.

## 11. Revisão de código

Ao revisar uma implementação:

- Priorize problemas que afetem comportamento, segurança, estabilidade ou manutenibilidade.
- Apresente evidências concretas para cada apontamento.
- Identifique arquivo e localização do problema sempre que possível.
- Explique o impacto e o cenário em que o problema ocorre.
- Sugira uma correção objetiva.
- Diferencie problemas reais de preferências pessoais.
- Não reporte como defeito uma escolha válida apenas porque existe outra abordagem possível.
- Evite apontamentos duplicados.
- Não aprove uma implementação com problemas críticos ou relevantes ainda não resolvidos.

### Classificação dos achados

- **Crítico:** vulnerabilidades graves, perda ou corrupção de dados e falhas com impacto severo.
- **Alto:** defeitos relevantes que comprometem funcionalidades, integridade ou estabilidade.
- **Médio:** problemas que podem causar comportamentos incorretos em cenários específicos ou dificultar significativamente a manutenção.
- **Baixo:** melhorias pontuais de legibilidade, consistência ou manutenção, sem impacto funcional relevante.

A classificação deve considerar o impacto real e a probabilidade do problema, não apenas sua aparência.

## 12. Critérios de conclusão

Uma implementação pode ser considerada concluída quando:

- Atende ao objetivo solicitado.
- Respeita os requisitos e contratos existentes.
- Não introduz problemas conhecidos relevantes.
- Mantém consistência com a arquitetura e os padrões do projeto.
- Possui testes pertinentes quando aplicáveis.
- Passou pelas validações possíveis no ambiente disponível.
- Não contém alterações incidentais fora do escopo.
- Limitações e pendências conhecidas foram comunicadas.

## 13. Regra fundamental

Qualidade não significa apenas código que funciona. Significa código correto, seguro, compreensível, testável e sustentável ao longo do tempo.