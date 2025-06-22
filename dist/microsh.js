#!/usr/bin/env node

// src/index.ts
var handelCommand = (agrs) => {
  const [command] = agrs;
  switch (command) {
    case "run":
      console.log("\u{1F6E0} Running something...");
      break;
    case "init":
      console.log("\u2728 Initializing microsh project...");
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
