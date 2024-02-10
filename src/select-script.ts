import * as vscode from 'vscode';
import { existsSync } from 'fs';
import { log } from 'console';

var globalWindowTerminal: vscode.Terminal

export async function showScripts() {
    const wok = vscode.workspace.rootPath;


    if (wok) {
        const packageJsonPath = (`${wok}/package.json`);
        const checkPkgManager = existsSync(`${wok}/package-lock.json`);
        const useNpm = checkPkgManager ? true : false;
        const runCommand = useNpm ? 'npm' : 'yarn';
        const readPakageJson = await vscode.workspace.fs.readFile(vscode.Uri.file(packageJsonPath));
        const jsonOutput = JSON.parse(readPakageJson.toString());
        vscode.window.showQuickPick(Object.keys(jsonOutput.scripts)).then(async response => {
            if (response) {
                globalWindowTerminal = vscode.window.createTerminal({
                    cwd: wok,
                    hideFromUser: false,
                    name: response,
                });
                globalWindowTerminal.show();
                setTimeout(() => {
                    globalWindowTerminal.sendText(`${runCommand} run ${response}`);
                    vscode.commands.executeCommand('setContext', 'ext.actionStartCommand', true);
                }, 1000);
            }
        });
    } else {
        vscode.window.showErrorMessage('Workspace not found');
    }

}

export async function scriptActionReloadCommand() {
    const wok = vscode.workspace.rootPath;
    if (!wok) throw new Error("Not found workspace")

    const processId = await globalWindowTerminal.processId
    console.log("El PID es: ", processId)
}

export async function scriptActionStopCommand() {
    const wok = vscode.workspace.rootPath;
    if (!wok) throw new Error("Not found workspace")

    // console.log(await vscode.commands.getCommands());

    // workbench.action.terminal.new
    await vscode.commands.executeCommand('setContext', 'workbench.action.terminal.kill', true);

}