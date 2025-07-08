export type ParsedCommand = {
    command:string;
    args:string[]
    flags:Record<string,string | boolean>
}
export const parseInput = (input: string): ParsedCommand =>{
 const tokens = input.trim().split(/\s+/)
 const command = tokens[0]
 const args:string[]=[]
 const flags:Record<string,string | boolean>={}
 for(let i =1; i<tokens.length;i++){
    const token = tokens[i]
    if(token.startsWith("--")){
        const [key,value]= token.slice(2).split("=")
        flags[key] = value ?? true
    }else{
        args.push(token)
    }
 }
 return {command,args,flags}
}