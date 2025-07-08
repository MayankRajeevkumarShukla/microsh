import { initCommand } from "./commands/init";
import { runCommand } from "./commands/run";

export async function handleCommand(
  args: string[],
  flags: Record<string, any> = {}
) {
  const [command] = args;

  switch (command) {
    case "run":
      await runCommand(args.slice(1), flags);
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