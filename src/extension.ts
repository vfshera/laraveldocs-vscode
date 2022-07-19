import * as vscode from "vscode";
import AppPanel from "./AppPanel";
import SidebarProvider from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("ext-sidebar", sidebarProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-svelte-template.start", () => {
      AppPanel.createOrShow(context.extensionUri);
    })
  );
}

export function deactivate() {}
