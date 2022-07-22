import * as _vscode from "vscode";
import { IpostMessage, IHighlightOptions, type IHighlightJs } from "./types";

declare global {
  const ldvscode: {
    postMessage: (msg: IpostMessage) => void;
  };

  const marked;
  const hljs: IHighlightJs;
  const DOMPurify;
}
