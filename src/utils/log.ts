import {blue,green,red,yellow} from "colorette"
export const log = (message :string,type: "info" | "success" | "error" = "info")=>{
 const prefix ={
       info: blue("ℹ️ [microsh]"),
    success: green("✅ [microsh]"),
    error: red("❌ [microsh]")
    
 }
  console.log(`${prefix[type]} ${message}`);
} 