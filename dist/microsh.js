#!/usr/bin/env node

// src/utils/log.ts
import { blue, green, red } from "colorette";
var log = (message, type = "info") => {
  const prefix = {
    info: blue("\u2139\uFE0F [microsh]"),
    success: green("\u2705 [microsh]"),
    error: red("\u274C [microsh]")
  };
  console.log(`${prefix[type]} ${message}`);
};

// src/commands/init.ts
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
var initCommand = (flags) => {
  const folders = ["src", "config"];
  for (const folder of folders) {
    if (!existsSync(folder)) {
      mkdir(folder).then(() => log(`Created folder: ${folder}`)).catch((err) => log(`\u274C Failed to create ${folder}: ${err.message}`));
    } else {
      log(`Folder already exists: ${folder}`);
    }
  }
  const configContent = {
    name: "microsh-app",
    version: "0.1.0"
  };
  const configPath = "config/config.json";
  if (!existsSync(configPath)) {
    writeFile(configPath, JSON.stringify(configContent, null, 2), "utf-8").then(() => log("\u2705 Created config/config.json")).catch((err) => log(`\u274C Failed to write config file: ${err.message}`));
  } else {
    log("config/config.json already exists");
  }
};

// src/commands/run.ts
import { readFile } from "fs/promises";
var runCommand = async (args2, flags) => {
  const [filename] = args2;
  if (!filename) {
    log("Please provide a file name. Example: microsh run hello.txt");
    return;
  }
  try {
    const content = await readFile(filename, "utf-8");
    log(`Contents of ${filename}:`);
    console.log(content);
  } catch (error) {
    log(`\u274C Could not read file "${filename}": ${error.message}`);
  }
};

// src/index.ts
async function handleCommand(args2, flags = {}) {
  const [command] = args2;
  switch (command) {
    case "run":
      await runCommand(args2.slice(1), flags);
      break;
    case "init":
      initCommand(flags);
      break;
    case "help":
    default:
      console.log(`
microsh - The custom shell CLI

Usage:
  run <file> [--verbose]
  init [--force]
      `);
  }
}

// src/repl.ts
import readline from "readline";

// src/utils/parser.ts
var parseInput = (input) => {
  const tokens = input.trim().split(/\s+/);
  const command = tokens[0];
  const args2 = [];
  const flags = {};
  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith("--")) {
      const [key, value] = token.slice(2).split("=");
      flags[key] = value ?? true;
    } else {
      args2.push(token);
    }
  }
  return { command, args: args2, flags };
};

// src/repl.ts
import { yellow as yellow2 } from "colorette";
console.clear();
console.clear();
console.log(
  yellow2(`
\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557  \u2588\u2588\u2557
\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2551  \u2588\u2588\u2551
\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551
\u2588\u2588\u2551\u255A\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551
\u2588\u2588\u2551 \u255A\u2550\u255D \u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551  \u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551
\u255A\u2550\u255D     \u255A\u2550\u255D\u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D
`)
);
log("Welcome to microsh \u{1F41A} Type 'help' or 'exit'");
var startShell = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">"
  });
  log("microsh shell started. Type 'exit' to quit.");
  rl.prompt();
  rl.on("line", async (line) => {
    const input = line.trim();
    if (input === "exit") {
      log("Goodbye!");
      rl.close();
      process.exit(0);
    }
    try {
      const parsed = parseInput(input);
      await handleCommand([parsed.command, ...parsed.args], parsed.flags);
    } catch (err) {
      log("Error: " + err.message, "error");
    } finally {
      rl.prompt();
    }
  });
};

// bin/microsh.ts
var [, , ...args] = process.argv;
if (args.length === 0) {
  await startShell();
} else {
  await handleCommand(args);
}
