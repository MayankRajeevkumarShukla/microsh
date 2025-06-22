export const handelCommand = (agrs: string[]) => {
    const [command] = agrs
    switch (command) {
        case "run":
            console.log("🛠 Running something...")
            break;
        case "init":
            console.log("✨ Initializing microsh project...")
            break;
        case "help":
        default:
            console.log(`
            microsh - The custom shell CLI

Usage:
  microsh run     # Run something
  microsh init    # Initialize project
  microsh help    # Show this help message
            `)

    }
}