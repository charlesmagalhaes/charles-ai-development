# Security Standards

## 1. Objetivo

Estabelecer diretrizes de segurança para desenvolvimento, manutenção e evolução de software.

A segurança deve ser considerada durante todo o ciclo de desenvolvimento, desde a análise dos requisitos até a implementação, validação e operação.

## 2. Princípios fundamentais

- Adote segurança por padrão.
- Aplique o princípio do menor privilégio.
- Não confie automaticamente em dados recebidos de usuários ou sistemas externos.
- Reduza a superfície de ataque.
- Proteja dados durante armazenamento e transmissão.
- Não enfraqueça mecanismos de segurança existentes para facilitar implementações.
- Considere o impacto de segurança antes de alterar autenticação, autorização ou tratamento de dados.

## 3. Autenticação e autorização

- Utilize os mecanismos de autenticação estabelecidos pelo projeto.
- Não implemente mecanismos próprios de gerenciamento de credenciais sem justificativa técnica.
- Verifique autorização em operações que acessam ou modificam recursos protegidos.
- Não confunda autenticação com autorização.
- Não confie exclusivamente em controles de interface para proteger operações.
- Valide permissões no componente responsável pela operação.
- Evite exposição de informações que permitam enumerar usuários, contas ou recursos protegidos.
- Preserve os controles de sessão e expiração de credenciais.

## 4. Proteção de dados e informações sensíveis

- Não exponha senhas, tokens, chaves, certificados ou credenciais.
- Não armazene segredos diretamente no código-fonte.
- Utilize mecanismos seguros de configuração e gerenciamento de segredos.
- Não registre informações sensíveis em logs.
- Evite retornar dados pessoais ou internos desnecessários em respostas.
- Respeite os requisitos de privacidade e proteção de dados aplicáveis.
- Utilize dados fictícios ou anonimizados em testes e exemplos.
- Compartilhe apenas as informações necessárias para cada operação.

## 5. Validação e sanitização de entradas

- Trate todas as entradas externas como potencialmente não confiáveis.
- Valide formato, tipo, tamanho e conteúdo conforme o contrato esperado.
- Considere valores nulos, vazios, limites e caracteres especiais.
- Utilize mecanismos de validação apropriados à tecnologia.
- Não confunda validação de entrada com autorização.
- Evite confiar em valores enviados pelo cliente para determinar permissões ou identidade.
- Preserve a integridade dos dados durante transformações e processamento.

## 6. Vulnerabilidades comuns

Considere as vulnerabilidades aplicáveis à tecnologia e ao contexto da aplicação.

### Injeção

- Utilize consultas parametrizadas.
- Evite concatenar entradas externas em comandos SQL, consultas ou comandos do sistema.
- Não execute conteúdo externo como código sem validação e controles apropriados.

### Cross-Site Scripting (XSS)

- Utilize mecanismos seguros de codificação e renderização de conteúdo.
- Evite inserir conteúdo não confiável diretamente no HTML.
- Respeite os mecanismos de proteção disponibilizados pelo framework.

### Cross-Site Request Forgery (CSRF)

- Utilize mecanismos de proteção adequados quando a aplicação depender de credenciais automaticamente enviadas pelo navegador.
- Avalie cookies, tokens e políticas de origem conforme a arquitetura.

### Exposição de dados

- Retorne somente informações necessárias ao consumidor.
- Evite mensagens de erro com detalhes internos.
- Proteja dados sensíveis durante armazenamento, transmissão e processamento.

### Desserialização insegura

- Não confie em conteúdo serializado proveniente de fontes externas.
- Utilize formatos e mecanismos seguros.
- Evite permitir instanciação arbitrária de tipos ou execução de comportamentos não confiáveis.

## 7. Dependências e bibliotecas

- Utilize dependências de fontes confiáveis.
- Avalie vulnerabilidades conhecidas em pacotes utilizados.
- Evite dependências desnecessárias ou abandonadas.
- Não atualize versões indiscriminadamente sem avaliar compatibilidade.
- Priorize a correção de vulnerabilidades relevantes.
- Respeite os processos de atualização e aprovação estabelecidos pelo projeto.

## 8. Comunicação e integrações

- Utilize canais seguros de comunicação.
- Valide certificados e identidade dos serviços remotos.
- Defina timeouts apropriados.
- Considere falhas, indisponibilidade e respostas inesperadas.
- Não exponha credenciais em URLs ou parâmetros desnecessários.
- Proteja integrações por meio dos mecanismos de autenticação e autorização adequados.
- Evite confiar cegamente em respostas de parceiros ou serviços externos.

## 9. Tratamento de erros e logs

- Não exponha stack traces, detalhes internos ou informações sensíveis ao usuário final.
- Registre eventos relevantes para auditoria e diagnóstico.
- Utilize níveis de log adequados.
- Não registre senhas, tokens, chaves ou dados pessoais sensíveis.
- Preserve informações úteis para investigação sem comprometer a confidencialidade.
- Evite ocultar falhas de segurança por meio de tratamentos genéricos.

## 10. Arquivos e operações externas

- Valide arquivos recebidos conforme tipo, tamanho e conteúdo esperado.
- Evite confiar exclusivamente na extensão de um arquivo.
- Controle caminhos e permissões de acesso.
- Evite operações arbitrárias sobre arquivos e diretórios.
- Não execute arquivos ou comandos provenientes de entradas não confiáveis.
- Avalie riscos de path traversal e acesso indevido.

## 11. Concorrência e integridade

- Considere condições de corrida em operações concorrentes.
- Preserve a integridade de dados em operações críticas.
- Utilize mecanismos transacionais quando apropriado.
- Avalie idempotência em operações que possam ser repetidas.
- Evite estados inconsistentes em fluxos distribuídos.
- Proteja operações sensíveis contra duplicidade e execução indevida.

## 12. Revisão de segurança

Durante a revisão de código:

- Identifique entradas não confiáveis e seu fluxo de processamento.
- Avalie autenticação e autorização.
- Verifique exposição de dados sensíveis.
- Analise consultas, comandos e operações externas.
- Avalie dependências e configurações relevantes.
- Identifique possíveis vulnerabilidades com evidências concretas.
- Classifique os achados conforme impacto e possibilidade de exploração.
- Recomende correções proporcionais ao risco.
- Não afirme que o sistema está seguro apenas porque não foram encontrados problemas na revisão.

## 13. Regra fundamental

A segurança não deve depender exclusivamente do comportamento esperado do usuário ou de sistemas externos. Toda operação deve possuir controles adequados aos riscos e à responsabilidade que executa.