"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { findDuplicateKeys } = require("./validate-json");

test("não encontra propriedades duplicadas em JSON válido", () => {
  const json = '{ "nome": "Teste", "ativo": true, "config": { "nome": "Interno" } }';
  assert.deepEqual(findDuplicateKeys(json), []);
});

test("detecta propriedade duplicada no mesmo objeto", () => {
  const json = '{\n  "nome": "Teste",\n  "ativo": true,\n  "ativo": false\n}';
  const duplicates = findDuplicateKeys(json);
  assert.equal(duplicates.length, 1);
  assert.equal(duplicates[0].key, "ativo");
  assert.equal(duplicates[0].path, "$.ativo");
  assert.equal(duplicates[0].line, 4);
});

test("detecta duplicidades em objetos aninhados", () => {
  const json = '{ "config": { "modo": "A", "modo": "B" } }';
  const duplicates = findDuplicateKeys(json);
  assert.equal(duplicates.length, 1);
  assert.equal(duplicates[0].path, "$.config.modo");
});

test("não considera duplicidade entre objetos diferentes", () => {
  const json = '[ { "id": 1 }, { "id": 2 } ]';
  assert.deepEqual(findDuplicateKeys(json), []);
});

test("trata corretamente nomes com caracteres escapados", () => {
  const json = '{ "nome\\u0020com\\u0020espaço": 1, "nome com espaço": 2 }';
  const duplicates = findDuplicateKeys(json);
  assert.equal(duplicates.length, 1);
  assert.equal(duplicates[0].key, "nome com espaço");
  assert.equal(duplicates[0].path, '$["nome com espaço"]');
});

test("ignora textos que parecem propriedades duplicadas dentro de strings", () => {
  const json = JSON.stringify({ mensagem: '"ativo": true, "ativo": false' });
  assert.deepEqual(findDuplicateKeys(json), []);
});
