const envVars: Record<string, string> = {};

export function setEnv(key: string, value: string) {
  envVars[key] = value;
}

export function getEnv(key: string): string | undefined {
  return envVars[key];
}

export function expandEnvInArgs(args: string[]): string[] {
  return args.map(arg => {
    return arg.replace(/\$([A-Z_]+)/gi, (_, varName) => {
      return envVars[varName] || "";
    });
  });
}
