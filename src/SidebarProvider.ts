import * as vscode from "vscode";
import DocPreviewPanel from "./DocPreviewPanel";
import { COMPILED_DIR, CSS_ASSET, DOCS_LIST, OPEN_DOC } from "./constants";
import { docs, getNonce } from "./Utils";

export default class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async ({ command, value }) => {
      switch (command) {
        case OPEN_DOC: {
          DocPreviewPanel.createOrShow(this._extensionUri, value);
          break;
        }
        case DOCS_LIST: {
          this._view?.webview.postMessage({
            type: DOCS_LIST,
            value: docs(),
          });
          break;
        }
        case "onInfo": {
          if (!value) {
            return;
          }
          vscode.window.showInformationMessage(value);
          break;
        }
        case "onError": {
          if (!value) {
            return;
          }
          vscode.window.showErrorMessage(value);
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, CSS_ASSET, "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, CSS_ASSET, "vscode.css")
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, COMPILED_DIR, "sidebar.js")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, COMPILED_DIR, "sidebar.css")
    );

    const themeStylesUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, CSS_ASSET, "theme.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
        <link href="${themeStylesUri}" rel="stylesheet">
        <script nonce="${nonce}" >
        const ldvscode = acquireVsCodeApi();
        </script>
			</head>
      <body>
      
				<script nonce="${nonce}" src="${scriptUri}"></script>

			</body>
			</html>`;
  }
}
