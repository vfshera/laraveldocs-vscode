import * as vscode from "vscode";
import AppPanel from "./DocPreviewPanel";
import SidebarProvider from "./SidebarProvider";
import { docs } from "./Utils";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("docs-list", sidebarProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("laraveldocs.refresh", async () => {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.laraveldocs-sidebar"
      );
      // setTimeout(() => {
      //   vscode.commands.executeCommand(
      //     "workbench.action.webview.openDeveloperTools"
      //   );
      // }, 500);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("laraveldocs.start", () => {
      vscode.window.showInformationMessage("Start Command!");
    })
  );
}

export function deactivate() {}
