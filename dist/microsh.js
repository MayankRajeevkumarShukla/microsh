#!/usr/bin/env node

// src/utils/log.ts
var log = (message) => {
  console.log(`[microsh] ${message}`);
};

// src/commands/init.ts
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
var initCommand = () => {
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
var runCommand = async (args2) => {
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
var handelCommand = async (agrs) => {
  const [command] = agrs;
  switch (command) {
    case "run":
      runCommand(agrs.slice(1));
      break;
    case "init":
      initCommand();
      break;
    case "help":
    default:
      console.log(`
            microsh - The custom shell CLI

Usage:
  microsh run     # Run something
  microsh init    # Initialize project
  microsh help    # Show this help message
            `);
  }
};

// src/repl.ts
import readline from "readline";
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
    const args2 = input.split(/\s+/);
    await handelCommand(args2);
    rl.prompt();
  });
  rl.on("close", () => {
    process.exit(0);
  });
};

// bin/microsh.ts
var [, , ...args] = process.argv;
if (args.length === 0) {
  await startShell();
} else {
  await handelCommand(args);
}
