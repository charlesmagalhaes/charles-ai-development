# Workflow: Bug Fix Investigation & Resolution

## 1. Objetivo

Orquestrar investigação e correção de bugs de forma estruturada, garantindo identificação de causa raiz, implementação controlada, testes adequados e validação de qualidade.

Este workflow é reutilizável para qualquer bug, independentemente da complexidade ou tecnologia envolvida.

## 2. Quando invocar

Identifique automaticamente uma demanda como bug quando:

- Existe **comportamento inesperado** confirmado.
- O sistema não funciona como **esperado**.
- Há **regressão** (comportamento que funcionava parou de funcionar).
- **Dados foram alterados** incorretamente.
- **Validações falham** sem razão aparente.
- **Erros ou exceções** ocorrem em cenários válidos.

**Exemplos:**
- "API retorna erro 500 ao processar pedidos com múltiplos itens"
- "Campo de data não aceita valores válidos"
- "Usuários relatam perda de dados após sincronização"
- "Teste que passava agora falha intermitentemente"

**Não usar para:**
- Novas funcionalidades (use product discovery flow)
- Melhorias ou refatorações sem problema identificado
- Questões de design ou preferência técnica

## 3. Fases do workflow

### Fase 0: Compreender o Problema

**Objetivo:** Coletar informações suficientes antes de investigar.

**Atividades:**
- [ ] Identificar comportamento esperado (quando funcionava, o que a spec diz, etc.)
- [ ] Descrever comportamento atual (o que está acontecendo agora)
- [ ] Coletar evidências (logs, screenshots, stack traces, dados de teste)
- [ ] Identificar quando começou (primeira ocorrência, trigger)
- [ ] Avaliar impacto (quantos usuários, quais fluxos afetados, severidade)
- [ ] Confirmar se é reproduzível (sempre, intermitente, em condições específicas)
- [ ] Descartar causas óbvias (configuração errada, ambiente, dependência)

**Critérios de bloqueio:**
- ❌ Falta informação essencial → Solicitar esclarecimento antes de avançar
- ❌ Comportamento esperado não está claro → Perguntar ao usuário ou stake holder
- ❌ Não conseguir reproduzir → Marcar como NOT RUN fase 1, registrar limitação

**Template de Entrada (use como checklist):**
```
Comportamento Esperado: [descreva o que deveria acontecer]
Comportamento Atual: [descreva o que realmente acontece]
Quando Começou: [data/commit/evento que disparou]
Reproduzibilidade: [sempre / intermitente / em condições específicas]
Evidências:
  - Log/Stack Trace: [se disponível]
  - Screenshot/Vídeo: [se relevante]
  - Dados de Teste: [valores que reproduzem]
Impacto: [quantos usuários, quais fluxos, severidade]
Tentativas Anteriores: [se já tentou algo]
```

**Entrada do Tech Lead após completar template:**
> "Compreendo o problema: [resumo]. Comportamento esperado é [X], o que está acontecendo é [Y]. Reproduzível: [sim/não/intermitente]. Impacto: [descrição]. Vou investigar."

---

### Fase 1: Investigar

**Objetivo:** Explorar o código, fluxo e dependências para formular hipóteses.

**Atividades:**
- [ ] Localizar componentes envolvidos (qual arquivo, classe, função)
- [ ] Rastrear fluxo de execução (entrada → processamento → saída)
- [ ] Analisar dependências (qual serviço, banco, integração é usada)
- [ ] Executar testes existentes relacionados (todos passam? algum falha?)
- [ ] Reproduzir o bug localmente (confirmar, não assumir)
- [ ] Revisar alterações recentes que podem ter causado (commits recentes)
- [ ] Consultar logs, eventos ou métricas se disponíveis
- [ ] Formular hipóteses sobre causa (não fixar em uma)

**Quando delegar:**
- **dotnet-developer:** Se requer rastreamento profundo de código .NET, análise de banco de dados, integrações
- **frontend-developer:** Se bug está em interface, estado ou interação
- **test-engineer:** Se precisa criar teste para reproduzir ou validar

**Critérios de bloqueio:**
- ❌ Não conseguir localizar o código → Registrar como NOT RUN, perguntar ao time
- ❌ Teste não consegue reproduzir → Marcar como gap, pode ser intermitente

**Saída esperada:**
> "Investigação concluída. Bug está em [arquivo/função]. Fluxo é [descrição]. Hipóteses:
> 1. [H1 - mais provável]
> 2. [H2]
> 3. [H3 - menos provável]"

---

### Fase 2: Identificar Causa Raiz

**Objetivo:** Comprovar uma única causa, não hipóteses.

**Atividades:**
- [ ] Adicionar logs ou breakpoints para examinar estado (não presumir)
- [ ] Executar teste isolado que reproduz exatamente o erro
- [ ] Validar cada hipótese com evidência (testes, logs, inspection de memória)
- [ ] Descartar causas alternativas (executar teste sem a correção proposta)
- [ ] Confirmar que a causa é de fato o problema (não sintoma)
- [ ] Documentar exatamente qual condição causa o erro
- [ ] Validar se regressão ou problema novo (histórico)

**Quando delegar:**
- **dotnet-developer:** Debug profundo, análise de comportamento runtime, SQL queries
- **test-engineer:** Criar teste robusto que reproduz consistently

**Critérios de bloqueio:**
- ❌ Hipóteses não comprovadas → Continuar investigando, não avançar baseado em guess
- ❌ Múltiplas causas possíveis → Priorizar e testar cada uma separadamente

**Saída esperada:**
> "Causa raiz identificada: [descrição precisa]. Localização: [arquivo:linha ou função]. 
> Condição: [quando ocorre exatamente]. Evidência: [teste falhando, log, etc.]. 
> Natureza: [lógica incorreta / validação ausente / tipo de dado / concorrência / etc.]"

---

### Fase 3: Planejar Correção

**Objetivo:** Definir abordagem antes de implementar.

**Atividades:**
- [ ] Propor solução mínima (pequena mudança que resolve)
- [ ] Avaliar impacto em outros fluxos (pode quebrar algo?)
- [ ] Verificar se há casos de teste que cobrem (ou precisa criar)
- [ ] Considerar se é fix ou refatoração (não misturar)
- [ ] Consultar arquitetura (respeita padrões existentes?)
- [ ] Estimar risco (baixo / médio / alto)
- [ ] Planejar testes (qual cenário validar, qual regressão cobrir)

**Referências:**
- `rules/general-principles.md` → Simplicidade
- `rules/software-engineering.md` → Arquitetura
- `rules/code-quality.md` → Implementação

**Critérios de bloqueio:**
- ❌ Solução requer mudança arquitetural → Discutir com Tech Lead (pode não ser um fix simples)
- ❌ Vai quebrar contrato público → Avaliar alternativas

**Saída esperada:**
> "Plano: [descrição]. Arquivos afetados: [lista]. Risco: [baixo/médio/alto]. 
> Testes necessários: [list]. Impacto estimado: [análise]. Pronto para implementar."

---

### Fase 4: Implementar

**Objetivo:** Realizar a menor alteração necessária para resolver a causa raiz.

**Atividades:**
- [ ] Implementar a solução conforme planejado
- [ ] Atualizar testes existentes se necessário (preservar cobertura)
- [ ] Criar teste específico para o bug (regressão)
- [ ] Respeitar convenções e padrões do projeto
- [ ] Preservar comportamentos não relacionados
- [ ] Evitar refatorações que não estejam no escopo

**Quando delegar:**
- **dotnet-developer:** Implementação em .NET
- **frontend-developer:** Implementação em frontend

**Critérios de bloqueio:**
- ❌ Alterações incidentais (refactor não pedido) → Remover antes de avançar
- ❌ Testes não criados/atualizados → Implementar antes de avançar

**Saída esperada:**
> "Implementação concluída. Arquivos alterados: [lista com linha/função]. 
> Teste criado/atualizado: [descrição]. Pronto para validação."

---

### Fase 5: Testar e Validar

**Objetivo:** Confirmar que o bug foi resolvido e sem regressões.

**Atividades:**
- [ ] Executar teste criado para o bug (deve passar agora)
- [ ] Executar todos os testes relacionados (não quebrou nada?)
- [ ] Executar testes de regressão se aplicável
- [ ] Build/compilação sem erros
- [ ] Lint e análise estática conforme o projeto
- [ ] Verificar que comportamento esperado agora funciona
- [ ] Testar cenários de fronteira (valores limites, nulos, inválidos)

**Referência:**
- `rules/quality-gates.md` → Gate 2 (Testes e validação técnica)
- `rules/testing-standards.md` → Estratégia de testes

**Quando delegar:**
- **test-engineer:** Estratégia completa de testes e validação

**Critérios de bloqueio (FAIL = bloqueio):**
- ❌ Teste do bug ainda falha → Volta para fase 2 (causa não foi resolvida)
- ❌ Regressão em teste existente → Volta para fase 4 (implementação introduziu novo problema)
- ❌ Build falha → Corrigir antes de avançar
- ❌ Teste não foi executado → Registrar NOT RUN e justificar (ambiente, dependência)

**Saída esperada:**
> "Validação concluída. 
> - Teste do bug: PASS
> - Testes relacionados: [X] PASS, [Y] PASS
> - Build: PASS
> - Sem regressões. Pronto para revisão."

---

### Fase 6: Revisar (Code Review)

**Objetivo:** Validação independente da implementação e testes.

**Atividades:**
- [ ] Acionar `code-review-agent` se requer revisão independente (see criteria abaixo)
- [ ] Ou revisar diretamente como Tech Lead se bug é simples/baixo risco
- [ ] Validar que a causa raiz foi de fato resolvida
- [ ] Validar que a solução respeta arquitetura
- [ ] Validar que testes são adequados
- [ ] Registrar achados (Critical / High / Medium / Low)

**Quando usar code-review-agent:**
- ✅ Bug relacionado a regras de negócio
- ✅ Risco de regressão significativo
- ✅ Mudança em persistência ou integridade de dados
- ✅ Segurança ou autenticação envolvida
- ✅ Contrato de API ou integração afetado

**Quando revisar diretamente como Tech Lead:**
- ✅ Bug simples (typo, lógica óbvia, configuração)
- ✅ Risco baixo
- ✅ Mudança isolada em uma função

**Critérios de bloqueio:**
- ❌ Achado Critical não resolvido → Volta para fase 4 / 5
- ❌ Achado High não resolvido → Volta para fase 4 / 5
- ❌ Achado Medium → Registrar como pendência justificada ou resolver

**Saída esperada (revisão direta):**
> "Revisão concluída (Tech Lead). Sem problemas críticos identificados. 
> Implementação respeta arquitetura. Testes adequados. Pronto para Quality Gates finais."

OU (revisão independente):
> "code-review-agent concluiu revisão. Achados: [descrição]. Recomendações: [ações]."

---

### Fase 7: Registrar Quality Gates

**Objetivo:** Documentar validações e decisão final.

**Referência:**
- `rules/quality-gates.md` → Relatório de conclusão

**Checklist:**

| Gate | Critério | Estado | Evidência |
|---|---|---|---|
| **Gate 0** | Compreensão do problema | PASS / NOT RUN | Fase 0 completa |
| **Gate 1** | Implementação respeitou arquitetura | PASS / FAIL | Code review |
| **Gate 2** | Testes executados, bug resolvido | PASS / FAIL / NOT RUN | Fase 5, logs de teste |
| **Gate 2** | Sem regressões | PASS / FAIL / NOT RUN | Suite de testes passou |
| **Gate 3** | Revisão técnica (se aplicável) | PASS / N/A | Revisão concluída |
| **Gate 4** | Achados resolvidos/aceitos | PASS / FAIL | Nenhum Critical/High aberto |

**Critérios de bloqueio (tarefa não concluída):**
- ❌ Gate 1 FAIL (arquitetura não respeitada)
- ❌ Gate 2 FAIL (testes falharam ou regressão)
- ❌ Gate 3 FAIL (achados Critical/High não resolvidos)
- ❌ Gate 4 FAIL (pendências não justificadas)

---

## Formato do Resumo Executivo

**Responsabilidade:** Documentar o que foi realizado para auditoria e conhecimento (não é uma fase do processo, e sim um template de saída esperada).

**Objetivo:** Padronizar a documentação após conclusão de todas as 7 fases.

**Formato:**

```
## Bug Fix: [Título Breve]

### Problema
[Descrição do comportamento inesperado, impacto]

### Causa Raiz
[Exatamente o que estava errado, em qual arquivo/função, por que ocorria]

### Solução
[O que foi mudado, por que resolve o problema]

### Arquivos Alterados
- [arquivo1.cs] - [mudança específica]
- [arquivo2.cs] - [mudança específica]

### Testes
- Teste criado: [descrição do teste que valida o fix]
- Testes executados: [X] PASS, [Y] PASS, [Z] PASS
- Cobertura: [se relevante]

### Riscos Residuais
[Se houver, descrever aqui. Caso contrário, "Nenhum risco identificado."]

### Próximos Passos
[Se há pendências, descrever aqui. Caso contrário, "Pronto para merge."]
```

**Saída esperada:**
> "[Resumo completo acima]. Todas as fases concluídas. Quality Gates PASS. 
> Trabalho pronto para submissão. Aguardando autorização explícita do usuário para commit, push e merge."

**Obrigação:** Nenhum commit, push ou merge pode ser realizado sem autorização explícita do usuário. O resumo é preparação, não ação.

---

## 4. Integração com Agentes e Skills Existentes

### Agentes utilizáveis conforme necessidade

| Agente | Quando usar |
|---|---|
| `dotnet-developer` | Debug profundo, implementação .NET, análise de banco de dados |
| `frontend-developer` | Bug em interface, estado, interação |
| `test-engineer` | Estratégia de testes, reprodução consistente, validação |
| `code-review-agent` | Revisão independente quando risco/complexidade é alta |

**Regra:** Não obrigar uso de todos os agentes em bugs simples. Exemplo: typo em mensagem de erro não precisa de code-review-agent.

### Skills reutilizáveis

| Skill | Quando usar |
|---|---|
| `git-commit` | Preparar commit com mensagem Conventional Commits |
| `code-review` | Diretrizes durante revisão independente |
| `dotnet-development` | Padrões de implementação .NET |
| `testing-standards` | Padrões de testes |

---

## 5. Critérios de Interrupção

Interrompa o workflow e solicite esclarecimento ao usuário quando:

- Comportamento esperado não está claro
- Não conseguir reproduzir o bug
- Múltiplas causas possíveis sem forma de discriminar
- Falta informação essencial (logs, contexto, dados de teste)
- Implementação requer mudança arquitetural (possivelmente não é um bug simples)

**Registre como NOT RUN** e documento a limitação.

---

## 6. Regras de Ouro

✅ **Sempre:**
- Compreender antes de investigar
- Testar a hipótese antes de concluir
- Descartar causas alternativas com evidência
- Documentar achados e decisões
- Respeitar Quality Gates

❌ **Nunca:**
- Assumir causa sem evidência
- Refatorar enquanto corrige um bug (escopo distinto)
- Considerar teste não executado como "aprovado"
- Pular fase 2 (causa raiz é mandatório)
- Fazer commit, push ou merge sem autorização explícita do usuário
- Fazer commit sem passar por Quality Gates

---

## 7. Exemplo de Fluxo

**Cenário:** "API retorna erro 500 ao criar pedido com 10+ itens"

| Fase | Entrada | Saída |
|---|---|---|
| **0 - Compreender** | Comportamento esperado: API aceita 10+ itens. Atual: Erro 500. | Reproduzível, impacto: 5% dos pedidos, severidade alta |
| **1 - Investigar** | Rastrear código de criação de pedido | Hipótese: Loop sem limite, timeout de banco, validação |
| **2 - Causa Raiz** | Debug com 10+ itens + teste isolado | Causa: Query N+1 no banco (1 query por item = 10 queries, timeout) |
| **3 - Planejar** | Usar batch query, não alterar contrato | Plano: 1 query para todos itens, teste novo para N itens |
| **4 - Implementar** | Código alterado | Teste criado, cobertura preservada |
| **5 - Testar** | Suite de testes | Teste novo PASS, todos outros PASS, sem regressão |
| **6 - Revisar** | code-review-agent | Sem achados, implementação clean |
| **7 - Quality Gates** | Registrar PASS em todos Gates | Bloqueado? Não. Pronto para merge? Sim. |
| **7 - Resumo** | Documentar achados | Pronto para submissão |

**Cenário Alternativo: Causa Raiz Não Identificada**

| Fase | Entrada | Saída |
|---|---|---|
| **0 - Compreender** | "Teste X falha aleatoriamente, sem padrão claro" | Reproduzível: Intermitente, causa desconhecida |
| **1 - Investigar** | Rastrear código de teste, revisar logs | Sem padrão evidente, múltiplas hipóteses |
| **2 - Causa Raiz** | Adicionar logs, executar 50x, ainda intermitente | ❌ BLOQUEIO: Causa não identificada, múltiplas hipóteses ainda válidas |
| **Decisão** | Registrar como "Necessita Investigação Adicional" | Criar subtask: "Investigar falha intermitente em Teste X" com evidências coletadas |
| **Quality Gates** | Gate 2: NOT RUN (causa raiz não comprovada) | Documento: Hipóteses, evidências, próximas ações sugeridas |

---

## 8. Referências

- `CLAUDE.md` → Orquestração de subagents
- `rules/quality-gates.md` → Validação de conclusão
- `rules/general-principles.md` → Simplicidade
- `rules/software-engineering.md` → Arquitetura
- `rules/code-quality.md` → Implementação
- `rules/testing-standards.md` → Testes
- `rules/git-conventions.md` → Commits
- `agents/dotnet-developer.md` → Implementação .NET
- `agents/test-engineer.md` → Estratégia de testes
- `agents/code-review-agent.md` → Revisão independente

---

## 9. Regra Fundamental

Um bug fix deve resolver **exatamente o problema identificado**, sem inventar correções adicionais, sem refatorações não pedidas, e sem deixar testes não executados no caminho.

**Sequência obrigatória:** Compreender → Investigar → Comprovar → Implementar → Validar → Revisar → Quality Gates

**Sem exceção:** Nenhum commit, push ou merge sem autorização explícita do usuário.
