import * as vscode from 'vscode';
import { DbtDefinitionProvider, DBT_MODE } from './dbtDefinitionProvider';
import { DbtDocumentHighlightProvider } from './dbtDocumentHighlightProvider';


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerDefinitionProvider(DBT_MODE, new DbtDefinitionProvider()),
		vscode.languages.registerDocumentHighlightProvider(DBT_MODE, new DbtDocumentHighlightProvider())
	);
}

export function deactivate() { }