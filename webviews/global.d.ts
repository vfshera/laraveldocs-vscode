import * as _vscode from "vscode";
import { IpostMessage } from "./types";

interface IHighlightOptions {
  renderer?: object;
  highlight?: string ;
  langPrefix?: string;
  pedantic?: boolean;
  gfm?: boolean;
  breaks?: boolean;
  sanitize?: boolean;
  smartLists?: boolean;
  smartypants?: boolean;
  xhtml?: boolean;
}
declare global {
  const ldvscode: {
    postMessage: (msg: IpostMessage) => void;
  };

  const marked;
  const hljs: {
    setOptions: (options: IHighlightOptions) => void;
    highlight;
    getLanguage;
    parse: (markdownString: string,options?: IHighlightOptions,callback?: () => any)
  };
}
