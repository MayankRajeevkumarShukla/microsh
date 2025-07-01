import { log } from "../utils/log"
import {existsSync} from "fs"
import {mkdir,writeFile} from "fs/promises"
import { version } from "os"
export const initCommand =()=>{
   const folders = ["src","config"]
   for(const folder of folders){
      if(!existsSync(folder)){
         mkdir(folder)
         .then(()=> log(`Created folder: ${folder}`))
         .catch((err) => log(`❌ Failed to create ${folder}: ${err.message}`));
      }else{
         log(`Folder already exists: ${folder}`);
      }
   }
   const configContent = {
      name:"microsh-app",
      version:"0.1.0"
   }
   const configPath = "config/config.json"
  if (!existsSync(configPath)) {
    writeFile(configPath, JSON.stringify(configContent, null, 2), "utf-8")
      .then(() => log("✅ Created config/config.json"))
      .catch((err) => log(`❌ Failed to write config file: ${err.message}`));
  } else {
    log("config/config.json already exists");
  }
} 