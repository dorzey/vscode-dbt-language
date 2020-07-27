import * as vscode from 'vscode';
export class DbtDocumentHighlightProvider implements vscode.DocumentHighlightProvider {
    provideDocumentHighlights(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.DocumentHighlight[]> {
        return new Promise((resolve, reject) => {
            const word = document.getText(document.getWordRangeAtPosition(position));
            const lines: string[] = document.getText().split(/\r?\n/g);
            const highlights = this.getHighlights(lines, word, document);
            resolve(highlights);
        });
    }

    private getHighlights(lines: string[], word: string, document: vscode.TextDocument): vscode.DocumentHighlight[] {
        let highlights: vscode.DocumentHighlight[] = [];
        for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
            const match = (new RegExp(word)).exec(lines[lineNumber]);
            if (match) {
                const startPosition = new vscode.Position(lineNumber, match.index);
                const endPosition = new vscode.Position(lineNumber, match.index + match[0].length);
                const wordToHightLight = document.getText(document.getWordRangeAtPosition(startPosition));
                if (word === wordToHightLight) {
                    const range = new vscode.Range(startPosition, endPosition);
                    highlights.push(new vscode.DocumentHighlight(range));
                }
            }
        }
        return highlights;
    }
}
