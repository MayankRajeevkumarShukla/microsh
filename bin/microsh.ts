#!/usr/bin/env node
// the above line is shellbang
import { handleCommand } from "../src";
import { startShell } from "../src/repl";
const [, , ...args] = process.argv
if(args.length === 0){
  await startShell()
}else{
await handleCommand(args)
}
