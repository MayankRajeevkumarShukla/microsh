#!/usr/bin/env node

// src/utils/log.ts
var log = (message) => {
  console.log(`[microsh] ${message}`);
};

// src/commands/init.ts
var initCommand = () => {
  log("\u2728 Initializing microsh project from init.ts...");
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

// bin/microsh.ts
var [, , ...args] = process.argv;
await handelCommand(args);
