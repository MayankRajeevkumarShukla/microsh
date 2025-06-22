#!/usr/bin/env node

// src/commands/init.ts
var initCommand = () => {
  console.log("\u2728 Initializing microsh project from init.ts...");
};

// src/commands/run.ts
var runCommand = () => {
  console.log("\u{1F6E0} Running something from run.ts...");
};

// src/index.ts
var handelCommand = (agrs) => {
  const [command] = agrs;
  switch (command) {
    case "run":
      runCommand();
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
handelCommand(args);
