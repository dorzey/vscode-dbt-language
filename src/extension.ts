import * as vscode from 'vscode';
import { DbtDefinitionProvider, DBT_MODE } from './dbtDefinitionProvider';


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerDefinitionProvider(DBT_MODE, new DbtDefinitionProvider())
	);
}

export function deactivate() { }