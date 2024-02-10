// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { scriptActionReloadCommand, scriptActionStopCommand, showScripts } from './select-script';

export function activate(context: vscode.ExtensionContext) {

	vscode.window.onDidCloseTerminal(() => {
		vscode.commands.executeCommand('setContext', 'ext.actionStartCommand', false);
	});

	const arrayDisposables: Array<vscode.Disposable> = []

	const actionStartCommand = vscode.commands.registerCommand('run-button-script.run', async () => {
		console.log("Action command start")
		await showScripts();
	});

	const actionReloadCommand = vscode.commands.registerCommand('rerun-button-script.run', async () => {
		console.log("Action command reload")
		await scriptActionReloadCommand();
	});

	const actionStopCommand = vscode.commands.registerCommand('stop-button-script.run', async () => {
		console.log("Action command stop")
		await scriptActionStopCommand();
	});

	arrayDisposables.push(actionStartCommand);
	arrayDisposables.push(actionReloadCommand);
	arrayDisposables.push(actionStopCommand);

	arrayDisposables.forEach(item => {
		context.subscriptions.push(item);
	})
}

export function deactivate() { }
