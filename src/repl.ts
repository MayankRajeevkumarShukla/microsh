import readline from "readline";
import { handleCommand } from "./index";
import {log} from "./utils/log"
import { parseInput } from "./utils/parser";
export const startShell = async()=>{
    const rl =  readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:">"
    })
    log("microsh shell started. Type 'exit' to quit.")
    rl.prompt()
    rl.on("line",async(line)=>{
        const input = line.trim()
        if(input ==="exit"){
            log("Goodbye!")
            rl.close();
            process.exit(0)
        }
       const parsed = parseInput(input)
        await handleCommand([parsed.command, ...parsed.args], parsed.flags);
    })
    rl.on("close",()=>{
        process.exit(0)
    })
}