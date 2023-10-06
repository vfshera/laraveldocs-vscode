import * as vscode from "vscode";
import SidebarProvider from "./panels/SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(vscode.window.registerWebviewViewProvider("docs-list", sidebarProvider));
}

export function deactivate() {}
