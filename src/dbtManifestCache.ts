import * as vscode from 'vscode';
import { Location, Uri, Range, Definition } from 'vscode';
const fs = require('fs');

class DBTManifestCache {

    modelToLocationMap: Map<String, String> = new Map();

    constructor() {
        let dbtManifastLocation = vscode.workspace.getConfiguration().get<string>('dbt.manifestLocation', '/target/manifest.json');
        let dataFile = fs.readFileSync(vscode.workspace.rootPath + dbtManifastLocation);
        let stringData = JSON.parse(dataFile);
        for (var key in stringData.nodes) {
            this.modelToLocationMap.set(stringData.nodes[key].name, stringData.nodes[key].original_file_path);
        }
    }

    public getDefinitionFor(name: string): Definition | undefined {
        const location = this.modelToLocationMap.get(name);
        if (vscode.workspace.rootPath && location) {
            return new Location(
                Uri.file(vscode.workspace.rootPath + '/' + location),
                new Range(0, 0, 0, 0)
            );
        }
        return undefined;
    }
}

export var DBTManifestCacheInstance = new DBTManifestCache();