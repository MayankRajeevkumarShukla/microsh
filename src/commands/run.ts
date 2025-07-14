import { readFile } from 'fs/promises';
import { log } from '../utils/log'
import { loadConfig } from '../utils/config';

export const runCommand = async (args: string[],flags: Record<string, any>) => {
    const config = loadConfig();
    const [filenameArg] = args;
    const filename = filenameArg || config.defaultFile;

    if (!filename) {
        log("Please provide a file name. Example: microsh run hello.txt")
        return;
    }
    try {
    const content = await readFile(filename, "utf-8");
    if (flags.verbose || config.verbose) {
      log(`📂 Reading file: ${filename}`);
    }
    console.log(content);
  } catch (error) {
    log(`❌ Failed to read file: ${(error as Error).message}`, "error");
  }
}


