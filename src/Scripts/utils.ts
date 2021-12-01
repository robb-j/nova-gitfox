/** Force-type the console */
export const console: Console = (globalThis as any).console

/** Execute a `Process` and resolve with the stdout or reject with the stderr */
export function execute(process: Process) {
  return new Promise<string>((resolve, reject) => {
    // Copy all stdout into an array of lines
    const stdout: string[] = []
    process.onStdout((line) => stdout.push(line))

    // Copy all stderr into an array of lines
    const stderr: string[] = []
    process.onStderr((line) => stderr.push(line))

    process.onDidExit((status) =>
      status === 0
        ? resolve(stdout.join('\n'))
        : reject(new Error(stderr.join('\n')))
    )

    process.start()
  })
}

/** Create a method for namespaced development-only debug messages */
export function createDebug(namespace: string) {
  if (!nova.inDevMode()) return () => {}
  return (message: string, ...args: unknown[]) => {
    console.log(`${namespace} ${message}`, ...args)
  }
}
