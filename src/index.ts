import { initCommand } from "./commands/init";
import { runCommand } from "./commands/run";
import { pwdCommand, cdCommand, lsCommand } from "./commands/builtin";
import { setEnv, expandEnvInArgs } from "./shell/env";
export async function handleCommand(
  args: string[],
  flags: Record<string, any> = {}
) {
  args = expandEnvInArgs(args);
  const [command] = args;
  
  switch (command) {
    case "run":
      await runCommand(args.slice(1), flags);
      break;
    case "init":
      initCommand(flags);
      break;
    case "pwd":
      pwdCommand();
      break;
    case "cd":
      cdCommand(args.slice(1));
      break;
    case "ls":
      lsCommand();
      break;
    case "set":
      const [kv] = args.slice(1)
      if (!kv || !kv.includes("=")) {
        break;
      }
      const [key, value] = kv.split("=")
      setEnv(key, value)
      // console.log(`Set $${key}=${value}`);
      break;
      case "echo":
  console.log(args.slice(1).join(" "));
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