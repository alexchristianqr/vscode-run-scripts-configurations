import * as vscode from "vscode"
import { scriptActionReloadCommand, scriptActionStopCommand, showScripts } from "./select-script"
import { globalWindow } from "./utils"

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand("setContext", "varext.labelButtonDropdown", "TOTO")

  vscode.window.onDidCloseTerminal((subcontext) => {
    console.log({ subcontext })

    /* Validar ID proceso actual del terminal */
    if (globalWindow.terminal.processId === subcontext.processId) {
      vscode.commands.executeCommand("setContext", "varext.buttonStartVisible", false)
    }
  })

  const arrayDisposables: Array<vscode.Disposable> = []

  const actionStartCommand = vscode.commands.registerCommand("run-button-script.run", async () => {
    console.log("Action command start")
    await showScripts(context)
  })

  const actionReloadCommand = vscode.commands.registerCommand("rerun-button-script.run", async () => {
    console.log("Action command reload")
    await scriptActionReloadCommand()
  })

  const actionStopCommand = vscode.commands.registerCommand("stop-button-script.run", async () => {
    console.log("Action command stop")
    await scriptActionStopCommand()
  })

  arrayDisposables.push(actionStartCommand)
  arrayDisposables.push(actionReloadCommand)
  arrayDisposables.push(actionStopCommand)

  arrayDisposables.forEach((item) => {
    context.subscriptions.push(item)
  })
}

export function deactivate() {}
