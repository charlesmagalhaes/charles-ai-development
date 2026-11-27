# Workflow: Code Refactoring

## 1. Objetivo

Orquestrar refatoração de código de forma estruturada, garantindo melhoria de estrutura interna, legibilidade, manutenibilidade e qualidade técnica, **preservando o comportamento funcional existente**.

Este workflow é reutilizável para qualquer refatoração, independentemente da complexidade ou tecnologia envolvida.

## 2. Quando Invocar

Identifique automaticamente uma demanda como code refactoring quando:

- Existe **código complexo** difícil de entender ou manter.
- Há **duplicação de lógica** em múltiplos locais.
- Há **violação de princípios SOLID** (SRP, DIP, etc.).
- O código precisa de **melhor organização** e **separação de responsabilidades**.
- Há oportunidade de **reduzir acoplamento** ou **aumentar coesão**.
- **Performance pode melhorar** sem alterar contrato externo.
- Código **legado sem testes** precisa de **melhor estrutura**.

**Exemplos:**
- "Método ValidarPedido tem 80 linhas e 15 responsabilidades"
- "Validação de email está duplicada em 5 lugares"
- "Classe Service mistura lógica de negócio com persistência"
- "Consulta SQL tem 3 JOINs aninhados e é difícil manter"

**Não usar para:**
- Implementar novo comportamento (use Feature Development Workflow)
- Corrigir comportamento incorreto (use Bug Fix Workflow)
- Sem objetivo claro
- Para introduzir novas funcionalidades

## 3. Fases do Workflow

### Fase 0: Compreender Objetivo da Refatoração

**Objetivo:** Garantir que objetivo está claro e escopo é definido.

**Atividades:**
- [ ] Identificar por que refatorar (legibilidade, complexidade, duplicação, performance, manutenibilidade)
- [ ] Definir escopo exato (quais arquivos, quais componentes)
- [ ] Descrever resultado esperado (como o código muda, o quê melhora)
- [ ] Avaliar cobertura de testes existentes
- [ ] Classificar risco inicial (crítico, compartilhado, isolado)

**Critérios de bloqueio:**
- ❌ Objetivo vago ("melhorar o código")
- ❌ Sem escopo definido
- ❌ Sem entendimento do por quê

**Entrada do Tech Lead:**
> "Objetivo claro: [descrição]. Escopo: [arquivos/componentes]. Resultado esperado: [como muda]. Risco: [baixo/médio/alto]. Pronto para análise."

---

### Fase 1: Analisar Código e Estrutura

**Objetivo:** Compreender código atual e identificar oportunidades de melhoria.

**Atividades:**
- [ ] Revisar código atual (ler, compreender, mapear)
- [ ] Identificar problemas (complexidade, duplicação, design, legibilidade)
- [ ] Mapear dependências (quais componentes usam este código)
- [ ] Avaliar cobertura de testes (qual % coberto, quais cenários)
- [ ] Consultar `rules/software-engineering.md` e `rules/code-quality.md`

**Atividade Complementar - Testes de Caracterização (se aplicável):**

Executar **antes de iniciar a refatoração** quando código tem pouca cobertura:

```
Objetivo: Registrar como o código se comporta HOJE
(não verificar se está correto, apenas capturar comportamento existente)

Processo:
1. Compreender que o código faz (reverso engineering)
2. Criar testes que reproduzem comportamento ATUAL
3. Executar testes até passarem
4. Documentar LIMITAÇÕES:
   - Quais cenários foram testados?
   - Quais cenários NÃO foram cobertos?
   - Há ambiguidades no comportamento?
5. Usar como baseline para Fase 5 (validação pós-refactor)

IMPORTANTE:
- Os testes registram cenários DESCOBERTOS, não comportamento completo
- Limitações de cobertura devem ser EXPLÍCITAS
- Falso positivo: Testes passam, mas código tem bugs não detectados
- Uso: Comparação pós-refactor, não garantia de correção
```

**Quando Executar Testes de Caracterização:**
- 🟢 Risco BAIXO: Não necessário (código simples)
- 🟡 Risco MÉDIO: Recomendado (múltiplas entradas/saídas)
- 🔴 Risco ALTO: Obrigatório ou bloqueador

**Quando delegar:**
- **dotnet-developer:** Análise profunda de arquitetura, banco de dados, regras complexas
- **frontend-developer:** Análise de componentes, estado, integrações UI
- **test-engineer:** Estratégia de testes, caracterização de comportamento

**Critérios de bloqueio:**
- ❌ Sem entendimento de dependências
- ❌ Risco alto + sem testes + sem autorização

**Saída esperada:**
> "Análise completa. Problemas identificados: [lista]. Dependências: [componentes]. Cobertura: [%]. Testes de caracterização: [sim/não/com limitações]. Risco: [baixo/médio/alto]. Pronto para avaliação de riscos."

---

### Fase 2: Avaliar Riscos e Impactos

**Objetivo:** Classificar risco e definir estratégia de mitigação.

**Atividades:**
- [ ] Classificar risco (baixo / médio / alto)
- [ ] Identificar componentes afetados
- [ ] Planejar estratégia de preservação (como validar comportamento)
- [ ] Avaliar se precisa de aprovação especial (código crítico)
- [ ] Documentar premissas e limitações

**Classificação de Risco:**

🟢 **BAIXO** (isolado, bem testado):
- Escopo: Método único, classe isolada
- Testes: Cobertura unitária completa
- Consumidores: Nenhum ou muito poucos
- Decisão: Tech Lead pode autorizar

🟡 **MÉDIO** (múltiplos testes, algumas dependências):
- Escopo: Vários métodos, classe com dependências
- Testes: Cobertura unitária + alguns testes integração
- Consumidores: Vários, mas controláveis
- Decisão: Tech Lead autoriza com verificação

🔴 **ALTO** (crítico, compartilhado, sem testes):
- Escopo: Componente central, múltiplos sistemas dependem
- Testes: Pouca cobertura ou nenhuma
- Consumidores: Muitos, desconhecidos
- Decisão: **BLOQUEADOR** ou requer aprovação especial

**Critérios de bloqueio:**
- ❌ Risco alto sem autorização do solicitante
- ❌ Sem estratégia de preservação de comportamento

**Saída esperada:**
> "Risco: [classificação]. Componentes afetados: [lista]. Estratégia de preservação: [como validar]. Autorização: [obtida/pendente]. Pronto para planejar."

---

### Fase 3: Planejar Refatoração

**Objetivo:** Definir abordagem exata antes de implementar.

**Atividades:**
- [ ] Escopo exato (quais arquivos, quais mudanças)
- [ ] Estratégia incremental (como dividir em passos menores)
- [ ] Plano de testes (como validar que comportamento não mudou)
- [ ] Que agentes necessários? (dotnet-developer, test-engineer, code-review-agent)
- [ ] Ordem de implementação (qual mudança primeiro)
- [ ] Critérios de sucesso

**Referências:**
- `rules/software-engineering.md` → Padrões arquiteturais
- `rules/code-quality.md` → Critérios de qualidade
- `rules/general-principles.md` → Princípios de design

**Critério de bloqueio:**
- ❌ Plano vago ou sem ordem clara
- ❌ Sem estratégia incremental

**Saída esperada:**
> "Plano: [descrição]. Passos: [1) X, 2) Y, 3) Z]. Testes: [estratégia]. Agentes: [necessários]. Pronto para implementar."

---

### Fase 4: Implementar Refatoração Incremental

**Objetivo:** Realizar refatoração em passos pequenos e controláveis.

**Atividades:**
- [ ] Implementar conforme plano (passo a passo)
- [ ] Executar testes após cada passo (validar que passam)
- [ ] Sem misturar bug fixes ou novas features
- [ ] Sem refatorações não planejadas
- [ ] Preservar alterações do usuário

**Protocolo de Implementação Incremental:**

```
Passo 1: Implementar primeira mudança
├─ Fazer mudança mínima (1 arquivo ou 1 método)
├─ Executar testes relacionados
├─ Comparar com BASELINE:
│  ├─ Testes que passavam antes: ainda passam? ✅
│  ├─ Testes que falhavam antes: status preservado?
│  └─ Novos testes que falharam? (investigar origem)
└─ Se validação PASS: continuar para próximo passo

Passo 2: Próxima mudança
├─ Implementar mudança 2
├─ Executar testes relacionados
├─ Comparar com BASELINE (mesmo protocolo)
└─ Se validação PASS: continuar

...

Final: Todos os passos completados e validados
```

**Se Teste Falha During Implementação:**

```
1. INVESTIGAR a falha:
   - Qual teste falha?
   - Em qual passo começou?
   - É relacionado à mudança atual? (revisar diff)
   - É falha preexistente não detectada na baseline?

2. DETERMINAR ORIGEM:
   
   ✅ Causada pela mudança atual dessa refactor?
      ├─ Revisar git status para identificar alterações
      ├─ Localizar EXATAMENTE qual mudança causou
      ├─ Reverter APENAS essa mudança (editar arquivo, não git reset)
      └─ Preservar completamente outras alterações do usuário
   
   ⚠️ Falha preexistente? (estava na baseline)
      ├─ Registrar como "falha preexistente"
      └─ NÃO reverter, continuar refactoring
   
   🔧 Falha ambiental? (dependência, BD, conexão)
      ├─ Escalar para DevOps
      └─ Pausar refactoring até resolver

3. DOCUMENTAR:
   - Qual mudança foi revertida
   - Por quê (causa identificada)
   - Preservação de outras alterações
```

**Critério de bloqueio:**
- ❌ Teste falha causado por essa mudança (reverter, investigar)
- ❌ Bug descoberto (criar issue separada, não misturar)
- ❌ Novo requisito identificado (Tech Lead consulta solicitante)

**Saída esperada:**
> "Implementação concluída. Passos: [X executados]. Testes: [Y depois de cada passo]. Regressões causadas: [0]. Mudanças incidentais: [nenhuma]. Pronto para validação."

---

### Fase 5: Testar e Validar Regressão

**Objetivo:** Confirmar que comportamento foi preservado.

**Baseline Registrado (PRÉ-REFACTORING):**

Antes de qualquer implementação, registrar situação inicial:

```
Testes que PASSAVAM:
├─ [Lista de testes]
├─ Quantidade: X
└─ Comportamentos cobertos: [descrição]

Testes que JÁ FALHAVAM:
├─ [Lista de testes]
├─ Quantidade: Y
└─ Razão: [ambiente, dependência, bug conhecido?]

Testes NÃO EXECUTADOS:
├─ [Por quê? dependência ausente, timeout?]
└─ Impacto: [medium / high / blocking]

Problemas AMBIENTAIS:
├─ [Conexão DB, serviço externo indisponível?]
└─ Workaround: [se houver]

BASELINE DOCUMENTADA: [data, timestamp]
```

**Validação Pós-Refactoring:**

Executar **mesma suite de testes** após refatoração:

```
Testes que PASSAVAM (pós):
├─ Resultado: [X PASS / Y FAIL]
├─ Comparação: Mesmo número? Mesmos testes?
└─ Delta: [Novas falhas: S/N]

Testes que JÁ FALHAVAM (pós):
├─ Resultado: [continuam falhando da mesma forma?]
└─ Delta: [Pioraram ou melhoraram?]

Problemas NOVOS detectados:
├─ [Lista de novas falhas]
├─ Relacionadas à refactor? [investigar origem]
└─ Ação: [corrigir / registrar como pendência]

Comparação BASELINE vs PÓS:
├─ Testes que passaram: [idênticos ✅ / diferentes ❌]
├─ Regressão atribuível à refactor? [S/N]
└─ Comportamento preservado? [SIM com evidências / PARCIAL com risco / NÃO]
```

**Atividades:**
- [ ] Executar testes unitários (mesmos que passavam antes)
- [ ] Executar testes integração (se aplicáveis)
- [ ] Comparar baseline com resultado pós-refactor
- [ ] Investigar qualquer diferença
- [ ] Medir qualidade (se métricas forem relevantes para objetivo)

**Investigação de Falhas Novas:**

```
Teste novo falha pós-refactor:

1. DETERMINAR ORIGEM:
   ✅ Causada pela refactoring?
      └─ Revisar commit, corrigir implementação
   
   ⚠️ Falha preexistente não detectada na baseline?
      └─ Registrar como pendência do projeto
   
   🔧 Falha ambiental?
      └─ Escalar para DevOps/ambiente

2. DOCUMENTAR:
   - Qual teste falha
   - Quando começou a falhar
   - Causa identificada
   - Ação tomada
```

**Métricas (quando relevantes):**

USE apenas se objetivo da refactor é medir melhoria:

```
Se objetivo é "reduzir complexidade":
├─ Medir Cyclomatic Complexity (antes e depois)
├─ Exemplo: 25 → 12 (-52% ✅)
└─ Registrar: "Benefício: redução de 52%"

Se objetivo é "remover duplicação":
├─ Medir linhas duplicadas (antes e depois)
├─ Exemplo: 450 → 200 (-55% ✅)
└─ Registrar: "Benefício: redução de 250 linhas"

Se objetivo é "apenas melhorar legibilidade":
├─ NÃO exigir métrica (subjetivo)
├─ Usar code review qualitativo
└─ Registrar: "Validado por inspeção e review"
```

**Critério de bloqueio:**
- ❌ Regressão atribuível à refactor (volta para Fase 4)
- ❌ Novo teste que sempre falhou (investigar se causado por refactor)

**Saída esperada:**
> "Validação concluída. Testes pré: [X PASS]. Testes pós: [X PASS - idênticos]. Regressões atribuíveis: [0]. Comportamento: [preservado]. Qualidade: [métrica resultado]. Pronto para revisão."

---

### Fase 6: Revisar Código

**Objetivo:** Validação independente de implementação e design.

**Atividades:**
- [ ] Acionar `code-review-agent` se requer revisão independente
- [ ] Ou revisar diretamente como Tech Lead se refactoring é simples/baixo risco
- [ ] Validar que implementação segue o plano
- [ ] Validar que código segue padrões do projeto
- [ ] Validar que refactoring melhorou efetivamente qualidade
- [ ] Registrar achados (Critical / High / Medium / Low)

**Quando Usar code-review-agent:**
- ✅ Refactoring de risco médio/alto
- ✅ Código crítico ou compartilhado
- ✅ Implementação complexa ou não óbvia

**Quando Revisar Diretamente:**
- ✅ Refactoring simples e isolado
- ✅ Risco baixo
- ✅ Tech Lead compreende completamente

**Critério de bloqueio:**
- ❌ Achado Critical não resolvido (volta para Fase 4)
- ❌ Achado High não resolvido (volta para Fase 4)

**Saída esperada:**
> "Revisão concluída. Achados: [descrição]. Implementação segue plano: [SIM/NÃO]. Pronto para Quality Gates."

---

### Fase 7: Registrar Quality Gates

**Objetivo:** Validar conclusão e registrar evidências.

**Checklist (usando exatamente os 5 gates de quality-gates.md):**

| Gate | Verificação | Estado | Evidência |
|---|---|---|---|
| **Gate 0** | Compreensão do objetivo | PASS / NOT RUN | Fase 0 completa |
| **Gate 1** | Implementação segue o plano | PASS / FAIL | Code review + testes incrementais |
| **Gate 2** | Testes executados, comportamento validado | PASS / FAIL / NOT RUN | Fase 5: baseline vs resultado |
| **Gate 3** | Revisão técnica (se aplicável) | PASS / N/A | Revisão concluída ou N/A com justificativa |
| **Gate 4** | Achados resolvidos/aceitos | PASS / FAIL | Nenhum Critical/High aberto |

**Estados exatos de quality-gates.md:**
- ✅ **PASS:** Verificação executada e aprovada, com evidência
- ❌ **FAIL:** Verificação executada e reprovada
- ⏭️ **NOT RUN:** Verificação aplicável não foi executada (com justificativa)
- ❌ **N/A:** Critério não aplicável ao escopo (com justificativa)

**Exemplo:**
```
Gate 2 - Lint: PASS (executado e aprovado)
Gate 2 - Build: N/A (projeto não possui build stage configurado)
Gate 2 - Cobertura: NOT RUN (ferramenta não disponível no ambiente)
Justificativa: Projeto é código-fonte puro, sem compilação
```

**Critério de bloqueio (tarefa não concluída):**
- ❌ Gate 0 NOT RUN (objetivo não claro)
- ❌ Gate 1 FAIL (plano não foi seguido)
- ❌ Gate 2 FAIL (regressão ou comportamento não preservado)
- ❌ Gate 3 FAIL (achados Critical/High)
- ❌ Gate 4 FAIL (pendências não justificadas)

**Saída esperada:**
> "Quality Gates: Gate 0 PASS, Gate 1 PASS, Gate 2 PASS, Gate 3 PASS, Gate 4 PASS. Bloqueadores: 0. Refatoração concluída e validada, aguardando autorização para as próximas operações Git."

---

## Formato do Resumo Executivo

**Responsabilidade:** Documentar refatoração entregue para auditoria e conhecimento.

**Formato:**

```
## Refactoring: [Título Breve]

### Objetivo
[Por que refatorar? Qual o ganho esperado?]
Exemplo: "Reduzir complexidade de classe Service que gerencia múltiplas responsabilidades"

### Código Alterado
- [arquivo1] - [mudanças específicas]
- [arquivo2] - [mudanças específicas]

### Comportamento Preservado
✅ Testes que passavam (pré): X testes
✅ Testes que passam (pós): X testes (idênticos)
✅ Falhas preexistentes: Y (continuam)
✅ Novas regressões: 0 (atribuíveis à refactoring)
✅ Comportamento: Preservado

### Qualidade Melhorada
Aspecto: [legibilidade / complexidade / duplicação]
Medida: [métrica / inspeção qualitativa]
Resultado: 
- Complexidade: 25 → 12 (-52%) ✅
- OU: Legibilidade melhorada (nomes claros, 3 métodos menores) ✅

### Limitações e Riscos Residuais
[Se houver]
- Código legado em Fase X sem testes: validado apenas por inspeção
- Componente compartilhado: revisar impacto em [Y, Z]
- [Ou: Nenhum risco identificado]

### Próximos Passos
Refatoração concluída e validada, aguardando autorização para commit, push ou merge.
```

**Saída esperada:**
> "[Resumo completo acima]. Todas as fases concluídas. Quality Gates PASS. Refatoração concluída e validada, aguardando autorização."

---

## 4. Integração com Agentes e Skills Existentes

### Agentes utilizáveis conforme necessidade

| Agente | Quando usar |
|---|---|
| `dotnet-developer` | Implementação backend, análise de arquitetura .NET |
| `frontend-developer` | Refactoring frontend, design de componentes |
| `test-engineer` | Estratégia de testes, validação, cobertura |
| `code-review-agent` | Revisão independente quando risco/complexidade é alta |

**Regra:** Não obrigar uso de todos os agentes em refatorações simples.

### Skills reutilizáveis

| Skill | Quando usar |
|---|---|
| `git-commit` | Preparar commit com mensagem Conventional Commits |
| `code-review` | Diretrizes durante revisão independente |
| `dotnet-development` | Padrões de implementação .NET |
| `frontend-development` | Padrões de implementação frontend |
| `dotnet-unit-testing` | Padrões de testes unitários .NET |

---

## 5. Regras de Ouro

✅ **Sempre:**
- Compreender objetivo antes de analisar
- Mapear dependências antes de planejar
- Testar após cada mudança incremental
- Comparar com baseline para validar regressão
- Preservar completamente alterações do usuário
- Documentar achados e decisões
- Respeitar Quality Gates
- Consultar solicitante em riscos altos

❌ **Nunca:**
- Assumir objetivo de refactoring
- Implementar sem plano
- Executar operações Git destrutivas (git reset) sem investigação
- Misturar refactoring com bug fix ou feature
- Eliminar falhas preexistentes sem autorização
- Atribuir regressão a problemas ambientais
- Pular revisão técnica em refatorações complexas
- Executar commit, push ou merge sem autorização explícita

---

## 6. Exemplo de Fluxo

**Cenário:** "Classe OrderValidator tem 150 linhas, 12 métodos, alta duplicação"

| Fase | Entrada | Saída |
|---|---|---|
| **0 - Compreender** | Objetivo: Reduzir complexidade | Compreendido: Extrair ValidacaoEmail, ValidacaoCPF em classes separadas |
| **1 - Analisar** | Arquitetura: como está estruturado? | Mapeado: 3 validadores misturados, 40% duplicação |
| **2 - Avaliar** | Qual o risco? | Médio: Usado em 2 serviços, testes unitários cobrem 60% |
| **3 - Planejar** | Como dividir? | Plano: 1) Extrair ValidadorEmail, 2) Extrair ValidadorCPF, 3) Remover duplicação |
| **4 - Implementar** | Código alterado | Passo 1 OK, Passo 2 OK, Passo 3 OK |
| **5 - Testar** | Suite de testes | Testes pré: 20 PASS. Testes pós: 20 PASS. Regressão: 0. |
| **6 - Revisar** | code-review-agent | Sem achados críticos. Implementação clean. |
| **7 - Quality Gates** | Registrar PASS | Gates 0-4: PASS. Pronto. |
| **Resumo** | Documentar achados | Complexidade: 150 → 90 linhas. Duplicação: 40% → 5%. |

**Cenário Alternativo: Falha Durante Implementação**

| Fase | Situação | Ação |
|---|---|---|
| **4 - Implementar** | Passo 2 completo, teste falha | Investigar: qual teste? |
| **Investigação** | Teste "ValidarCPFVazio" falha | Revisar commit: mudança relacionada? SIM |
| **Reversão Segura** | Identificar exatamente qual mudança causa | Reverter APENAS essa mudança (editar arquivo) |
| **Preservação** | Verificar git status | Outras alterações preservadas ✅ |
| **Continuação** | Refazer Passo 2 diferente | Passo 2 revisado OK |
| **Resultado** | Validação OK | Continuar para Passo 3 |

---

## 7. Referências

- `CLAUDE.md` → Orquestração de subagents
- `rules/quality-gates.md` → Validação de conclusão
- `rules/general-principles.md` → Simplicidade e design
- `rules/software-engineering.md` → Arquitetura e SOLID
- `rules/code-quality.md` → Legibilidade e qualidade
- `rules/testing-standards.md` → Testes
- `rules/git-conventions.md` → Commits
- `rules/security.md` → Segurança
- `agents/dotnet-developer.md` → Implementação .NET
- `agents/frontend-developer.md` → Implementação frontend
- `agents/test-engineer.md` → Estratégia de testes
- `agents/code-review-agent.md` → Revisão independente
- `workflows/bug-fix.md` → Padrão de workflow
- `workflows/feature-development.md` → Padrão de workflow

---

## 8. Regra Fundamental

Uma refatoração deve entregar **exatamente a melhoria acordada**,
com comportamento funcional **100% preservado**, testes **sem regressões**,
e sem expandir escopo sem autorização do solicitante.

**Sequência obrigatória:** Compreender → Analisar → Avaliar → Planejar → Implementar → Validar → Revisar → Quality Gates

**Sem exceção:** Nenhuma operação Git destrutiva sem autorização explícita e investigação completa.
