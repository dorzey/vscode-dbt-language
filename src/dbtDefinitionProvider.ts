import * as vscode from 'vscode';
import { Uri, Range, ProviderResult, Definition, DefinitionLink, Location } from 'vscode';
import { DBTManifestCacheInstance } from './dbtManifestCache';

export const DBT_MODE = { language: 'jinja-sql', scheme: 'file' };

class RefDefinitionProvider {

    private static readonly IS_REF = /(ref)[^}]*/;
    private static readonly REF_FUNC_CALL = /^(ref)[^}]*/ig;
    private static readonly GET_DBT_MODEL = /('|")([^('|")]*)('|")/ig;

    static provideDefinition(document: vscode.TextDocument, position: vscode.Position): Definition | undefined {
        const word = document.getText(document.getWordRangeAtPosition(position, RefDefinitionProvider.IS_REF));
        const fullRefFuncCall = word.match(RefDefinitionProvider.REF_FUNC_CALL);
        if (fullRefFuncCall && fullRefFuncCall.length === 1) {
            const dbtModel = fullRefFuncCall[0].match(RefDefinitionProvider.GET_DBT_MODEL);
            if (dbtModel && dbtModel.length === 1) {
                const name = RefDefinitionProvider.removeQuotes(dbtModel);
                return DBTManifestCacheInstance.getDefinitionFor(name);
            }
        }
        return undefined;
    }

    private static removeQuotes(dbtModel: RegExpMatchArray): string {
        return dbtModel[0].replace(/[']/g, '').replace(/["]/g, '');
    }
}

export class DbtDefinitionProvider implements vscode.DefinitionProvider {

    provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): ProviderResult<Definition | DefinitionLink[]> {
        return new Promise((resolve, reject) => {
            const definition = RefDefinitionProvider.provideDefinition(document, position);
            if (definition) {
                resolve(definition);
            } else {
                reject();
            }
        });
    }
}
