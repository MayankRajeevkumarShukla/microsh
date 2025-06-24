import { readFile } from 'fs/promises';
import { log } from '../utils/log'
export const runCommand = async (args: string[]) => {
    const [filename] = args;
    if (!filename) {
        log("Please provide a file name. Example: microsh run hello.txt")
        return;
    }
    try {
        const content = await readFile(filename, "utf-8")
        log(`Contents of ${filename}:`);
        console.log(content);
    } catch (error) {
        log(`❌ Could not read file "${filename}": ${(error as Error).message}`);
    }
}


