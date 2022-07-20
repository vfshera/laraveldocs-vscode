import * as vscode from "vscode";
import { getNonce } from "./Utils";
import { COMPILED_DIR, CSS_ASSET, EXT_NAME } from "./constants";

interface IDocFile {
  title: string;
  filename: string;
  link: string;
}
/**
 * Manages  webview panels
 */
export default class AppPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: AppPanel | undefined;

  public static readonly viewType = "DocPanel";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  private _docFile: IDocFile;

  public static createOrShow(extensionUri: vscode.Uri, docFile: IDocFile) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, close it.
    if (AppPanel.currentPanel) {
      AppPanel.currentPanel._panel.dispose();
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      AppPanel.viewType,
      docFile.title,
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "assets/docs"),
        ],
      }
    );

    AppPanel.currentPanel = new AppPanel(panel, extensionUri, docFile);
  }

  public static revive(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    docFile: IDocFile
  ) {
    AppPanel.currentPanel = new AppPanel(panel, extensionUri, docFile);
  }

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    docFile: IDocFile
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._docFile = docFile;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Update the content based on view changes
    this._panel.onDidChangeViewState(
      (e) => {
        if (this._panel.visible) {
          this._update();
        }
      },
      null,
      this._disposables
    );

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "alert":
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    AppPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    const webview = this._panel.webview;

    this._panel.title = EXT_NAME + ":" + this._docFile.title;

    // Vary the webview's content based on where it is located in the editor.
    switch (this._panel.viewColumn) {
      case vscode.ViewColumn.Two:
        this._updateAppPanel(webview);
        return;

      case vscode.ViewColumn.Three:
        this._updateAppPanel(webview);
        return;

      case vscode.ViewColumn.One:
      default:
        this._updateAppPanel(webview);
        return;
    }
  }

  private _updateAppPanel(webview: vscode.Webview) {
    this._panel.title = EXT_NAME + ":" + this._docFile.title;
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Local path to main script run in the webview
    // And the uri we use to load this script in the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, COMPILED_DIR, "app.js")
    );

    // Local path to css styles
    // Uri to load styles into webview
    const stylesResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, CSS_ASSET, "reset.css")
    );
    const stylesMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, CSS_ASSET, "vscode.css")
    );

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">
				<title>Doc Panel</title>
			</head>
			<body>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}
