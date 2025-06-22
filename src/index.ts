import { initCommand } from "./commands/init";
import { runCommand } from "./commands/run";

export const handelCommand = (agrs: string[]) => {
    const [command] = agrs
    switch (command) {
        case "run":
            runCommand();
            break;
        case "init":
            initCommand()
            break;
        case "help":
        default:
            console.log(`
            microsh - The custom shell CLI

Usage:
  microsh run     # Run something
  microsh init    # Initialize project
  microsh help    # Show this help message
            `)

    }
}