import { existsSync } from "fs";
import { readFileSync } from "fs";
import { log } from "./log.js";

type MicroshConfig = {
  defaultFile?: string;
  verbose?: boolean;
};

export function loadConfig(): MicroshConfig {
  const path = "microsh.config.json";

  if (!existsSync(path)) {
    log("No microsh.config.json found", "info");
    return {};
  }

  try {
    const raw = readFileSync(path, "utf-8");
    const parsed = JSON.parse(raw);
    log("Loaded config file", "success");
    return parsed;
  } catch (err) {
    log("Failed to read config file", "error");
    return {};
  }
}
