# Quality Gates

## 1. Objetivo

Definir critérios verificáveis para avaliar quando uma tarefa de desenvolvimento pode ser considerada concluída.

Os gates devem reduzir regressões e entregas incompletas sem transformar mudanças simples em processos burocráticos. Aplique somente os critérios compatíveis com o tipo, o escopo e o risco da tarefa.

## 2. Estados de validação

Registre cada critério aplicável com um destes estados:

- **PASS:** verificação executada e aprovada, com evidência.
- **FAIL:** verificação executada e reprovada.
- **NOT RUN:** verificação aplicável que não foi executada.
- **N/A:** critério não aplicável ao escopo, com justificativa quando não for óbvio.

Nunca classifique uma verificação como PASS apenas porque não foram observados problemas durante a leitura do código.

## 3. Gate 0 — Escopo e entendimento

Antes de implementar uma tarefa relevante:

- [ ] Objetivo e comportamento esperado compreendidos.
- [ ] Critérios de aceitação identificados ou esclarecidos.
- [ ] Arquivos, componentes e integrações afetados investigados.
- [ ] Regras de negócio e contratos existentes considerados.
- [ ] Riscos, dependências e áreas de regressão identificados.
- [ ] Abordagem proporcional ao tamanho e ao risco da mudança definida.

Se faltar uma informação essencial que possa alterar a solução, solicite esclarecimento antes de assumir um comportamento.

## 4. Gate 1 — Implementação

Durante a implementação, verifique:

- [ ] Alteração atende ao escopo solicitado.
- [ ] Arquitetura e convenções existentes foram respeitadas.
- [ ] Responsabilidades e contratos permanecem coerentes.
- [ ] Tratamento de erros e cenários excepcionais foi considerado.
- [ ] Segurança e integridade dos dados foram preservadas.
- [ ] Não foram introduzidas dependências ou abstrações sem justificativa.
- [ ] Não existem alterações incidentais fora do escopo.

Critérios não pertinentes à mudança devem ser marcados como N/A, não ignorados silenciosamente.

## 5. Gate 2 — Testes e validação técnica

Escolha comandos com base nos arquivos de configuração e scripts reais do projeto. Não invente comandos nem presuma que uma ferramenta está instalada.

Conforme aplicável:

- [ ] Build ou compilação executado.
- [ ] Testes automatizados relevantes executados.
- [ ] Testes de regressão relacionados ao comportamento alterado considerados.
- [ ] Lint, análise estática e verificação de tipos executados quando disponíveis.
- [ ] Contratos de API, eventos ou integrações verificados quando afetados.
- [ ] Migrações, scripts SQL e alterações de persistência revisados quando aplicáveis.
- [ ] Resultado e saída relevante das verificações analisados.

Se uma verificação não puder ser executada por falta de ambiente, dependência, acesso ou infraestrutura, registre NOT RUN e explique o motivo. Não substitua execução por suposição.

### Seleção proporcional de testes

- **Correção de bug:** valide o cenário que reproduzia o defeito e inclua teste de regressão quando viável.
- **Nova funcionalidade:** valide os critérios de aceitação e os principais cenários positivos e negativos.
- **Refatoração:** confirme que o comportamento anterior foi preservado por testes ou outras evidências adequadas.
- **Alteração de API ou integração:** avalie compatibilidade, contratos, erros e consumidores afetados.
- **Alteração de banco de dados:** revise impacto nos dados, compatibilidade, plano de execução e possibilidade de reversão quando aplicável.
- **Documentação:** confira precisão, links, exemplos e consistência com o comportamento atual; build e testes de código normalmente são N/A.
- **Configuração ou infraestrutura:** valide sintaxe, escopo, impacto e estratégia de reversão; não aplique mudanças em ambientes compartilhados ou produtivos sem autorização.

## 6. Gate 3 — Revisão independente

Acione o `code-review-agent` para mudanças relevantes quando a revisão independente trouxer benefício, especialmente em:

- Alterações de regras de negócio.
- Correções com risco de regressão.
- Mudanças em persistência ou integridade de dados.
- Segurança, autenticação e autorização.
- Contratos de API e integrações.
- Refatorações abrangentes ou decisões arquiteturais.

A revisão deve avaliar o diff completo e o contexto relacionado. O agente de revisão é somente leitura e deve apresentar achados com evidências.

Para alterações pequenas e de baixo risco, o Tech Lead pode realizar a revisão diretamente e registrar essa decisão.

## 7. Gate 4 — Resolução e decisão

Antes de concluir:

- [ ] Achados Critical e High foram corrigidos ou explicitamente aceitos pelo usuário responsável.
- [ ] Achados Medium foram resolvidos ou registrados como pendência justificada.
- [ ] Correções realizadas após a revisão foram revalidadas.
- [ ] Não há falhas de validação relevantes sem explicação.
- [ ] Limitações, riscos residuais e itens não executados foram comunicados.

Não esconda achados nem reduza sua severidade apenas para aprovar a entrega.

## 8. Critérios de bloqueio

A tarefa não deve ser apresentada como concluída sem ressalvas quando:

- Existe falha reproduzível que compromete o requisito principal.
- Existe achado Critical ou High ainda não resolvido e não aceito explicitamente.
- Uma validação essencial falhou.
- Há risco conhecido de perda ou corrupção de dados sem mitigação adequada.
- A implementação depende de uma premissa essencial ainda não confirmada.

Quando houver bloqueio, apresente o que foi concluído, o motivo do bloqueio e o próximo passo necessário.

Uma verificação NOT RUN não bloqueia automaticamente toda tarefa. O Tech Lead deve avaliar sua importância para o risco e deixar a limitação explícita.

## 9. Relatório de conclusão

Para tarefas relevantes, finalize com um resumo curto neste formato:

### Resultado
Concluído, concluído com ressalvas ou bloqueado.

### Validações
| Verificação | Estado | Evidência ou justificativa |
|---|---|---|
| Build | PASS / FAIL / NOT RUN / N/A | Comando e resultado |
| Testes | PASS / FAIL / NOT RUN / N/A | Comando, quantidade ou motivo |
| Lint / análise estática | PASS / FAIL / NOT RUN / N/A | Comando e resultado |
| Revisão | PASS / FAIL / NOT RUN / N/A | Agente ou revisão direta |

Inclua somente linhas pertinentes à tarefa.

### Pendências e riscos
Liste limitações, achados aceitos e próximos passos. Se não houver, informe isso claramente.

Não declare aprovação absoluta nem garantia de ausência de defeitos. O relatório deve refletir apenas as verificações realmente realizadas.

## 10. Princípio fundamental

Um Quality Gate é uma evidência de controle, não uma formalidade. A profundidade da validação deve acompanhar o risco da mudança, e toda conclusão deve ser transparente e verificável.
