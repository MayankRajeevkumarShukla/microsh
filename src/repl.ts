import readline from "readline";
import { handleCommand } from "./index";
import { log } from "./utils/log";
import { parseInput } from "./utils/parser";
import { yellow } from "colorette";
console.clear();
console.clear();
console.log(
  yellow(`
███╗   ███╗██╗ ██████╗██████╗  ██████╗ ███████╗██╗  ██╗
████╗ ████║██║██╔════╝██╔══██╗██╔═══██╗██╔════╝██║  ██║
██╔████╔██║██║██║     ██████╔╝██║   ██║███████╗███████║
██║╚██╔╝██║██║██║     ██╔══██╗██║   ██║╚════██║██╔══██║
██║ ╚═╝ ██║██║╚██████╗██║  ██║╚██████╔╝███████║██║  ██║
╚═╝     ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
`)
);
log("Welcome to microsh 🐚 Type 'help' or 'exit'");
export const startShell = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">",
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
      log("Error: " + (err as Error).message, "error");
    } finally {
      rl.prompt();
    }
  });
};
