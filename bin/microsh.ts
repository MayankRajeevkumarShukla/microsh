#!/usr/bin/env node
// the above line is shellbang
import { handelCommand } from "../src";
const [, , ...args] = process.argv
await handelCommand(args)