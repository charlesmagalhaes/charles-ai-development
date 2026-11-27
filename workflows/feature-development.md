# Workflow: Feature Development

## 1. Objetivo

Orquestrar desenvolvimento de novas funcionalidades de forma estruturada, garantindo compreensão clara dos requisitos, design técnico sólido, implementação controlada, testes adequados e validação de qualidade.

Este workflow é reutilizável para qualquer funcionalidade, independentemente da complexidade ou tecnologia envolvida.

## 2. Quando Invocar

Identifique automaticamente uma demanda como feature development quando:

- Existe um **novo requisito** a ser implementado.
- Há uma **extensão** de funcionalidade existente.
- Precisa-se de uma **nova integração** com serviços externos.
- É necessário implementar **regras de negócio** novas.
- Há uma **mudança significativa** no produto.

**Exemplos:**
- "Implementar autenticação de dois fatores"
- "Adicionar sistema de permissões baseado em roles"
- "Criar integrações com pagamento via Stripe"
- "Implementar exportação de relatórios em PDF"

**Não usar para:**
- Correção de bug (use Bug Fix Workflow)
- Refatoração sem nova funcionalidade
- Configuração de ambiente ou infraestrutura
- Melhorias pontuais sem requisito novo

## 3. Fases do Workflow

### Fase 0: Compreender Requisitos

**Objetivo:** Garantir que requisitos estão claros, completos e alinhados antes de qualquer análise técnica.

**Atividades:**
- [ ] Identificar o que a feature deve fazer (comportamento esperado)
- [ ] Descrever os casos de uso principais
- [ ] Coletar requisitos funcionais
- [ ] Coletar requisitos não-funcionais (se relevante: performance, segurança, escalabilidade)
- [ ] Identificar restrições e dependências
- [ ] Identificar gaps ou ambiguidades nos requisitos

**Critérios de bloqueio:**
- ❌ Requisitos essenciais são ambíguo ou incompleto → Solicitar esclarecimento
- ❌ Falta informação crítica para prosseguir → Perguntar ao solicitante
- ✅ Contexto é suficiente para análise → Avançar para Fase 1

**Entrada do Tech Lead:**
> "Compreendi os requisitos: [resumo]. Comportamento esperado: [descrição]. Casos de uso: [lista]. Requisitos funcionais: [lista]. Requisitos não-funcionais: [se houver]. Dependências: [se houver]. Pronto para análise técnica."

---

### Fase 1: Analisar Contexto Técnico e Regras de Negócio

**Objetivo:** Compreender arquitetura, dependências e regras de negócio antes de planejar.

**Atividades:**
- [ ] Analisar arquitetura existente
- [ ] Identificar componentes relacionados
- [ ] Mapear regras de negócio que a feature implementa
- [ ] Identificar validações necessárias
- [ ] Descrever fluxos de processamento
- [ ] Revisar se há regras conflitantes com sistema existente
- [ ] Revisar banco de dados e modelos de dados
- [ ] Revisar padrões arquiteturais já estabelecidos

**Quando delegar:**
- **dotnet-developer:** Análise profunda de arquitetura backend, banco de dados, regras complexas
- **frontend-developer:** Análise de componentes, estado, integrações UI

**Critérios de bloqueio:**
- ❌ Regras de negócio conflitantes → Resolver com solicitante
- ❌ Arquitetura não permite a feature → Escalar para decisão arquitetônica
- ✅ Contexto técnico e regras compreendidas → Avançar para fase 2

**Saída esperada:**
> "Contexto técnico e regras mapeados. Componentes afetados: [lista]. Arquitetura permite: [sim/com restrições]. Padrões a seguir: [lista]. Sem conflitos identificados. Pronto para planejamento."

---

### Fase 2: Planejar Arquitetura Técnica

**Objetivo:** Definir abordagem técnica completa antes de implementar.

**Atividades:**
- [ ] Propor design/arquitetura da feature
- [ ] Definir quais componentes criar/modificar
- [ ] Planejar banco de dados (novas tabelas, migrações, etc.)
- [ ] Descrever fluxo de integração entre componentes
- [ ] Estimar esforço e complexidade (como referência)
- [ ] Identificar riscos técnicos
- [ ] Planejar estratégia de testes (quais testes, como cobrir)
- [ ] Definir que agentes serão necessários para implementação

**Referências:**
- `rules/software-engineering.md` → Padrões arquiteturais
- `rules/general-principles.md` → Simplicidade e design

**Critérios de bloqueio:**
- ❌ Design viola padrões arquiteturais → Revisar design
- ❌ Complexidade muito alta → Simplificar ou dividir em features menores
- ❌ Requer mudança em componentes críticos → Escalar para Tech Lead

**Saída esperada:**
> "Plano técnico definido: [descrição]. Componentes: [lista]. BD: [mudanças]. Testes planejados: [estratégia]. Agentes necessários: [lista]. Riscos: [se houver]. Pronto para implementação."

---

### Fase 3: Implementar Feature

**Objetivo:** Realizar implementação conforme plano, respeitando arquitetura e padrões.

**Atividades:**
- [ ] Implementar conforme plano técnico
- [ ] Criar/atualizar testes unitários
- [ ] Criar/atualizar testes de integração quando aplicável
- [ ] Respeitar padrões e convenções do projeto
- [ ] Preservar funcionalidades existentes
- [ ] Evitar refatorações fora do escopo

**Quando delegar:**
- **dotnet-developer:** Implementação backend
- **frontend-developer:** Implementação frontend
- **test-engineer:** Testes complexos

**Protocolo de Mudança de Escopo (veja Seção 7):**
Se requisito adicional for identificado → Interromper e consultar solicitante

**Critérios de bloqueio:**
- ❌ Alterações incidentais (refactor não pedido) → Remover antes de avançar
- ❌ Testes não criados → Implementar antes de avançar
- ❌ Viola padrões do projeto → Corrigir antes de avançar

**Saída esperada:**
> "Implementação concluída. Componentes: [lista]. Testes: [X unitários, Y integração]. Padrões respeitados. Pronto para validação."

---

### Fase 4: Testar e Validar

**Objetivo:** Confirmar que feature funciona conforme requisitos e sem regressões.

**Atividades (selecionar conforme aplicabilidade):**
- [ ] Executar testes unitários (todos passam)
- [ ] Executar testes de integração se aplicável (todos passam)
- [ ] Validar que feature atende requisitos
- [ ] Testar cenários principais (happy path + alternativas)
- [ ] Testar cenários negativos (erros esperados)
- [ ] Build/compilação sem erros
- [ ] Verificar regressões em funcionalidades existentes
- [ ] Lint e análise estática

**Estratégia de testes (conforme quality-gates.md):**
Selecione testes apropriados ao tipo de feature e risco envolvido.
Registre N/A quando um tipo de teste não fizer sentido com justificativa.

**Quando delegar:**
- **test-engineer:** Estratégia e validação completa

**Critérios de bloqueio (FAIL = bloqueio):**
- ❌ Teste falha → Volta para Fase 3
- ❌ Regressão em teste existente → Volta para Fase 3
- ❌ Feature não atende requisitos → Volta para Fase 3
- ❌ Build falha → Corrigir antes de avançar

**Saída esperada:**
> "Validação concluída. Testes: X unitários PASS, Y integração PASS, Z regressão PASS. Feature atende requisitos. Sem build errors. Pronto para revisão."

---

### Fase 5: Revisar Código e Design

**Objetivo:** Validação independente de implementação e design.

**Atividades:**
- [ ] Acionar `code-review-agent` se requer revisão independente (veja critérios abaixo)
- [ ] Ou revisar diretamente como Tech Lead se feature é simples/baixo risco
- [ ] Validar que implementação atende plano técnico
- [ ] Validar que código segue padrões
- [ ] Validar que testes são adequados
- [ ] Validar que design respeita arquitetura
- [ ] Registrar achados (Critical / High / Medium / Low)

**Quando usar code-review-agent:**
- ✅ Feature com lógica de negócio complexa
- ✅ Feature que toca em componentes críticos
- ✅ Feature com impacto em segurança ou integridade de dados
- ✅ Feature com integração com sistemas externos

**Quando revisar diretamente como Tech Lead:**
- ✅ Feature simples e isolada
- ✅ Risco baixo
- ✅ Mudanças em uma única área pequena

**Critérios de bloqueio:**
- ❌ Achado Critical não resolvido → Volta para Fase 3/4
- ❌ Achado High não resolvido → Volta para Fase 3/4
- ❌ Achado Medium → Registrar como pendência ou resolver

**Saída esperada (revisão direta):**
> "Revisão concluída (Tech Lead). Sem problemas críticos. Implementação atende plano. Código segue padrões. Testes adequados. Pronto para Quality Gates."

OU (revisão independente):
> "code-review-agent concluiu revisão. Achados: [descrição]. Recomendações: [ações]."

---

### Fase 6: Registrar Quality Gates

**Objetivo:** Documentar validações e decisão final.

**Referência:**
- `rules/quality-gates.md` → Relatório de conclusão

**Checklist (usando exatamente os 5 gates de quality-gates.md):**

| Gate | Critério | Estado | Evidência |
|---|---|---|---|
| **Gate 0** | Escopo e entendimento | PASS / NOT RUN | Fase 0 completa |
| **Gate 1** | Implementação | PASS / FAIL | Code review |
| **Gate 2** | Testes e validação técnica | PASS / FAIL / NOT RUN | Fase 4, build, testes, regressão |
| **Gate 3** | Revisão independente | PASS / N/A | Revisão concluída |
| **Gate 4** | Resolução e decisão | PASS / FAIL | Nenhum Critical/High aberto |

**Critérios de bloqueio (tarefa não concluída):**
- ❌ Gate 1 FAIL (plano não foi seguido)
- ❌ Gate 2 FAIL (testes falharam ou regressão)
- ❌ Gate 3 FAIL (achados Critical/High não resolvidos)
- ❌ Gate 4 FAIL (pendências não justificadas)

---

## Formato do Resumo Executivo

**Responsabilidade:** Documentar feature entregue para auditoria e conhecimento.

**Formato:**

```
## Feature: [Título Breve]

### Requisitos
[O que a feature deveria fazer, casos de uso]

### Design Técnico
[Arquitetura, componentes, banco de dados]

### Regras de Negócio
[Validações, fluxos implementados]

### Arquivos Alterados
- [componente1] - [mudança específica]
- [componente2] - [mudança específica]

### Testes
- Testes unitários: [X] PASS
- Testes integração: [Y] PASS (ou N/A se não aplicável)
- Cobertura: [se relevante]

### Riscos Residuais
[Se houver. Caso contrário, "Nenhum risco identificado."]

### Próximos Passos
[Se há pendências. Caso contrário, "Pronto para merge."]
```

**Saída esperada:**
> "[Resumo completo acima]. Todas as fases concluídas. Requisitos atendidos. Quality Gates PASS. Pronto para submissão."

---

## 4. Integração com Agentes e Skills Existentes

### Agentes utilizáveis conforme necessidade

| Agente | Quando usar |
|---|---|
| `dotnet-developer` | Implementação backend, análise de arquitetura .NET |
| `frontend-developer` | Implementação frontend, design de componentes |
| `test-engineer` | Estratégia de testes, validação, cobertura |
| `code-review-agent` | Revisão independente quando risco/complexidade é alta |

**Regra:** Não obrigar uso de todos os agentes em features simples. Exemplo: novo endpoint simples não precisa de code-review-agent.

### Skills reutilizáveis

| Skill | Quando usar |
|---|---|
| `git-commit` | Preparar commit com mensagem Conventional Commits |
| `code-review` | Diretrizes durante revisão independente |
| `dotnet-development` | Padrões de implementação .NET |
| `frontend-development` | Padrões de implementação frontend |
| `dotnet-unit-testing` | Padrões de testes unitários .NET |

---

## 5. Critérios de Mudança de Escopo

Quando mudanças ou requisitos adicionais são identificados durante a implementação,
o Tech Lead deve diferenciá-los e agir apropriadamente.

### Diferenciação: Correção Técnica vs. Mudança de Escopo

#### Tipo 1: Correção Técnica Necessária para Atender Requisito Original

São ajustes técnicos necessários para que a feature atenda ao requisito original,
sem expandir a entrega combinada.

**Exemplos:**
- Requisito: "Validar email do usuário"
  Identificado: Email precisa de validação com regex + verificação de domínio válido
  → Correção técnica (dentro do escopo original)

- Requisito: "Listar pedidos do usuário"
  Identificado: Precisa de paginação para não quebrar com 10.000 pedidos
  → Correção técnica (dentro do escopo original)

**Protocolo para Correção Técnica:**
1. Tech Lead identifica o que é necessário
2. Implementa como parte da feature
3. Informa ao solicitante no resumo executivo: "Implementado com [detalhe técnico]"
4. Nenhuma aprovação adicional necessária (estava no requisito original)

---

#### Tipo 2: Novo Requisito ou Alteração na Entrega Combinada

São funcionalidades não previstas originalmente ou que alteram o escopo da entrega.

**Exemplos:**
- Requisito original: "Listar pedidos do usuário"
  Identificado: "Seria bom ter filtros por data e status"
  → Novo requisito (altera escopo)

- Requisito original: "Formulário de cadastro"
  Identificado: "Precisa de integração com API de CNPJ para validar"
  → Altera escopo (adiciona integração não prevista)

**Protocolo Obrigatório para Mudança de Escopo:**
1. **Interromper a implementação**
2. **Descrever:** qual é a mudança, o que foi identificado
3. **Diferenciar:** é correção técnica ou novo requisito?
4. **Apresentar impacto:**
   - Quanto tempo levaria?
   - Qual seria o novo prazo?
   - Que riscos seria introduzir?
   - Como afeta a entrega combinada?
5. **Aguardar autorização explícita do solicitante:**
   - Incluir nesta feature? (alonga prazo)
   - Separar em issue futura?
   - Descartar?
6. **Prosseguir somente após decisão explícita do solicitante**

**Regra Crítica:** Tech Lead **NUNCA** aprova mudanças de escopo sozinho,
mesmo que pareça pequeno ou essencial. Sempre apresentar ao solicitante.

---

## 6. Proporcionalidade e Adaptação

Este workflow funciona para funcionalidades de qualquer tamanho. 
O Tech Lead deve adaptar a profundidade de análise e delegação conforme 
a complexidade real de cada demanda.

### Exemplos Ilustrativos (não são critérios obrigatórios)

Estes exemplos mostram como o workflow pode ser aplicado a diferentes cenários. 
Tempo é apenas referencial; o Tech Lead deve avaliar a complexidade real 
de cada feature e as circunstâncias do projeto.

**Exemplo 1: Feature Simples** (ex: novo endpoint GET)
- Fase 0: 15 minutos (requisitos claros)
- Fase 1: 15 minutos (análise rápida)
- Fase 2: 15 minutos (plano simples)
- Fase 3: 2-4 horas (implementação)
- Fase 4: 1 hora (testes básicos)
- Fase 5: 30 minutos (revisão rápida)
- Fase 6: 15 minutos (gates simples)
- **Coordenação:** Tech Lead sem delegação
- **Tempo total referencial:** ~1 dia

**Exemplo 2: Feature Média** (ex: novo formulário com validações)
- Fase 0: 1 hora (requisitos com esclarecimentos)
- Fase 1: 1 hora (análise de componentes)
- Fase 2: 2 horas (design)
- Fase 3: 4-8 horas (implementação)
- Fase 4: 2-4 horas (testes múltiplos)
- Fase 5: 1-2 horas (revisão técnica)
- Fase 6: 30 minutos (gates)
- **Coordenação:** Tech Lead delega frontend-developer
- **Tempo total referencial:** 2-3 dias

**Exemplo 3: Feature Complexa** (ex: sistema de permissões backend + frontend)
- Fase 0: 2-4 horas (requisitos com diálogo extenso)
- Fase 1: 4-8 horas (análise profunda)
- Fase 2: 8-16 horas (planejamento detalhado)
- Fase 3: 20-40 horas (implementação por múltiplos agentes)
- Fase 4: 8-16 horas (testes abrangentes)
- Fase 5: 2-4 horas (revisão técnica)
- Fase 6: 1-2 horas (gates)
- **Coordenação:** Tech Lead delega a múltiplos agentes
- **Tempo total referencial:** 2-3 semanas

### Princípio de Proporcionalidade

O Tech Lead deve avaliar a complexidade real de cada feature:
- Requisitos são claros? → Fases 0-1 mais rápidas
- É similar a funcionalidades existentes? → Fases 1-2 mais rápidas
- Envolve múltiplos componentes? → Mais tempo em fases 1-3
- Requer testes abrangentes? → Mais tempo em fase 4
- Alto risco técnico? → Mais tempo em fase 5

**Nenhuma estimativa é obrigatória.** O Tech Lead adapta a profundidade 
ao contexto real de cada demanda.

---

## 7. Regras de Ouro

✅ **Sempre:**
- Compreender requisitos antes de analisar
- Analisar contexto técnico antes de planejar
- Testar conforme o risco da feature
- Documentar achados e decisões
- Respeitar Quality Gates
- Consultar solicitante em mudanças de escopo

❌ **Nunca:**
- Assumir requisitos não documentados
- Implementar sem plano técnico aprovado
- Considerar teste não executado como "aprovado"
- Expandir escopo sem autorização do solicitante
- Fazer correção em componentes críticos sem revisar
- Pular revisão técnica em features complexas
- Aprovar mudança de escopo sozinho

---

## 8. Exemplo de Fluxo

**Cenário:** "Implementar sistema de duas fases de autenticação (2FA)"

| Fase | Entrada | Saída |
|---|---|---|
| **0 - Compreender** | Requisito: "2FA via SMS e email" | Compreendido: SMS principal, email fallback, resgate por código |
| **1 - Analisar** | Arquitetura: como integrar com auth existente? | Mapeado: usar serviço SMS existente, estender schema user |
| **2 - Planejar** | Propor design e componentes | Plano: backend (2 endpoints) + frontend (modal 2FA) + DB (nova tabela) |
| **3 - Implementar** | Código alterado | Backend + Frontend + Testes criados |
| **4 - Testar** | Suite de testes | Todos PASS. Regressão: 0. Feature funciona conforme |
| **5 - Revisar** | code-review-agent | Sem achados críticos. Implementação clean |
| **6 - Quality Gates** | Registrar PASS em todos Gates | Bloqueado? Não. Pronto para merge? Sim. |
| **Resumo** | Documentar achados | Pronto para submissão |

**Cenário Alternativo: Mudança de Escopo Identificada**

| Fase | Situação | Ação |
|---|---|---|
| **3 - Implementar** | Tech Lead identifica: "2FA via SMS requere formatação de número + integração com Twilio" | Interrompe, não estava no requisito original |
| **Mudança Escopo** | Avalia: é correção técnica ou novo requisito? | Resposta: Novo requisito (Twilio não estava previsto) |
| **Impacto** | Quanto tempo? +8 horas | Novo prazo? [data original] + 1 dia |
| **Consulta** | Tech Lead contacta solicitante | "Incluir Twilio agora ou deixar para depois?" |
| **Decisão** | Solicitante autoriza: "Incluir, é essencial" | Tech Lead continua com +8 horas de trabalho |
| **Resumo** | Documentar mudança de escopo | "Feature incluiu integração Twilio após requisito adicional identificado" |

---

## 9. Referências

- `CLAUDE.md` → Orquestração de subagents
- `rules/quality-gates.md` → Validação de conclusão
- `rules/general-principles.md` → Simplicidade e design
- `rules/software-engineering.md` → Arquitetura
- `rules/code-quality.md` → Implementação
- `rules/testing-standards.md` → Testes
- `rules/git-conventions.md` → Commits
- `rules/security.md` → Segurança
- `agents/dotnet-developer.md` → Implementação .NET
- `agents/frontend-developer.md` → Implementação frontend
- `agents/test-engineer.md` → Estratégia de testes
- `agents/code-review-agent.md` → Revisão independente
- `workflows/bug-fix.md` → Padrão de workflow

---

## 10. Regra Fundamental

Uma feature development deve entregar **exatamente o requisito acordado**,
com design técnico sólido, testes apropriados, sem refatorações não pedidas,
e sem expandir escopo sem autorização do solicitante.

**Sequência obrigatória:** Compreender → Analisar → Planejar → Implementar → Validar → Revisar → Quality Gates

**Sem exceção:** Nenhuma mudança de escopo sem autorização explícita do solicitante.
