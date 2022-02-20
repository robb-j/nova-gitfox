import { createDebug, execute } from '../utils'

const debug = createDebug('cmd:open-repo')

/** Work out where the `gf` binary is */
async function getGitfoxPath(): Promise<string | null> {
  const customPath = nova.config.get('robb-j.gitfox.gfPath', 'string')

  // First see if the user has a custom path set and try that
  if (customPath) {
    debug('customPath=%o', customPath)
    const canOpen = nova.fs.access(customPath, nova.fs.X_OK)

    if (!canOpen) {
      throw new Error(`Custom GitFox binary '${customPath}' is not executable.`)
    }

    return customPath
  }

  // If there isn't a custom path, look for it using `which`
  const stdout = await execute(
    new Process('/usr/bin/which', { args: ['gitfox'] })
  ).catch(() => null)

  debug('whichPath=%o', stdout?.trim())

  return stdout?.trim() ?? null
}

export async function openRepositoryCommand(
  workspace: Workspace
): Promise<void> {
  try {
    debug('path=%o', workspace.path)

    const workspacePath = workspace.path
    if (!workspacePath) {
      throw new Error('Workspace is not bound to a folder.')
    }

    // 1. check the workspace is a valid git repository
    const files = nova.fs.listdir(workspacePath)
    debug('files=%o', files)
    if (!files.includes('.git')) {
      throw new Error('Workspace is not a git repository')
    }

    // 2. check the Gitfox CLI is installed
    const gfPath = await getGitfoxPath()

    if (!gfPath) {
      const req = new NotificationRequest('gf-missing')
      req.title = nova.localize('Error opening in Gitfox')
      req.body = nova.localize(
        'Could not find the Gitfox CLI, please see the Gitfox Extension Details for instructions.'
      )
      req.actions = ['OK', 'Help']

      const response = await nova.notifications.add(req)

      if (response.actionIdx === 1) {
        nova.openConfig(nova.extension.identifier)
      }

      return
    }

    // 3. use the CLI to open the repository
    const result = await execute(
      new Process(gfPath.trim(), { args: [workspacePath] })
    ).catch((error) => {
      throw new Error(`Failed to run 'gitfox' ${error.message}`)
    })
    debug('result=%o', result)
  } catch (error) {
    // Tell the user about the error
    nova.workspace.showErrorMessage(
      error instanceof Error ? error.message : (error as never)
    )
  }
}
