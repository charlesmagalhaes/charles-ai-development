#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

async function readInput() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  return JSON.parse(input);
}

function getLineAndColumn(content, offset) {
  const lines = content.slice(0, offset).split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

// The caller validates syntax with JSON.parse before using this scanner.
function findDuplicateKeys(content) {
  let index = 0;
  const duplicates = [];

  function skipWhitespace() {
    while (index < content.length && /\s/.test(content[index])) index += 1;
  }

  function parseString() {
    const start = index;
    index += 1;
    while (index < content.length) {
      if (content[index] === "\\") {
        index += 2;
      } else if (content[index] === '"') {
        index += 1;
        return { value: JSON.parse(content.slice(start, index)), start };
      } else {
        index += 1;
      }
    }
    return { value: "", start };
  }

  function propertyPath(parent, key) {
    if (/^[A-Za-z_$][\w$]*$/.test(key)) return parent + "." + key;
    return parent + "[" + JSON.stringify(key) + "]";
  }

  function parseValue(currentPath) {
    skipWhitespace();
    if (content[index] === "{") return parseObject(currentPath);
    if (content[index] === "[") return parseArray(currentPath);
    if (content[index] === '"') {
      parseString();
      return;
    }
    while (index < content.length && !/[\s,\]}]/.test(content[index])) index += 1;
  }

  function parseObject(currentPath) {
    index += 1;
    skipWhitespace();
    const seen = new Set();

    while (index < content.length && content[index] !== "}") {
      skipWhitespace();
      const parsed = parseString();
      const currentPropertyPath = propertyPath(currentPath, parsed.value);

      if (seen.has(parsed.value)) {
        duplicates.push({
          key: parsed.value,
          path: currentPropertyPath,
          ...getLineAndColumn(content, parsed.start)
        });
      } else {
        seen.add(parsed.value);
      }

      skipWhitespace();
      index += 1; // colon
      parseValue(currentPropertyPath);
      skipWhitespace();
      if (content[index] === ",") {
        index += 1;
        skipWhitespace();
      }
    }
    index += 1;
  }

  function parseArray(currentPath) {
    index += 1;
    skipWhitespace();
    let itemIndex = 0;

    while (index < content.length && content[index] !== "]") {
      parseValue(currentPath + "[" + itemIndex + "]");
      itemIndex += 1;
      skipWhitespace();
      if (content[index] === ",") {
        index += 1;
        skipWhitespace();
      }
    }
    index += 1;
  }

  parseValue("$");
  return duplicates;
}

function reportInvalidJson(filePath, error) {
  const message = [
    "O arquivo JSON editado está inválido.",
    "Arquivo: " + filePath,
    "Erro: " + error.message,
    "Corrija a sintaxe JSON e valide novamente antes de concluir a tarefa."
  ].join("\n");

  process.stdout.write(JSON.stringify({ decision: "block", reason: message }));
}

function reportDuplicateKeys(filePath, duplicates) {
  const details = duplicates.map((item) =>
    '- Propriedade "' + item.key + '" em ' + item.path +
    " (linha " + item.line + ", coluna " + item.column + ")"
  );

  const message = [
    "O arquivo JSON contém propriedades duplicadas.",
    "Arquivo: " + filePath,
    ...details,
    "Mantenha apenas uma ocorrência de cada propriedade dentro do mesmo objeto e valide novamente."
  ].join("\n");

  process.stdout.write(JSON.stringify({ decision: "block", reason: message }));
}

async function main() {
  let hookInput;
  try {
    hookInput = await readInput();
  } catch {
    return;
  }

  const filePath = hookInput?.tool_input?.file_path;
  if (typeof filePath !== "string" || path.extname(filePath).toLowerCase() !== ".json") return;

  try {
    const content = fs.readFileSync(filePath, "utf8");
    JSON.parse(content);

    const duplicates = findDuplicateKeys(content);
    if (duplicates.length > 0) reportDuplicateKeys(filePath, duplicates);
  } catch (error) {
    if (error.code === "ENOENT") return;
    if (error instanceof SyntaxError) {
      reportInvalidJson(filePath, error);
      return;
    }
    process.stderr.write("Não foi possível validar " + filePath + ": " + error.message + "\n");
  }
}

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write("Falha no hook de validação JSON: " + error.message + "\n");
  });
}

module.exports = { findDuplicateKeys };
