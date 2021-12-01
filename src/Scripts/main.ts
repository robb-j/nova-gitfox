//
// Extension entry point
//

import { openRepositoryCommand } from './commands/open-repository-command'

// export function activate() {}
// export function deactivate() {}

nova.commands.register(
  'robb-j.gitfox.open-repository',
  (workspace: Workspace) => openRepositoryCommand(workspace)
)
