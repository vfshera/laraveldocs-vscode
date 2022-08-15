import * as _vscode from "vscode";
import type { HLJSApi } from "highlight.js";
import type { DOMPurifyI } from "dompurify";
import { IpostMessage, IHighlightOptions, type IHighlightJs } from "./types";

declare global {
  const ldvscode: {
    postMessage: (msg: IpostMessage) => void;
  };
  const highlightjs: HLJSApi;
  const DOMPurify: DOMPurifyI;
}
