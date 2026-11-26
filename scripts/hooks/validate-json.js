#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

async function readInput() {
  let input = "";

  for await (const chunk of process.stdin) {
    input += chunk;
  }

  return JSON.parse(input);
}

function reportInvalidJson(filePath, error) {
  const message = [
    "O arquivo JSON editado está inválido.",
    `Arquivo: ${filePath}`,
    `Erro: ${error.message}`,
    "Corrija a sintaxe JSON e valide novamente antes de concluir a tarefa."
  ].join("\n");

  process.stdout.write(
    JSON.stringify({
      decision: "block",
      reason: message
    })
  );
}

async function main() {
  let hookInput;

  try {
    hookInput = await readInput();
  } catch {
    // Entrada inesperada não deve interromper o fluxo de trabalho.
    return;
  }

  const filePath = hookInput?.tool_input?.file_path;

  if (typeof filePath !== "string" || path.extname(filePath).toLowerCase() !== ".json") {
    return;
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      return;
    }

    if (error instanceof SyntaxError) {
      reportInvalidJson(filePath, error);
      return;
    }

    // Falhas operacionais do hook não devem bloquear a edição.
    process.stderr.write(`Não foi possível validar ${filePath}: ${error.message}\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`Falha no hook de validação JSON: ${error.message}\n`);
});
