import * as _vscode from "vscode";
import { IpostMessage } from "./types";

declare global {
  const ldvscode: {
    postMessage: (msg: IpostMessage) => void;
  };

  const marked;
}
