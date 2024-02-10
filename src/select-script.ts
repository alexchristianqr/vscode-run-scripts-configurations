import * as vscode from 'vscode';
import { existsSync } from 'fs';

var globalWindowTerminal: vscode.Terminal;

export async function showScripts(context: vscode.ExtensionContext) {

    let wok: string | undefined;

    if (!vscode.workspace.workspaceFolders) {
        wok = vscode.workspace.rootPath;
    } else {
        let root: vscode.WorkspaceFolder | undefined;

        if (vscode.workspace.workspaceFolders.length > 0) {
            root = vscode.workspace.workspaceFolders[0];
        } else {
            root = vscode.workspace.getWorkspaceFolder(context.extensionUri);
        }

        wok = root?.uri.fsPath;
    }

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
                    vscode.commands.executeCommand('setContext', 'varext.buttonStartVisible', true);
                }, 1000);
            }
        });
    } else {
        vscode.window.showErrorMessage('Workspace not found');
    }

}

export async function scriptActionReloadCommand() {
    const wok = vscode.workspace.workspaceFolders;
    if (!wok) {
        throw new Error("Not found workspace");
    }

    const processId = await globalWindowTerminal.processId;
    console.log("El PID es: ", processId);
}

export async function scriptActionStopCommand() {
    const wok = vscode.workspace.workspaceFolders;
    if (!wok) {
        throw new Error("Not found workspace");
    }
}