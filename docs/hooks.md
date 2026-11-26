# Hooks do Claude Code

## Objetivo

Automatizar verificações determinísticas e de baixo custo no ciclo de trabalho do Claude Code.

Os hooks deste framework são auxiliares dos Quality Gates. Eles não substituem testes, revisão técnica ou a avaliação do Tech Lead.

## Hooks configurados

### PostToolUse — validação de arquivos JSON

Arquivo de configuração: `.claude/settings.json`

Quando uma ferramenta `Write` ou `Edit` termina com sucesso, o hook `scripts/hooks/validate-json.js` verifica arquivos com extensão `.json`.

- JSON válido: nenhuma ação adicional.
- JSON inválido: retorna um aviso estruturado ao Claude com arquivo e erro de sintaxe para que a correção seja feita.
- Arquivo inexistente ou entrada inesperada: o hook não bloqueia o fluxo.
- Falha operacional do próprio hook: registra a falha em stderr e não bloqueia a edição.

O hook não formata nem modifica arquivos automaticamente.

**Limitação:** este evento cobre alterações feitas pelas ferramentas `Write` e `Edit`. Alterações realizadas por comandos Bash, scripts externos ou outras ferramentas não são cobertas por esse matcher.

## Requisitos

- Node.js disponível no PATH.
- Claude Code com suporte a hooks de comando.
- O repositório aberto como diretório de projeto para que `.claude/settings.json` seja carregado.

## Escopo da configuração

`.claude/settings.json` aplica hooks somente quando este repositório é aberto como projeto. Se o framework for utilizado globalmente em outros repositórios, a configuração deverá ser incorporada às configurações de usuário em `~/.claude/settings.json`, ajustando o caminho do script para o diretório real do framework.

Não substitua o arquivo global inteiro: mescle apenas a propriedade `hooks` e preserve as configurações e hooks já existentes.

## Verificação manual

1. Abra este repositório no Claude Code.
2. Execute `/hooks` e confirme a presença do hook `PostToolUse`.
3. Edite um arquivo `.json` válido e confirme que a edição termina normalmente.
4. Em uma cópia temporária, introduza um erro de sintaxe JSON usando Write ou Edit. O hook deve informar o erro ao Claude.
5. Restaure o JSON válido.

## Segurança e manutenção

- Hooks executam comandos locais com as permissões do usuário. Revise scripts antes de habilitá-los.
- Não use hooks para executar comandos destrutivos, publicar alterações ou acessar segredos.
- Prefira verificações rápidas, determinísticas e sem efeitos colaterais.
- Toda nova automação deve ter escopo, comportamento em falha e forma de validação documentados.
