import { readdirSync, statSync } from "fs";
import path from "path";
import { log } from "../utils/log.js";

export function pwdCommand() {
  console.log(process.cwd());
}

export function cdCommand(args: string[]) {
  const target = args[0];
  if (!target) {
    log("Missing path to change directory", "error");
    return;
  }

  try {
    process.chdir(target);
    log(`Changed directory to ${process.cwd()}`, "success");
  } catch (e) {
    log(`Cannot change to directory: ${target}`, "error");
  }
}

export function lsCommand() {
  const currentDir = process.cwd();
  const files = readdirSync(currentDir);

  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stats = statSync(fullPath);
    const isDir = stats.isDirectory();
    const symbol = isDir ? "📁" : "📄";
    console.log(`${symbol} ${file}`);
  }
}
