// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { showScripts } from './select-script';

export function activate(context: vscode.ExtensionContext) {
	console.log("alexxxxxxxxx");

	let arrayDisposables: Array<vscode.Disposable> = []

	let disposable = vscode.commands.registerCommand('run-button-script.run', () => {
		console.log("Accion del boton para iniciar")
		showScripts();
	});
	console.log("alexxxxxxxxx", { disposable });
	arrayDisposables.push(disposable);
	// context.subscriptions.push(disposable);

	let actionReload = vscode.commands.registerCommand('rerun-button-script.run', () => {
		console.log("Accion del boton para relanzar")
	});
	arrayDisposables.push(actionReload);
	// context.subscriptions.push(actionReload);

	let actionStop = vscode.commands.registerCommand('stop-button-script.run', () => {
		console.log("Accion del boton para detener")
	});
	arrayDisposables.push(actionStop);
	// context.subscriptions.push(actionStop);

	arrayDisposables.forEach(item => {
		console.log({ item });

		context.subscriptions.push(item);
	})


}

export function deactivate() { }
