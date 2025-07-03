import readline from "readline";
import { handelCommand } from "./index";
import {log} from "./utils/log"

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
        const args = input.split(/\s+/)
        await handelCommand(args)
        rl.prompt()
    })
    rl.on("close",()=>{
        process.exit(0)
    })
}